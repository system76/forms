/**
 * src/components/sys-form-markdown.vue
 * A markdown textarea input.
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
    <div :class="$style.label">
      <sys-label
        :for="id"
        :invalid="errors.length > 0"
      >
        {{ label }}
      </sys-label>

      <a
        :class="{ [$style.markdown]: true, [$style['markdown--error']]: (errors.length > 0) }"
        href="http://commonmark.org/help/"
        rel="noopener noreferrer"
        target="_blank"
        tabindex="-1"
        title="Markdown Cheatsheet"
        aria-label="Markdown Cheatsheet"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 208 128"
        >
          <path d="M15 0C6.776 0 0 6.776 0 15v98c0 8.224 6.776 15 15 15h178c8.224 0 15-6.776 15-15V15c0-8.224-6.776-15-15-15H15zm0 10h178c2.856 0 5 2.144 5 5v98c0 2.856-2.144 5-5 5H15c-2.856 0-5-2.144-5-5V15c0-2.856 2.144-5 5-5z" />
          <path d="M30 98V30h20l20 25 20-25h20v68H90V59L70 84 50 59v39zm125 0l-30-33h20V30h20v35h20z" />
        </svg>
      </a>
    </div>

    <sys-textarea
      :id="id"
      v-bind="{ ...ariaInput, ...$attrs }"
      :class="inputClasses"
      :disabled="disabled"
      :invalid="errors[0]"
      :placeholder="placeholder"
      :required="required"
      :value="value"
      @blur="onBlur"
      @change="onChange"
      @focus="onFocus"
      @input="onInput"
      @value="onValue"
    />

    <sys-input-error v-bind="ariaMsg">
      {{ errors[0] }}
    </sys-input-error>
  </validation-provider>
</template>

<script>
  import { ValidationProvider } from 'vee-validate'

  import SysInputError from './sys-input-error.vue'
  import SysLabel from './sys-label.vue'
  import SysTextarea from './sys-textarea.vue'

  export default {
    name: 'SysFormMarkdown',

    components: {
      SysTextarea,
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

      /** The value of the input */
      value: {
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
      /** This is used for components that inherit sys-form-textarea */
      inputClasses () {
        return []
      },

      /**
       * Validation rules to be passed to vee-validate. Overwritten by
       * components that inherit sys-form-textarea
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

  .label {
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-end;
    align-content: flex-end;
    justify-content: space-between;
  }

  .label label {
    flex: 1 1 auto;
  }

  .markdown {
    color: var(--color-light-form-input-hint);
    flex: 0 0 auto;
    outline: none;
    padding-left: 1ch;
  }

  .markdown--error {
    color: var(--color-light-form-input-invalid);
  }

  .markdown:hover,
  .markdown:active,
  .markdown:focus {
    color: var(--color-light-form-input-active);
  }

  .markdown svg {
    height: 1rem;
  }
</style>
