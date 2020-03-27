import '@system76/design/dist/index.common.css'
import '../src/assets/styles/main.css'

import centered from '@storybook/addon-centered/vue'
import { withA11y } from '@storybook/addon-a11y'
import { addDecorator, addParameters } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import Vue from 'vue'

import { install } from '../src/index'
import { theme } from './theme'

addDecorator(centered)
addDecorator(withA11y)
addDecorator(withInfo)
addParameters({
  options: { theme }
})

Vue.use(install)
