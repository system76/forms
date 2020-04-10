/**
 * test/spec/utility/validation/utility.js
 * Tests the additional vee-validation functions we have.
 */

import test from 'ava'

import * as utility from '../../../../src/utility/validation/utility'

const mockRule = () => ({
  validate: (v) => true,
  message: 'test rule'
})

test('can combine two string validation rules', (t) => {
  const res = utility.combineRules('email', 'required')
  t.deepEqual(res, { email: true, required: true })
})

test('ignores empty string rules', (t) => {
  const res = utility.combineRules('email|required', '')
  t.deepEqual(res, { email: true, required: true })
})

test('can combine two object validation rules', (t) => {
  const res = utility.combineRules({ integer: true }, { required: true })
  t.deepEqual(res, { integer: true, required: true })
})

test('can combine rule definition with boolean', (t) => {
  const mock = mockRule()
  const res = utility.combineRules({ mock }, { required: true })
  t.deepEqual(res, { mock, required: true })
})

test('can combine a string and object set of rules', (t) => {
  const res = utility.combineRules('email', { required: true })
  t.deepEqual(res, { email: true, required: true })
})

test('can convert string args to object format', (t) => {
  const res = utility.combineRules('between:1,4', { required: true })
  t.deepEqual(res, { between: ['1', '4'], required: true })
})
