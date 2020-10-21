import React from 'react'
import {PropTypes as T} from 'prop-types'

import {Routes} from '#/main/app/router'

import {Profile} from '#/main/core/user/profile/containers/main'

const AccountMain = (props) =>
  <Routes
    path="/account"
    redirect={[
      {from: '/', exact: true, to: '/profile'}
    ]}
    routes={[
      {
        path: '/profile',
        render() {
          return (
            <Profile
              path="/account/profile"
              publicUrl={props.currentUser.publicUrl}
            />
          )
        }
      }
    ]}
  />

AccountMain.propTypes = {
  currentUser: T.shape({
    publicUrl: T.string.isRequired
  })
}

export {
  AccountMain
}
