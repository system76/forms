/**
 * test/utility/browser/screenshot.js
 * Takes a screenshot and asserts the difference
 */

import { uptime } from 'os'
import * as path from 'path'
import { t } from 'testcafe'

import { fileExists } from './fs'
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
  const fixture = fixtureFile(p)

  if (await fileExists(abs(fixture))) {
    const current = await takeScreenshot(el, tempFile())
    const { percentage } = await compare(current, abs(fixture), options)

    await t.expect(percentage).gte(1 - options.threshold, 'Screenshot does not meet threshold')
  } else {
    await takeScreenshot(el, fixture)
  }
}
