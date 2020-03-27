/**
 * test/utility/browser/image.js
 * A bunch of image compare functions
 * Most of the code here was taken from the amazing `jest-image-snapshot`
 * package.
 */

import * as fs from 'fs'
import * as path from 'path'
import pixelmatch from 'pixelmatch'
import { PNG } from 'pngjs'

import { write } from './fs'

/**
 * Helper function to create reusable image resizer
 *
 * @param {Number} width
 * @param {Number} height
 * @return {Function}
 */
const createImageResizer = (width, height) => (source) => {
  const resized = new PNG({ width, height, fill: true })

  PNG.bitblt(source, resized, 0, 0, source.width, source.height, 0, 0)

  return resized
}

/**
 * Fills diff area with black transparent color for meaningful diff
 *
 * @param {Number} width
 * @param {Number} height
 * @param {Object} image
 * @return {Object}
 */
function fillSizeDifference (width, height, image) {
  const inArea = (x, y) => y > height || x > width

  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      if (inArea(x, y)) {
        const idx = ((image.width * y) + x) << 2
        image.data[idx] = 0
        image.data[idx + 1] = 0
        image.data[idx + 2] = 0
        image.data[idx + 3] = 64
      }
    }
  }

  return image
}

/**
 * Aligns images sizes to biggest common value and fills new pixels with
 * transparent pixels.
 *
 * @param {Object} firstImage
 * @param {Object} secondImage
 * @return {Object[]}
 */
const alignImagesToSameSize = (firstImage, secondImage) => {
  const firstImageWidth = firstImage.width
  const firstImageHeight = firstImage.height
  const secondImageWidth = secondImage.width
  const secondImageHeight = secondImage.height

  const resizeToSameSize = createImageResizer(
    Math.max(firstImageWidth, secondImageWidth),
    Math.max(firstImageHeight, secondImageHeight)
  )

  const resizedFirst = resizeToSameSize(firstImage)
  const resizedSecond = resizeToSameSize(secondImage)

  return [
    fillSizeDifference(firstImageWidth, firstImageHeight, resizedFirst),
    fillSizeDifference(secondImageWidth, secondImageHeight, resizedSecond)
  ]
}

/**
 * Compares two screenshot images.
 *
 * @param {String} received
 * @param {String} snapshot
 * @param {Object} [options]
 * @return {void}
 */
export async function compare (received, snapshot, options) {
  const diffOptions = Object.assign({}, options)

  const rawReceivedImage = PNG.sync.read(fs.readFileSync(received))
  const rawSnapshotImage = PNG.sync.read(fs.readFileSync(snapshot))

  const hasSizeMismatch = (
    rawReceivedImage.height !== rawSnapshotImage.height ||
    rawReceivedImage.width !== rawSnapshotImage.width
  )

  const [receivedImage, snapshotImage] = hasSizeMismatch
    ? alignImagesToSameSize(rawReceivedImage, rawSnapshotImage)
    : [rawReceivedImage, rawSnapshotImage]

  const { height, width } = receivedImage
  const diffImage = new PNG({ height, width })

  const diffPixelCount = pixelmatch(
    receivedImage.data,
    snapshotImage.data,
    diffImage.data,
    width,
    height,
    diffOptions
  )

  const passed = ((diffPixelCount / (height * width)) <= diffOptions.threshold)

  if (!passed) {
    const images = [receivedImage, diffImage, snapshotImage]

    const compositeResultImage = new PNG({
      height: Math.max(...images.map((i) => i.height)),
      width: images.map((i) => i.width).reduce((a, b) => (a + b), 0)
    })

    images.forEach((i, idx) => {
      i.bitblt(
        compositeResultImage,
        0,
        0,
        i.width,
        i.height,
        images.slice(0, idx).map((i) => i.width).reduce((a, b) => (a + b), 0),
        0
      )
    })

    const diffParse = path.parse(received)
    const diffName = `${diffParse.name}-diff`
    const diffPath = path.format({ ...diffParse, base: null, name: diffName })
    const diffBuffer = PNG.sync.write(compositeResultImage, { filterType: 4 })

    await write(diffPath, diffBuffer)
  }

  return {
    passed,
    percentage: (1 - diffPixelCount / (height * width))
  }
}
