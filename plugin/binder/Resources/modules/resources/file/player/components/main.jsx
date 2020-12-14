import React,{Fragment} from 'react'
import {PropTypes as T} from 'prop-types'

import {WidgetContainer as WidgetContainerTypes} from '#/main/core/widget/prop-types'
import {PlayerContent} from '#/plugin/binder/resources/file/player/components/content'

const PlayerMain = props =>
  <Fragment>
    {props.longTitle &&
      <header className={props.centerTitle ? "text-center" : ''}> 
        <PageTitle
            title={props.longTitle}
          />
      </header>
    }
    <PlayerContent 
        currentContent={props.currentContext} 
        widgets={props.widgets}
    />
  </Fragment>

PlayerMain.propTypes = {
  longTitle: T.string,
  centerTitle: T.bool,
  currentContext: T.object.isRequired,
  widgets: T.arrayOf(T.shape(
    WidgetContainerTypes.propTypes
  )).isRequired,

}

export {
  PlayerMain
}
