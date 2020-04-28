/**
 * src/components/sys-form-select.vue
 * A select input. This includes the label, the input, validation, and
 * error handling.
 */

<template>
  <validation-provider
    ref="provider"
    v-slot="{ errors, required, ariaInput, ariaMsg }"
    :class="$style.formgroup"
    :disabled="disabled"
    :name="id"
    :rules="rules"
    :immediate="immediate"
    tag="div"
  >
    <sys-label
      :for="id"
      :invalid="errors.length > 0"
    >
      {{ label }}
    </sys-label>

    <sys-select
      :id="id"
      v-bind="{ ...ariaInput, ...$attrs }"
      :class="inputClasses"
      :disabled="disabled"
      :invalid="errors[0]"
      :placeholder="placeholder"
      :required="required"
      @blur="onBlur"
      @change="onChange"
      @focus="onFocus"
      @input="onInput"
      @value="onValue"
    >
      <slot />
    </sys-select>

    <sys-input-error v-bind="ariaMsg">
      {{ errors[0] }}
    </sys-input-error>
  </validation-provider>
</template>

<script>
  import { ValidationProvider } from 'vee-validate'

  import SysInputError from './sys-input-error.vue'
  import SysLabel from './sys-label.vue'
  import SysSelect from './sys-select.vue'

  export default {
    name: 'SysFormSelect',

    components: {
      SysSelect,
      SysInputError,
      SysLabel,
      ValidationProvider
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

      /** If the input should be validated immediatly on render */
      immediate: {
        type: Boolean,
        default: false
      },

      /** The label text to go above the input */
      label: {
        type: String,
        required: true
      },

      /** Placeholder text to put in the input */
      placeholder: {
        type: String,
        default: ''
      },

      /**
       * Validation rules for the input. See `vee-validate` package for more
       * details
       */
      validation: {
        type: [String, Object],
        default: ''
      }
    },

    computed: {
      /** This is used for components that inherit sys-form-input */
      inputClasses () {
        return []
      },

      /**
       * Validation rules to be passed to vee-validate. Overwritten by
       * components that inherit sys-form-input
       */
      rules () {
        return this.validation
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

<style module>
  .formgroup {
    display: block;
    margin: 0.6rem 0;
  }
</style>
