import React from 'react'
import {PropTypes as T} from 'prop-types'

import {trans} from '#/main/app/intl/translation'
import {PageSimple} from '#/main/app/page/components/simple'
import {PageHeader, PageContent, PageActions, PageAction} from '#/main/core/layout/page'
import {CALLBACK_BUTTON, LINK_BUTTON} from '#/main/app/buttons'
import {getToolBreadcrumb, showToolBreadcrumb} from '#/main/core/tool/utils'

import {WidgetContainer as WidgetContainerTypes} from '#/main/core/widget/prop-types'
import {WidgetGrid} from '#/main/core/widget/player/components/grid'
import {Tab as TabTypes} from '#/main/core/tools/home/prop-types'
import {Tabs} from '#/main/core/tools/home/components/tabs'

const PlayerTab = props =>
  <PageSimple
    className="home-tool"
    showBreadcrumb={showToolBreadcrumb(props.currentContext.type, props.currentContext.data)}
    path={[].concat(getToolBreadcrumb('home', props.currentContext.type, props.currentContext.data), props.currentTab ? [{
      id: props.currentTab.id,
      label: props.currentTab.title,
      target: '/' // this don't work but it's never used as current tab is always last for now
    }] : [])}
    header={{
      title: `${trans('home', {}, 'tools')}${'workspace' === props.currentContext.type ? ' - ' + props.currentContext.data.code : ''}`,
      description: 'workspace' === props.currentContext.type && props.currentContext.data.meta ? props.currentContext.data.meta.description : null
    }}
  >
    <PageHeader
      className={props.currentTab && props.currentTab.centerTitle ? 'text-center' : ''}
      title={props.currentTabTitle}
      poster={props.currentTab && props.currentTab.poster ? props.currentTab.poster.url: undefined}
    >
      {1 < props.tabs.length &&
        <Tabs
          prefix={props.path}
          tabs={props.tabs}
          currentContext={props.currentContext}
        />
      }

      {(props.currentTab && props.editable) &&
        <PageActions>
          <PageAction
            type={LINK_BUTTON}
            label={trans('configure', {}, 'actions')}
            icon="fa fa-fw fa-cog"
            primary={true}
            target={`${props.path}/edit/${props.currentTab.slug}`}
          />
          {props.desktopAdmin && props.administration &&
            <PageAction
              type={CALLBACK_BUTTON}
              label={trans('switch_to_user_tabs')}
              icon="fa fa-fw fa-exchange"
              dangerous={true}
              callback={() => {
                props.setAdministration(false)
                props.fetchTabs(props.currentContext, false)
              }}
            />
          }
          {props.desktopAdmin && !props.administration &&
            <PageAction
              type={CALLBACK_BUTTON}
              label={trans('switch_to_admin_tabs')}
              icon="fa fa-fw fa-exchange"
              callback={() => {
                props.setAdministration(true)
                props.fetchTabs(props.currentContext, true)
              }}
            />
          }
        </PageActions>
      }
    </PageHeader>

    <PageContent>
      <WidgetGrid
        currentContext={props.currentContext}
        widgets={props.widgets}
      />
    </PageContent>
  </PageSimple>

PlayerTab.propTypes = {
  path: T.string.isRequired,
  currentContext: T.object.isRequired,
  tabs: T.arrayOf(T.shape(
    TabTypes.propTypes
  )),
  currentTabTitle: T.string.isRequired,
  currentTab: T.shape(TabTypes.propTypes),
  editable: T.bool.isRequired,
  administration: T.bool.isRequired,
  desktopAdmin: T.bool.isRequired,
  widgets: T.arrayOf(T.shape(
    WidgetContainerTypes.propTypes
  )).isRequired,
  setAdministration: T.func,
  fetchTabs: T.func
}

export {
  PlayerTab
}
