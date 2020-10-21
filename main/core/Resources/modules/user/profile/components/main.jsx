import React, {Component} from 'react'
import {PropTypes as T} from 'prop-types'

import {Routes} from '#/main/app/router'
import {hasPermission} from '#/main/app/security'
import {UserPage} from '#/main/core/user/components/page'
import {User as UserTypes} from '#/main/core/user/prop-types'
import {ContentLoader} from '#/main/app/content/components/loader'
import {getToolBreadcrumb, showToolBreadcrumb} from '#/main/core/tool/utils'

import {ProfileEdit} from '#/main/core/user/profile/editor/components/main'
import {ProfileShow} from '#/main/core/user/profile/player/components/main'

// TODO : remove hard dependency to plugin
import {Tracking} from '#/plugin/analytics/user/tracking/containers/main'

class Profile extends Component {
  componentDidMount() {
    if (!this.props.loaded) {
      this.props.open(this.props.publicUrl)
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.loaded && this.props.loaded !== prevProps.loaded) {
      this.props.open(this.props.publicUrl)
    }
  }

  render() {
    if (!this.props.loaded) {
      return (
        <ContentLoader
          size="lg"
          description="Nous chargeons votre utilisateur..."
        />
      )
    }

    return (
      <UserPage
        showBreadcrumb={showToolBreadcrumb(this.props.currentContext.type, this.props.currentContext.data)}
        breadcrumb={getToolBreadcrumb('community', this.props.currentContext.type, this.props.currentContext.data)}
        user={this.props.user}
        path={this.props.path}
        currentUser={this.props.currentUser}
        history={this.props.history}
      >
        <Routes
          path={this.props.path}
          routes={[
            {
              path: '/show',
              render: () => {
                return (
                  <ProfileShow
                    path={this.props.path}
                  />
                )
              }
            }, {
              path: '/edit',
              disabled: !hasPermission('edit', this.props.user),
              render: () => {
                return (
                  <ProfileEdit
                    path={this.props.path}
                  />
                )
              }
            }, {
              path: '/dashboard',
              component: Tracking,
              disabled: !hasPermission('show_dashboard', this.props.user)
            }
          ]}
          redirect={[
            {from: '/', exact: true, to: '/show'}
          ]}
        />
      </UserPage>
    )
  }
}

Profile.propTypes = {
  publicUrl: T.string.isRequired,
  history: T.object.isRequired,
  currentContext: T.object,
  user: T.shape(
    UserTypes.propTypes
  ).isRequired,
  currentUser: T.shape(
    UserTypes.propTypes
  ).isRequired,
  path: T.string,
  loaded: T.bool,
  parameters: T.object.isRequired,
  open: T.func.isRequired
}

export {
  Profile
}
