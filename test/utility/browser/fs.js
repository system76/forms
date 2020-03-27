/**
 * test/utility/browser/file.js
 * Random utility functions for fs files.
 */

import * as fs from 'fs'

function pathExists (p, fn = (s) => s.isFile()) {
  return new Promise((resolve, reject) => {
    fs.stat(p, (err, stat) => {
      if (err == null) {
        return resolve(fn(stat))
      } else if (err.code === 'ENOENT') {
        return resolve(false)
      } else {
        return reject(err)
      }
    })
  })
}

/**
 * Checks if a file exists
 *
 * @param {String} p
 * @return {Boolean}
 */
export function fileExists (p) {
  return pathExists(p, (s) => s.isFile())
}

/**
 * Checks if a folder exists
 *
 * @param {String} p
 * @return {Boolean}
 */
export function directoryExists (p) {
  return pathExists(p, (s) => s.isDirectory())
}

/**
 * Creates a new folder if it does not already exist
 *
 * @param {String} p
 * @return {void}
 */
export async function mkdir (p) {
  if (!(await directoryExists(p))) {
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

/**
 * Writes a buffer to a file.
 *
 * @param {String} p
 * @param {Buffer} buffer
 * @return {void}
 */
export async function write (p, buffer) {
  await new Promise((resolve, reject) => {
    fs.writeFile(p, buffer, (err) => {
      if (err != null) {
        return reject(err)
      } else {
        return resolve()
      }
    })
  })
}
