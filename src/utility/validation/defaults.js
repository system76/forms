/**
 * src/utility/validation/defaults.js
 * Sets up a bunch of default rules for this package.
 */

import { extend } from 'vee-validate'

import * as rules from './rules'

/**
 * Installs a bunch of commonly used rules for vee-validate
 *
 * @return {void}
 */
export function installDefaultRules () {
  Object.entries(rules).forEach(([name, rule]) => {
    extend(name, rule)
  })
}
