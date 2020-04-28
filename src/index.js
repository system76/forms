/**
 * src/index.js
 * Exports everything related to System76 form components. Used for webpack /
 * bundler entry points.
 */

import './assets/styles/main.css'

import { setInteractionMode } from 'vee-validate'

import * as components from './components'
import { installDefaultRules } from './utility/validation/defaults'

export function install (Vue) {
  Object.keys(components).forEach((componentName) => {
    Vue.component(componentName, components[componentName])
  })

  setInteractionMode('eager')
  installDefaultRules()
}

export * from './components'
export * from './utility/validation/rules'

export { validate } from 'vee-validate'
