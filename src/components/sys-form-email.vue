/**
 * src/components/sys-form-email.vue
 * An email entry input.
 */

<script>
  import { combineRules } from '../utility/validation/utility'
  import SysFormInput from './sys-form-input.vue'

  export default {
    name: 'SysFormEmail',

    extends: SysFormInput,

    props: {
      /** The label text to go above the input */
      label: {
        type: String,
        default: 'Email Address'
      },

      /** Placeholder text to put in the input */
      placeholder: {
        type: String,
        default: 'tux@system76.com'
      }
    },

    computed: {
      inputType () {
        return 'email'
      },

      rules () {
        return combineRules('email', this.validation)
      }
    }
  }
</script>
