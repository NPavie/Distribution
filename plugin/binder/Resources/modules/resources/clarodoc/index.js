
import {DocumentResource} from '#/plugin/binder/resources/clarodoc/containers/resource'
import {DocumentMenu} from '#/plugin/binder/resources/clarodoc/containers/menu'

import {reducer} from '#/plugin/binder/resources/clarodoc/store'

/**
 * HomeTool application.
 */
export default {
  component: DocumentResource,
  menu: DocumentMenu,
  store: reducer,
  styles: ['claroline-distribution-plugin-binder-clarodoc-resource']
}
