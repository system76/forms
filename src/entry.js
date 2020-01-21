/**
 * src/entry.js
 * Global document entry point for @system76/forms. This file is used for a
 * browser entry point.
 */

import * as plugin from './index'

let GlobalVue = null

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}

if (GlobalVue) {
  GlobalVue.use(plugin)
}

export * from './index'
