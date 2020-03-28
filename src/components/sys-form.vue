/**
 * src/components/sys-form.vue
 * This is a super smart form that handles validation, error checking, and
 * async submitting.
 */

<template>
  <validation-observer
    ref="observer"
    v-slot="{ invalid, valid }"
    :class="$style.form"
    :disabled="disabled"
    tag="form"
    @submit.prevent="submit"
  >
    <slot
      name="error"
      v-bind="{ error }"
    >
      <sys-form-error v-if="error">
        {{ error }}
      </sys-form-error>
    </slot>

    <slot v-bind="{ submitting, invalid, valid }" />

    <div :class="$style.actions">
      <slot
        name="actions"
        v-bind="{ submitting, submittable: (valid && !submitting), invalid, valid }"
      >
        <sys-form-button
          :color="submitColor"
          :disabled="!valid || submitting"
        >
          {{ submitText }}
        </sys-form-button>
      </slot>
    </div>
  </validation-observer>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import Vue from 'vue'

import SysFormButton from './sys-form-button.vue'
import SysFormError from './sys-form-error.vue'

export default {
  name: 'SysForm',

  components: {
    SysFormButton,
    SysFormError,
    ValidationObserver
  },

  inheritAttrs: false,

  props: {
    /** If the whole form should be disabled */
    disabled: {
      type: Boolean,
      default: false
    },

    /**
     * Invalid text to to display on the form. The form will still be
     * submittable with this text.
     */
    invalid: {
      type: String,
      default: ''
    },

    /** The color the submit button should be */
    submitColor: {
      type: String,
      default: 'primary',
      validator: (v) => ['normal', 'primary', 'secondary'].includes(v)
    },

    /**
     * The function to run when the user submits. This will only occur when
     * validation passes.
     */
    submitFunction: {
      type: Function,
      default: () => null
    },

    /** The text the submit buton should have */
    submitText: {
      type: String,
      default: 'Submit'
    }
  },

  data: () => ({
    formError: '',

    mounted: false,
    submitting: false
  }),

  computed: {
    error () {
      return (this.invalid || this.formError)
    }
  },

  errorCaptured (err, vm, info) {
    this.handleError(err, vm, info)
  },

  methods: {
    handleError (err, vm, info) {
      if (vm == null) {
        vm = this
      }

      this.formError = err.message
      Vue.config.errorHandler(err, vm, info)
    },

    async submit (e) {
      if (this.disabled) {
        e.preventDefault()
        return false
      }

      this.submitting = true

      try {
        const valid = await this.$refs.observer.validate()

        if (!valid) {
          e.preventDefault()
          return false
        } else {
          await this.submitFunction()
        }
      } catch (err) {
        this.handleError(err)
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>

<style module>
  .form {
    display: block;
    margin: 0;
    min-width: calc(320px - 2rem);
    padding: 0;
  }

  .actions {
    align-content: center;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    margin: -0.4rem -0.5rem 0;
  }
</style>
