import isEmpty from 'lodash/isEmpty'

import {makeInstanceAction} from '#/main/app/store/actions'
import {makeReducer} from '#/main/app/store/reducer'
import {makeFormReducer} from '#/main/app/content/form/store/reducer'

import {RESOURCE_LOAD} from '#/main/core/resource/store/actions'

import {selectors as baseSelectors} from '#/plugin/binder/resources/file/store/selectors'
import {selectors} from '#/plugin/binder/resources/file/editor/store/selectors'


const reducer = makeFormReducer(selectors.FORM_NAME, {data: [], originalData: []}, {
  data: makeReducer([], {
    [makeInstanceAction(RESOURCE_LOAD, baseSelectors.STORE_NAME)]: (state, action) => action.resourceData.file
  }),
  originalData: makeReducer([], {
    [makeInstanceAction(RESOURCE_LOAD, baseSelectors.STORE_NAME)]: (state, action) => action.resourceData.file
  })
})

export {
  reducer
}
