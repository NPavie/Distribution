import {connect} from 'react-redux'

import {withRouter} from '#/main/app/router'

import {FileMenu as FileMenuComponent} from '#/plugin/binder/resources/file/components/menu'
import {selectors} from '#/plugin/binder/resources/file/store'

const FileMenu = withRouter(
  connect(
    (state) => ({
      title: selectors.title(state)
    })
  )(FileMenuComponent)
)

export {
  FileMenu
}
