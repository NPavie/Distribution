import React from 'react'
import {PropTypes as T} from 'prop-types'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import {trans} from '#/main/app/intl/translation'
import {LINK_BUTTON} from '#/main/app/buttons'
import {FormData} from '#/main/app/content/form/containers/data'

import {WidgetGridEditor} from '#/main/core/widget/editor/components/grid'
import {WidgetContainer as WidgetContainerTypes} from '#/main/core/widget/prop-types'

import {selectors} from '#/plugin/binder/resources/file/editor/store/selectors'

const FileEditorMain = props =>
    <Fragment>
      <FormData
          level={2}
          name={selectors.FORM_NAME}
          buttons={true}
          {/*
          lock={{
            id: props.id,
            className: 'Sidpt\\BinderBundle\\Entity\\Document'
          }}*/}
          disabled={false}
          target={[
            'apiv2_sidpt_document_update', 
            { id: props.id }
          ]}
          cancel={{
              type: LINK_BUTTON,
              target: props.path,
              exact: true
            }}
          sections={[
            {
              icon: 'fa fa-fw fa-plus',
              title: trans('general'),
              primary: true,
              fields: [
                {
                  name: 'longTitle',
                  type: 'string',
                  label: trans('title'),
                  required: true
                },{
                  name: 'centerTitle',
                  type: 'boolean',
                  label: trans('center_title')
                }
              ]
            }
          ]} >
        <WidgetGridEditor
            disabled={false}
            currentContext={props.currentContext}
            widgets={props.widgets}
            tabs={[]} // TODO empty for now, is used for crosstab widget moves
            currentTabIndex={0}
            update={(widgets) => {
              props.update('widgets', widgets)}
            } />
      </FormData>
      
    </Fragment>;


FileEditorMain.propTypes = {
  path: T.string.isRequired,
  id: T.string.isRequired,
  currentContext: T.object.isRequired,
  widgets: T.arrayOf(T.shape(
    WidgetContainerTypes.propTypes
  )).isRequired,
  update: T.func.isRequired/*,
  setErrors: T.func.isRequired*/
}

export {
  FileEditorMain
}
