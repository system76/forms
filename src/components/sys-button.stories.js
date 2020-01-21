/**
 * src/components/sys-button.stories.js
 * Example usage for the Sys-Button component
 */

import { withKnobs, boolean, select, text } from '@storybook/addon-knobs/vue'
import { storiesOf } from '@storybook/vue'

import SysButton from './sys-button.vue'

console.log(SysButton)

storiesOf('Components|Button', module)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components: { SysButton },
    props: {
      active: { default: boolean('active', false) },
      block: { default: boolean('block', false) },
      color: { default: select('color', ['normal', 'destructive', 'suggested'], 'normal') },
      href: { default: text('href', '') },
      outline: { default: boolean('outline', false) },
      size: { default: select('size', ['small', 'medium', 'large', 'huge'], 'medium') }
    },
    template: `
      <sys-button
        :active="active"
        :block="block"
        :color="color"
        :href="href"
        :outline="outline"
        :size="size"
      >
        button
      </sys-button>
    `
  }))
