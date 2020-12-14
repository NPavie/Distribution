import {connect} from 'react-redux'

import {withRouter} from '#/main/app/router'
import {selectors as toolSelectors} from '#/main/core/tool/store'

import {PlayerMain as PlayerMainComponent} from '#/plugin/binder/resources/file/player/components/main'
import {selectors} from '#/plugin/binder/resources/file/store'

const PlayerMain = withRouter(
  connect(
    (state) => ({
      currentContext: toolSelectors.context(state),
      longTitle: selectors.title(state),
      centerTitle: selectors.centerTitle(state),
      widgets: selectors.widgets(state)
    })
  )(PlayerMainComponent)
)

export {
  PlayerMain
}
