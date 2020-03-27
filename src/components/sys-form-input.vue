/**
 * src/components/sys-form-input.vue
 * A form input. This includes the label, the input, (todo) validation, and
 * error handling.
 */

<template>
  <div :class="$style.formgroup">
    <sys-label
      :for="id"
    >
      {{ label }}
    </sys-label>

    <sys-input
      :id="id"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import SysInput from './sys-input'
import SysLabel from './sys-label'

export default {
  name: 'SysFormInput',

  components: {
    SysLabel,
    SysInput
  },

  inheritAttrs: false,

  props: {
    /**
     * The input id and the label `for` attribute. This is required, but is not
     * user facing.
     */
    id: {
      type: String,
      required: true
    },

    /**
     * The label text for the input
     */
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style module>
  .formgroup {
    display: block;
    margin: 2rem 0;
  }
</style>
