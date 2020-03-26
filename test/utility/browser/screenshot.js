/**
 * test/utility/browser/screenshot.js
 * Takes a screenshot and asserts the difference
 */

import { uptime } from 'os'
import { t } from 'testcafe'
import * as path from 'path'

import { fileExists, mkdir } from './fs'
import { compare } from './image'

const abs = (name) => path.resolve(__dirname, '../../screenshots', name)
const tempFile = () => `tmp/${uptime()}.png`
const fixtureFile = (name) => `tests/${name}.png`

/**
 * Takes a screenshot of an element
 *
 * @param {Selector} el
 * @param {String} path
 * @return {String}
 */
export async function takeScreenshot (el, p) {
  await t.takeElementScreenshot(el, p, {
    includeBorders: true,
    includeMargins: false,
    includePaddings: true
  })

  return abs(p)
}

/**
 * Takes a screenshot of an element, and then compares it with what
 * we have stored in the repo.
 *
 * @param {Selector} el
 * @param {String} path
 * @return {void}
 */
export async function assertScreenshot (el, p, options = { threshold: 0.1 }) {
  const fixture = abs(fixtureFile(p))

  if (await fileExists(fixture)) {
    const current = await takeScreenshot(el, tempFile())
    const { passed, percentage } = await compare(current, fixture, options)

    console.log('passed', passed)
    await t.expect(percentage).gte(1 - options.threshold, 'Screenshot does not meet threshold')
  } else {
    await takeScreenshot(el, p)
  }
}
