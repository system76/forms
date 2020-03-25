/**
 * test/utility/browser/screenshot.js
 * Takes a screenshot and asserts the difference
 */

import * as fs from 'fs'
import looksSame from 'looks-same'
import { uptime } from 'os'
import * as path from 'path'

const abs = (name) => path.resolve(__dirname, '../../screenshots', name)
const tempFile = () => `tmp/${uptime()}.png`
const fixtureFile = (name) => `tests/${name}.png`

function fileExists (p) {
  return new Promise((resolve, reject) => {
    fs.stat(abs(p), (err, stat) => {
      if (err == null) {
        return resolve(stat.isFile())
      } else if (err.code === 'ENOENT') {
        return resolve(false)
      } else {
        return reject(err)
      }
    })
  })
}

async function mkdir (p) {
  const exists = await new Promise((resolve, reject) => {
    fs.stat(p, (err, stat) => {
      if (err == null) {
        return resolve(stat.isDirectory())
      } else if (err.code === 'ENOENT') {
        return resolve(false)
      } else {
        return reject(err)
      }
    })
  })

  if (!exists) {
    await new Promise((resolve, reject) => {
      fs.mkdir(p, { recursive: true }, (err) => {
        if (err != null) {
          return reject(err)
        } else {
          return resolve()
        }
      })
    })
  }
}

async function takeScreenshot (t, el, path) {
  await t.takeElementScreenshot(el, path, {
    includeBorders: true,
    includeMargins: false,
    includePaddings: true
  })

  return path
}

export async function assertScreenshot (t, el, name) {
  const fixture = fixtureFile(name)
  const fixtureExists = await fileExists(fixture)

  if (fixtureExists) {
    const currentImage = await takeScreenshot(t, el, tempFile())

    const options = {
      antialiasingTolerance: 3,
      ignoreAntialiasing: true,
      ignoreCaret: true,
      tolerance: 3
    }

    const result = await new Promise((resolve, reject) => {
      looksSame(abs(fixture), abs(currentImage), options, (err, data) => {
        if (err != null) {
          return reject(err)
        } else {
          return resolve(data)
        }
      })
    })

    if (!result.equal) {
      const diffImage = abs(`results/${name}.png`)
      const { dir } = path.parse(diffImage)
      await mkdir(dir)

      await new Promise((resolve, reject) => {
        looksSame.createDiff({
          reference: abs(fixture),
          current: abs(currentImage),
          diff: diffImage,
          highlightColor: '#ff00ff',
          ...options
        }, (err) => {
          if (err != null) {
            return reject(err)
          } else {
            return resolve()
          }
        })
      })
    }

    await t.expect(result.equal).ok(`Current screenshot matches ${name}`)
  } else {
    await takeScreenshot(t, el, fixture)
  }
}
