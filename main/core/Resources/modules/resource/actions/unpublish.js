import get from 'lodash/get'

import {url} from '#/main/app/api'
import {number} from '#/main/app/intl'
import {ASYNC_BUTTON} from '#/main/app/buttons'

import {trans} from '#/main/app/intl/translation'

/**
 * Unpublishes some resource nodes.
 *
 * @param {Array}  resourceNodes  - the list of resource nodes on which we want to execute the action.
 * @param {object} nodesRefresher - an object containing methods to update context in response to action (eg. add, update, delete).
 */
export default (resourceNodes, nodesRefresher) => ({
  name: 'unpublish',
  type: ASYNC_BUTTON,
  icon: 'fa fa-fw fa-eye-slash',
  label: trans('unpublish', {}, 'actions'),
  displayed: -1 !== resourceNodes.findIndex(node => !!get(node, 'meta.published')),
  subscript: 1 === resourceNodes.length ? {
    type: 'label',
    status: 'primary',
    value: number(get(resourceNodes[0], 'meta.views') || 0, true)
  } : undefined,
  request: {
    type: 'unpublish',
    url: url(
      ['claro_resource_collection_action', {action: 'unpublish'}],
      {ids: resourceNodes.map(resourceNode => resourceNode.id)}
    ),
    request: {
      method: 'PUT'
    },
    success: (response) => nodesRefresher.update(response)
  }
})
