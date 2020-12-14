/* eslint-disable */

import {registry} from '#/main/app/plugins/registry'

// Note : we use file instead of document on the javascript side as resource type name, as document is reserved

registry.add('BinderBundle', {
  resources: {
    'sidpt_document': () => { return import(/* webpackChunkName: "plugin-sidpt-document-resource" */ '#/plugin/tabbeddoc/resources/file') }
    //, 'sidpt_binder': () => { return import(/* webpackChunkName: "plugin-sidpt-binder-resource" */ '#/plugin/tabbeddoc/resources/binder') }
  }
})
