const { resolve } = require('path')

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.vue$/,
    loader: 'vue-docgen-loader',
    enforce: 'post'
  })

  const cssRule = config.module.rules.find((rule) => {
    return rule.test.test('main.css')
  })

  cssRule.use[0] = 'vue-style-loader'
  cssRule.use[1].options['modules'] = true

  return config
}
