import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import {makeInstanceAction} from '#/main/app/store/actions'
import {combineReducers, makeReducer} from '#/main/app/store/reducer'

import {FORM_SUBMIT_SUCCESS} from '#/main/app/content/form/store/actions'

import {RESOURCE_LOAD} from '#/main/core/resource/store/actions'

import {selectors} from '#/plugin/binder/resources/file/store/selectors'
import {reducer as editorReducer} from '#/plugin/binder/resources/file/editor/store/reducer'


const reducer = combineReducers({
  file:combineReducers({
    id: makeReducer('', {
        [makeInstanceAction(RESOURCE_LOAD, selectors.STORE_NAME)]: (state, action) => action.resourceData.file.id
      }),
    title: makeReducer('', {
      [makeInstanceAction(RESOURCE_LOAD, selectors.STORE_NAME)]: (state, action) => action.resourceData.file.title
    }),
    slug: makeReducer('', {
      [makeInstanceAction(RESOURCE_LOAD, selectors.STORE_NAME)]: (state, action) => action.resourceData.file.slug
    }),
    longTitle: makeReducer('', {
      [makeInstanceAction(RESOURCE_LOAD, selectors.STORE_NAME)]: (state, action) => action.resourceData.file.longtitle
    }),
    centerTitle:  makeReducer(false, {
      [makeInstanceAction(RESOURCE_LOAD, selectors.STORE_NAME)]: (state, action) => action.resourceData.file.centerTitle
    }),
    widgets: makeReducer([], {
      [makeInstanceAction(RESOURCE_LOAD, selectors.STORE_NAME)]: (state, action) => action.resourceData.file.widgets
    })
  })
  
  
  editor: editorReducer
})

export {
  reducer
}

/*file: makeReducer({}, {
    [makeInstanceAction(RESOURCE_LOAD, selectors.STORE_NAME)]: (state, action) => action.resourceData.file,
    [makeInstanceAction(FORM_SUBMIT_SUCCESS, editorSelectors.FORM_NAME)]: (state, action) => action.updatedData
  }),*/

  /*blog: combineReducers({
    data: combineReducers({
      id: makeReducer('', {
        [makeInstanceAction(RESOURCE_LOAD, selectors.STORE_NAME)]: (state, action) => action.resourceData.blog.id || state
      }),
      title: makeReducer('', {
        [makeInstanceAction(RESOURCE_LOAD, selectors.STORE_NAME)]: (state, action) => action.resourceData.blog.title || state
      }),
      authors: toolbarReducer.authors,
      archives: makeReducer({}, {
        [makeInstanceAction(RESOURCE_LOAD, selectors.STORE_NAME)]: (state, action) => action.resourceData.archives || state
      }),
      tags: toolbarReducer.tags,
      options: editorReducer.options
    })
  })*/
/*
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import {makeInstanceAction} from '#/main/app/store/actions'
import {combineReducers, makeReducer} from '#/main/app/store/reducer'

import {FORM_SUBMIT_SUCCESS} from '#/main/app/content/form/store/actions'
import {TOOL_LOAD} from '#/main/core/tool/store/actions'

import {
  CURRENT_TAB,
  ADMINISTRATION_SET,
  TABS_LOAD
} from '#/main/core/tools/home/store/actions'
import {selectors} from '#/main/core/tools/home/store/selectors'
import {reducer as editorReducer} from '#/main/core/tools/home/editor/store/reducer'

const reducer = combineReducers({
  administration: makeReducer(false, {
    [makeInstanceAction(TOOL_LOAD, selectors.STORE_NAME)]: (state, action) => action.toolData.administration || false,
    [ADMINISTRATION_SET]: (state, action) => action.administration
  }),
  desktopAdmin: makeReducer(false, {
    [makeInstanceAction(TOOL_LOAD, selectors.STORE_NAME)]: (state, action) => action.toolData.desktopAdmin || false
  }),
  editable: makeReducer(false, {
    [makeInstanceAction(TOOL_LOAD, selectors.STORE_NAME)]: (state, action) => action.toolData.editable || false
  }),

  currentTabId: makeReducer(null, {
    [CURRENT_TAB]: (state, action) => action.tab
  }),

  tabs: makeReducer([], {
    [makeInstanceAction(TOOL_LOAD, selectors.STORE_NAME)]: (state, action) => {
      const tabs = [].concat(action.toolData.tabs || [])

      if (isEmpty(tabs) || -1 === tabs.findIndex(tab => !get(tab, 'restrictions.hidden', false))) {
        tabs.push(
          selectors.defaultTab({tool: {currentContext: action.context}})
        )
      }

      return tabs
    },
    [makeInstanceAction(FORM_SUBMIT_SUCCESS, selectors.STORE_NAME + '.editor')]: (state, action) => action.updatedData,
    [TABS_LOAD]: (state, action) => {
      const tabs = [].concat(action.toolData.tabs || [])

      if (isEmpty(tabs) || -1 === tabs.findIndex(tab => !get(tab, 'restrictions.hidden', false))) {
        tabs.push(
          selectors.defaultTab({tool: {currentContext: action.context}})
        )
      }

      return tabs
    }
  }),
  editor: editorReducer
})

export {
  reducer
}

*/

