const { resolve } = require('path')

module.exports = {
  plugins: {
    'postcss-preset-env': {
      stage: 0,
      importFrom: resolve(__dirname, 'node_modules/@system76/design/dist/index.common.css'),
      features: {
        'color-mod-function': {
          unresolved: 'warn'
        },
        'custom-properties': {
          preserve: false
        }
      }
    }
  }
}
