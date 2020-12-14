import {PropTypes as T} from 'prop-types'

import {Widget} from '#/main/core/widget/prop-types'

const File = {
  propTypes: {
    longTitle: T.string
    centerTitle: T.bool.isRequired,
    widgets: T.arrayOf(T.shape(
      Widget.propTypes
    ))
  },
  defaultProps: {
    widgets: [],
    centerTitle: false,
  }
}

export {
  File
}
