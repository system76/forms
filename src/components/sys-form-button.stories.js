/**
 * src/components/sys-button.stories.js
 * Example usage for the Sys-Button component
 */

import { withKnobs, boolean, select, text } from '@storybook/addon-knobs/vue'
import { storiesOf } from '@storybook/vue'

import SysFormButton from './sys-form-button.vue'

storiesOf('Components|Button', module)
  .addDecorator(withKnobs)
  .add('normal', () => ({
    components: { SysFormButton },
    props: {
      active: { default: boolean('active', false) },
      block: { default: boolean('block', false) },
      color: { default: select('color', ['normal', 'primary', 'secondary'], 'normal') },
      direction: { default: select('direction', ['horizontal', 'vertical']) },
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
        :direction="direction"
        :disabled="disabled"
        :href="href"
        :size="size"
        :tag="tag"
      >
        {{ text }}
      </sys-form-button>
    `
  }))
  .add('with an icon', () => ({
    components: { SysFormButton },
    props: {
      active: { default: boolean('active', false) },
      block: { default: boolean('block', false) },
      color: { default: select('color', ['normal', 'primary', 'secondary'], 'normal') },
      direction: { default: select('direction', ['horizontal', 'vertical']) },
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
        :direction="direction"
        :disabled="disabled"
        :href="href"
        :size="size"
        :tag="tag"
      >
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-user fa-w-14">
          <path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" >
          </path>
        </svg>

        {{ text }}
      </sys-form-button>
    `
  }))
  .add('with parent dimensions', () => ({
    components: { SysFormButton },
    props: {
      active: { default: boolean('active', false) },
      block: { default: boolean('block', false) },
      color: { default: select('color', ['normal', 'primary', 'secondary'], 'normal') },
      direction: { default: select('direction', ['horizontal', 'vertical']) },
      disabled: { default: boolean('disabled', false) },
      href: { default: text('href', '') },
      size: { default: select('size', ['small', 'medium', 'large', 'huge'], 'medium') },
      tag: { default: text('tag', '') },
      text: { default: text('text', 'Some Multiline Button Text') }
    },
    template: `
      <sys-form-button
        :active="active"
        :block="block"
        :color="color"
        :direction="direction"
        :disabled="disabled"
        :href="href"
        :size="size"
        :tag="tag"
        style="height:200px;width:200px;"
      >
        {{ text }}
      </sys-form-button>
    `
  }))
