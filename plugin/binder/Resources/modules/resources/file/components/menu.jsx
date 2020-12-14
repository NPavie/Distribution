import React from 'react'
import {PropTypes as T} from 'prop-types'
import omit from 'lodash/omit'

import {trans} from '#/main/app/intl/translation'
import {Routes} from '#/main/app/router'
import {MenuSection} from '#/main/app/layout/menu/components/section'

import {FileEditorMenu} from '#/plugin/binder/resources/file/editor/containers/menu'
import {FilePlayerMenu} from '#/plugin/binder/resources/file/player/containers/menu'

const FileMenu = props =>
  <MenuSection
    {...omit(props, 'title')}
    title={props.title}
  />;


FileMenu.propTypes = {
  title:T.string.isRequired,

  // from menu
  opened: T.bool.isRequired,
  toggle: T.func.isRequired,
  autoClose: T.func.isRequired
}

export {
  FileMenu
}
