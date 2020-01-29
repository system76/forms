/**
 * test/spec/components/sys-button.js
 * Tests sys-button component
 */

import { RouterLinkStub, shallowMount } from '@vue/test-utils'
import test from 'ava'

import SysFormButton from '../../../src/components/sys-form-button.vue'

test('renders as a button if no href is given', (t) => {
  const button = shallowMount(SysFormButton)

  t.log(button.html())
  t.true(button.contains('button'))
})

test('allows setting an arbitrary tag', (t) => {
  const button = shallowMount(SysFormButton, {
    propsData: { tag: 'div' }
  })

  t.log(button.html())
  t.true(button.contains('div'))
})

test('renders as an a tag if href is set to outside source', (t) => {
  const button = shallowMount(SysFormButton, {
    propsData: { href: 'https://example.com' }
  })

  t.log(button.html())
  t.true(button.contains('a'))
})

test('renders as an a tag if it\'s not an http/s request', (t) => {
  const button = shallowMount(SysFormButton, {
    propsData: { href: 'tcp://127.0.0.1' }
  })

  t.log(button.html())
  t.true(button.contains('a'))
})

test('renders as nuxt-link if in a nuxt app', (t) => {
  const button = shallowMount(SysFormButton, {
    mocks: { $nuxt: {} },
    propsData: { href: '/example' },
    subs: { NuxtLink: RouterLinkStub }
  })

  t.log(button.html())
  t.true(button.contains('nuxt-link'))
})

test('renders as router-link if not in a nuxt app', (t) => {
  const button = shallowMount(SysFormButton, {
    propsData: { href: '/example' },
    router: {},
    subs: { RouterLink: RouterLinkStub }
  })

  t.log(button.html())
  t.true(button.contains('router-link'))
})

test('uses to prop when rendering as a router-link', (t) => {
  const button = shallowMount(SysFormButton, {
    propsData: {
      href: '/test',
      tag: 'router-link'
    },
  })

  const html = button.html()

  t.log(html)
  t.true(html.includes('to="/test"'))
})

test('uses to prop when rendering as a nuxt-link', (t) => {
  const button = shallowMount(SysFormButton, {
    propsData: {
      href: '/test',
      tag: 'nuxt-link'
    },
  })

  const html = button.html()

  t.log(html)
  t.true(html.includes('to="/test"'))
})
