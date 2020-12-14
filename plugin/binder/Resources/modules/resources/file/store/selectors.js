import {createSelector} from 'reselect'

import {trans} from '#/main/app/intl/translation'
import {makeId} from '#/main/core/scaffolding/id'

import {selectors as toolSelectors} from '#/main/core/tool/store/selectors'
import {selectors as resourceSelect} from '#/main/core/resource/store'
import {hasPermission} from '#/main/app/security'

const STORE_NAME = 'sidpt_document'

const resource = (state) => state[STORE_NAME]

const context = toolSelectors.context

const file = createSelector(
  [resource],
  (resource) => resource.file
)

const title = createSelector(
  [file],
  (file) => file.longTitle
)

const centerTitle = createSelector(
  [file],
  (file) => file.centerTitle
)

const widgets = createSelector(
  [file],
  (file) => file.widgets
)

const canEdit = (state) => hasPermission('edit', resourceSelect.resourceNode(state));

export const selectors = {
  STORE_NAME,
  canEdit,
  resource,
  title,
  widgets
  context
}
