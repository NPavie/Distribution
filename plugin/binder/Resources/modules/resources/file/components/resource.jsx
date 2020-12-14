import React, {Component} from 'react'
import {PropTypes as T} from 'prop-types'
import get from 'lodash/get'

import {trans} from '#/main/app/intl/translation'
import {CALLBACK_BUTTON} from '#/main/app/buttons'
import {ResourcePage} from '#/main/core/resource/containers/page'


import {FileEditor} from '#/plugin/binder/resources/file/editor/containers/main'
import {FilePlayer} from '#/plugin/binder/resources/file/player/containers/main'


const FileResource = (props) =>  
	<ResourcePage
	    {/*primaryAction="chapter"
	    customActions={[
	      {
	        type: CALLBACK_BUTTON,
	        icon: 'fa fa-fw fa-file-pdf-o',
	        displayed: this.props.canExport,
	        label: trans('export-pdf', {}, 'actions'),
	        group: trans('transfer'),
	        callback: () => this.props.downloadLessonPdf(this.props.lesson.id)
	      }
	    ]}*/}
	    redirect={[]}
	    routes={[
		  {
	        path: '/edit',
	        component: FileEditor
	      },{
	        path: '/',
	        exact: true,
	        component: FilePlayer
	      }
	    ]}
  	/>;


FileResource.propTypes = { }

export {
  FileResource
}
