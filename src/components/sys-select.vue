/**
 * src/components/sys-select.vue
 * A basic html select tag. This is only the styling.
 */

<template>
  <select
    v-bind="$attrs"
    :disabled="disabled"
    :class="$style.input"
    v-on="$listeners"
  >
    <!-- @slot The Inner HTML for `option` tags -->
    <slot />
  </select>
</template>

<script>
  export default {
    name: 'SysSelect',

    props: {
      /** If this input is disabled and should not take input */
      disabled: {
        type: Boolean,
        default: false
      },

      /**
       * If this input is invalid and requires changes. You can give an error
       * string to set the html invalid text.
       */
      invalid: {
        type: [Boolean, String],
        default: false
      }
    },

    computed: {
      validity: {
        get () {
          return this.$el.validity.valid
        },

        set (value) {
          if (typeof value === 'string') {
            this.$el.setCustomValidity(value)
          } else if (value === true) {
            this.$el.setCustomValidity('invalid')
          } else {
            this.$el.setCustomValidity('')
          }
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
    }
  }
</script>

<style module>
  .input {
    appearance: none;
    background-color: var(--color-light-form-input-background);
    background-image: url("../assets/images/carrot.svg");
    background-position: right 0.6em center;
    background-repeat: no-repeat;
    background-size: 0.75em;
    border-radius: 3px;
    border: 1px solid var(--color-light-form-input-border);
    box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.06);
    color: var(--color-light-form-input-foreground);
    display: block;
    font-family: var(--font-family-sans);
    font-size: 1rem;
    height: 2.4rem;
    line-height: 1.4rem;
    margin: 0;
    padding: 0.5rem 1.8rem 0.5rem 0.5rem;
    transition: border-color 200ms ease;
    vertical-align: middle;
    white-space: nowrap;
    width: 100%;
  }

  .input::-ms-expand {
    display: none;
  }

  .input >>> option {
    padding: 2rem;
    font-weight: inherit;
    border: none;
  }

  /**
   * States
   */

  .input:invalid {
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
