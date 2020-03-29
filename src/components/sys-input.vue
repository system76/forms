/**
 * src/components/sys-input.vue
 * A basic html input tag. This is only the styling. It has no special
 * functions or features.
 */

<template>
  <input
    :disabled="disabled"
    :class="classes"
    :value="value"
    @blur="onBlur"
    @change="onChange"
    @focus="onFocus"
    @input="onInput"
  >
</template>

<script>
  import { filterObjectKeys } from '../utility/vue'

  export default {
    name: 'SysInput',

    model: {
      event: 'value'
    },

    props: {
      /** If this input is disabled and should not take input */
      disabled: {
        type: Boolean,
        default: false
      },

      /** Invalid text to set the input to */
      invalid: {
        type: String,
        default: ''
      },

      /** The value of the input */
      value: {
        type: String,
        default: ''
      }
    },

    computed: {
      classes () {
        return filterObjectKeys(this.$style, {
          input: true,
          invalid: this.invalid
        })
      },

      validity: {
        get () {
          return this.$el.validity.valid
        },

        set (value) {
          this.$el.setCustomValidity(value)
        }
      }
    },

    watch: {
      invalid (invalid) {
        this.validity = invalid
      }
    },

    mounted () {
      this.validity = this.invalid
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
        /** Proxy to the html input event, but only sends the input value */
        this.$emit('value', e.target.value)
      }
    }
  }
</script>

<style module>
  .input {
    appearence: none;
    background-color: var(--color-light-form-input-background);
    background-image: none;
    border-radius: 3px;
    border: 1px solid var(--color-light-form-input-border);
    box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.06);
    color: var(--color-light-form-input-foreground);
    display: block;
    font-family: var(--font-family-sans);
    font-size: 1rem;
    height: 2.4rem;
    line-height: 2.4rem;
    margin: 0;
    padding: 0.5rem;
    transition: border-color 200ms ease;
    vertical-align: middle;
    width: 100%;
  }

  .input::-webkit-calendar-picker-indicator {
    display: none;
  }

  .input::-webkit-list-button {
    display: none;
  }

  .input[list] {
    padding: 0.5rem 1.8rem 0.5rem 0.5rem;
  }

  .input[list]:hover,
  .input[list]:focus,
  .input[list]:active {
    background-image: url("../assets/images/carrot.svg");
    background-position: right 0.6em center;
    background-repeat: no-repeat;
    background-size: 0.75em;
  }

  /**
   * States
   */

  .invalid {
    border-color: var(--color-light-form-input-invalid);
    box-shadow: none;
  }

  .input:hover,
  .input:focus,
  .input:active {
    outline: none;
  }

  .input:hover {
    border-color: var(--color-light-form-input-active);
  }

  .input:focus,
  .input:active {
    border-color: var(--color-light-form-input-active);
    outline: none;
  }

  .input:disabled {
    box-shadow: none !important;
    color: var(--color-light-form-input-foreground);
    cursor: default;
    background-color: var(--color-light-form-input-disabled);
    border-color: var(--color-light-form-input-border);
    box-shadow: none;
  }
</style>
