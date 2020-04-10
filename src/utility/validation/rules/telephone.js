/**
 * src/utility/validation/telephone.js
 * Like the default numeric validation, but also includes spaces. Used for
 * telephone numbers.
 */

const ar = /^[٠١٢٣٤٥٦٧٨٩\s#+]+$/
const en = /^[0-9\s#+]+$/

function test (value) {
  const strValue = String(value)
  return en.test(strValue) || ar.test(strValue)
}

export function validate (value) {
  if (Array.isArray(value)) {
    return value.every(test)
  } else {
    return test(value)
  }
}
