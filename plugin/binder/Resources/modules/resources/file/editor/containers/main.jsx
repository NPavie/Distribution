import {connect} from 'react-redux'

import {withRouter} from '#/main/app/router'
import {actions as formActions} from '#/main/app/content/form/store/actions'
import {selectors as resourcesSelectors} from '#/main/core/resource/store'
import {selectors as toolSelectors} from '#/main/core/tool/store'

import {FileEditorMain as FileEditorMainComponent} from '#/plugin/binder/resources/file/editor/components/main'

import {selectors} from '#/plugin/binder/resources/file/store'
import {selectors as editorSelectors} from '#/plugin/binder/resources/file/editor/store'


const FileEditorMain = withRouter(
  connect(
    (state) => ({
      path: resourcesSelectors.path(state),
      id: selectors.file(state).id,
      currentContext: toolSelectors.context(state),
      widgets: selectors.widgets(state)
    }),
    (dispatch) => ({
      update(field, value) {
        dispatch(formActions.updateProp(editorSelectors.FORM_NAME, `${field}`, value))
      }/*,
      setErrors(errors) {
        dispatch(formActions.setErrors(editorSelectors.FORM_NAME, errors))
      }*/
    })
  )(FileEditorMainComponent)
)

export {
  FileEditorMain
}
