/**
 * src/components/sys-form-password.vue
 * A password entry input.
 */

<script>
  import SysFormInput from './sys-form-input.vue'

  export default {
    name: 'SysFormPassword',

    extends: SysFormInput,

    props: {
      /** The label text to go above the input */
      label: {
        type: String,
        default: 'Password'
      },

      /** Placeholder text to put in the input */
      placeholder: {
        type: String,
        default: 'correct battery horse staple'
      }
    },

    computed: {
      inputType () {
        return 'password'
      }
    }
  }
</script>
