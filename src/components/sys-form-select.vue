/**
 * src/components/sys-form-select.vue
 * A select input. This includes the label, the input, validation, and
 * error handling.
 */

<template>
  <div>
    <sys-label :for="id">
      {{ label }}
    </sys-label>

    <sys-select
      :id="id"
      v-bind="{ ...$attrs }"
      :class="inputClasses"
      :disabled="disabled"
      @blur="onBlur"
      @change="onChange"
      @focus="onFocus"
      @input="onInput"
      @value="onValue"
    >
      <slot />
    </sys-select>
  </div>
</template>

<script>
  import SysLabel from './sys-label.vue'
  import SysSelect from './sys-select.vue'

  export default {
    name: 'SysFormSelect',

    components: {
      SysSelect,
      SysLabel
    },

    inheritAttrs: false,

    model: {
      event: 'value'
    },

    props: {
      /** If this input is disabled and should not take input */
      disabled: {
        type: Boolean,
        default: false
      },

      /**
       * The input id and the label `for` attribute. This is required, but is not
       * user facing.
       */
      id: {
        type: String,
        required: true
      },

      /** The label text to go above the input */
      label: {
        type: String,
        required: true
      }
    },

    computed: {
      /** This is used for components that inherit sys-form-input */
      inputClasses () {
        return []
      }
    },

    methods: {
      onBlur (e) {
        /** Proxy to the html blur event */
        this.$emit('blur', e)
      },

      onChange (e) {
        /** Proxy to the html change event */
        this.$emit('change', e)
      },

      onFocus (e) {
        /** Proxy to the html focus event */
        this.$emit('focus', e)
      },

      onInput (e) {
        /** Proxy to the html input event */
        this.$emit('input', e)
      },

      onValue (v) {
        /** Proxy to the html input event, but only sends the input value */
        this.$emit('value', v)
      }
    }
  }
</script>
