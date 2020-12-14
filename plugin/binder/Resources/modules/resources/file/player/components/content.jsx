import React from 'react'
import {PropTypes as T} from 'prop-types'

import {WidgetContainer as WidgetContainerTypes} from '#/main/core/widget/prop-types'

const PlayerContent = props =>
    <PageContent>
      <WidgetGrid
        currentContext={props.currentContext}
        widgets={props.widgets}
      />
    </PageContent>

PlayerContent.propTypes = {
  currentContext: T.object.isRequired,
  widgets: T.arrayOf(T.shape(
    WidgetContainerTypes.propTypes
  )).isRequired
}

export {
  PlayerContent
}
