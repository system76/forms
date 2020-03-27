/**
 * src/utility/vue.js
 * Some random Vue helpers.
 */

/**
 * Returns a list of object values from an object of boolean filters. This is
 * easier to picture, so here:
 *
 * ```js
 * filterObjectKeys({ a: 1, b: 2 }, { a: false, b: true }) // [2]
 * ```
 *
 * We use this a lot for giving an array of Vue module styles like so:
 *
 * ```js
 * return filterObjectKeys(this.$style, {
 *   ['input--disabled']: this.disabled
 * })
 * ```
 *
 * @param {Object} obj
 * @param {Object} filters
 * @return {*[]}
 */
export function filterObjectKeys (obj, filters) {
  const output = []

  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      output.push(obj[key])
    }
  })

  return output
}
