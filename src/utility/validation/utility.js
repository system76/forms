/**
 * src/utility/validation/utility.js
 * Some additional vee-validate functions.
 */

/**
 * Combines two vee-validate rule sets
 *
 * @param {Object|String} given
 * @param {Object|String} additional
 * @return {}
 */
export function combineRules (given, additional) {
  return Object.assign({}, objectRules(given), objectRules(additional))
}

function objectRules (value) {
  if (typeof value === 'object') {
    return value
  }

  const parsedString = value.split('|')
    .map((v) => v.split(':'))
    .map(([r, args = '']) => ([r, args.split(',')]))

  const out = {}

  for (const [rule, args] of parsedString) {
    if (rule !== '') {
      if (args.length === 1 && args[0] === '') {
        out[rule] = true
      } else {
        out[rule] = args
      }
    }
  }

  return out
}
