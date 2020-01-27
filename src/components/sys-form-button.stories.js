/**
 * src/components/sys-button.stories.js
 * Example usage for the Sys-Button component
 */

import { withKnobs, boolean, select, text } from '@storybook/addon-knobs/vue'
import { storiesOf } from '@storybook/vue'

import SysFormButton from './sys-form-button.vue'

storiesOf('Components|Button', module)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components: { SysFormButton },
    props: {
      active: { default: boolean('active', false) },
      block: { default: boolean('block', false) },
      color: { default: select('color', ['normal', 'primary', 'secondary'], 'normal') },
      disabled: { default: boolean('disabled', false) },
      href: { default: text('href', '') },
      size: { default: select('size', ['small', 'medium', 'large', 'huge'], 'medium') },
      tag: { default: text('tag', '') },
      text: { default: text('text', 'Button') }
    },
    template: `
      <sys-form-button
        :active="active"
        :block="block"
        :color="color"
        :disabled="disabled"
        :href="href"
        :size="size"
        :tag="tag"
      >
        {{ text }}
      </sys-form-button>
    `
  }))
