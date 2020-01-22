/**
 * test/spec/components/sys-button.js
 * Tests sys-button component
 */

import { mount } from '@vue/test-utils'
import test from 'ava'

import SysButton from '../../../src/components/sys-button.vue'

test('renders as a button if no href is given', (t) => {
  const button = mount(SysButton)
  t.true(button.is('button'))
})

test('renders as an a tag if href is set to outside source', (t) => {
  const button = mount(SysButton)
  button.setProps({ href: 'https://example.com' })
  t.true(button.is('a'))
})

test('renders as an a tag if it\'s not an http/s request', (t) => {
  const button = mount(SysButton)
  button.setProps({ href: 'tcp://127.0.0.1' })
  t.true(button.is('a'))
})

test('renders as nuxt-link if in a nuxt app', (t) => {
  const button = mount(SysButton, { mocks: { $nuxt: {} } })
  button.setProps({ href: '/example' })
  t.true(button.is('nuxt-link'))
})

test('renders as router-link if not in a nuxt app', (t) => {
  const button = mount(SysButton)
  button.setProps({ href: '/example' })
  t.true(button.is('router-link'))
})
