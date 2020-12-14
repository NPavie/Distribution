
import {FileResource} from '#/plugin/binder/resources/file/containers/resource'
import {FileMenu} from '#/plugin/binder/resources/file/containers/menu'

import {reducer} from '#/plugin/binder/resources/file/store'

/**
 * HomeTool application.
 */
export default {
  component: FileResource,
  menu: FileMenu,
  store: reducer,
  styles: ['claroline-distribution-plugin-binder-document-resource']
}
