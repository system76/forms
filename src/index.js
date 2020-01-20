/**
 * entry.js
 * Exports everything related to System76 form components
 */

import * as components from './components'

export function install (Vue) {
  Object.keys(components).forEach((componentName) => {
    Vue.component(componentName, components[componentName])
  })
}

export * from './components'
