/**
 * test/spec/utility/validation/rules/telephone.js
 * Tests telephone validation
 */

import test from 'ava'

import { validate } from '../../../../../src/utility/validation/rules/telephone'

test('validates US phone numbers', (t) => {
  t.true(validate('+1 123 423 5932'))
  t.true(validate('123 423 5932'))
  t.true(validate('602 423 5932#42'))
  t.true(validate('12345678901'))
})

test('invalidates non phone number values', (t) => {
  t.false(validate('notaphonenumber'))
  t.false(validate('+1 602 nope'))
})
