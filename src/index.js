/**
 * src/index.js
 * Exports everything related to System76 form components. Used for webpack /
 * bundler entry points.
 */

import './assets/styles/main.css'

import * as components from './components'

export function install (Vue) {
  Object.keys(components).forEach((componentName) => {
    Vue.component(componentName, components[componentName])
  })
}

export * from './components'
