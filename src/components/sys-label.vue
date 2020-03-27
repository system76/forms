/**
 * src/components/sys-label.vue
 * A basic html label tag. This is only the styling.
 */

<template>
  <label
    :class="classes"
    v-on="$listeners"
  >
    <slot />
  </label>
</template>

<script>
import { filterObjectKeys } from '../utility/vue'

export default {
  name: 'SysLabel',

  props: {
    invalid: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes () {
      return filterObjectKeys(this.$style, {
        label: true,
        invalid: this.invalid
      })
    }
  }
}
</script>

<style module>
  .label {
    display: block;
    font-family: var(--font-family-sans);
    font-size: 1rem;
    user-select: none;
  }

  .invalid {
    color: var(--color-light-form-input-invalid);
  }
</style>
