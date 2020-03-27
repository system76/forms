/**
 * test/spec/utility/vue.js
 * Tests the random utility functions we have.
 */

import test from 'ava'

import * as utility from '../../../src/utility/vue'

test('filterObjectKeys filters values given', (t) => {
  const res = utility.filterObjectKeys({ a: 1, b: 2 }, { a: false, b: true })
  t.false(res.includes(1))
  t.true(res.includes(2))
})
