import React from 'react'
import {PropTypes as T} from 'prop-types'
import omit from 'lodash/omit'

import {trans} from '#/main/app/intl/translation'
import {Routes} from '#/main/app/router'
import {MenuSection} from '#/main/app/layout/menu/components/section'

import {EditorMenu} from '#/main/core/tools/home/editor/containers/menu'
import {PlayerMenu} from '#/main/core/tools/home/player/containers/menu'

const HomeMenu = props =>
  <MenuSection
    {...omit(props, 'path', 'editable')}
    title={trans('home', {}, 'tools')}
  >
    <Routes
      path={props.path}
      routes={[
        {
          path: '/edit',
          disabled: !props.editable,
          render() {
            const Menu = (
              <EditorMenu autoClose={props.autoClose} />
            )

            return Menu
          }
        }, {
          path: '/',
          render() {
            const Menu = (
              <PlayerMenu autoClose={props.autoClose} />
            )

            return Menu
          }
        }
      ]}
    />
  </MenuSection>

HomeMenu.propTypes = {
  path: T.string.isRequired,
  editable: T.bool.isRequired,

  // from menu
  opened: T.bool.isRequired,
  toggle: T.func.isRequired,
  autoClose: T.func.isRequired
}

export {
  HomeMenu
}
