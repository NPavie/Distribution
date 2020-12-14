import {connect} from 'react-redux'

import {withRouter} from '#/main/app/router'

import {FileResource as FileResourceComponent} from '#/plugin/binder/resources/file/components/resource'
import {selectors} from '#/plugin/binder/resources/file/store'

const FileResource = withRouter(
  connect(
    (state) => ({
      editable: selectors.editable(state),
      title: selectors.title(state)
    })
  )(FileResourceComponent)
)

export {
  FileResource
}
