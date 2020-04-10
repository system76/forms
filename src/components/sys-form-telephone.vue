/**
 * src/components/sys-form-telephone.vue
 * A telephone entry input.
 */

<script>
  import { combineRules } from '../utility/validation/utility'
  import SysFormInput from './sys-form-input.vue'

  export default {
    name: 'SysFormTelephone',

    extends: SysFormInput,

    props: {
      /** The label text to go above the input */
      label: {
        type: String,
        default: 'Phone Number'
      },

      /** Placeholder text to put in the input */
      placeholder: {
        type: String,
        default: '1 720 226 9269'
      }
    },

    computed: {
      inputType () {
        return 'tel'
      },

      rules () {
        return combineRules('telephone', this.validation)
      }
    }
  }
</script>
