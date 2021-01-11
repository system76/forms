/**
 * src/components/sys-form-button.vue
 * The default button for System76 projects. It always looks like a button, but
 * changes DOM tags based on the props given.
 */

<template>
  <component
    :is="component"
    v-bind="binds"
    :class="classes"
    :disabled="disabled"
    v-on="listners"
  >
    <!-- @slot The Inner HTML -->
    <slot />
  </component>
</template>

<script>
  import { filterObjectKeys } from '../utility/vue'

  export default {
    name: 'SysFormButton',

    model: {
      prop: 'active',
      event: 'toggle'
    },

    props: {
      /**
       * If it's in an active state. Same as HTML active attribute.
       */
      active: {
        type: Boolean,
        default: false
      },

      /**
       * If it should be a full width block element.
       */
      block: {
        type: Boolean,
        default: false
      },

      /**
       * The color the button should be.
       */
      color: {
        type: String,
        default: 'normal',
        validator: (v) => ['normal', 'primary', 'secondary', 'danger'].includes(v)
      },

      /**
       * Which direction the content should flow.
       */
      direction: {
        type: String,
        default: 'horizontal',
        validator: (v) => ['horizontal', 'vertical'].includes(v)
      },

      /**
       * If it's in a disabled state. Same as HTML disabled attribute.
       */
      disabled: {
        type: Boolean,
        default: false
      },

      /** If the button should be invisible until interacted with */
      ghost: {
        type: Boolean,
        default: false
      },

      /**
       * The location the button so link to. Same as HTML a link href attribute.
       */
      href: {
        type: [String, Object],
        default: ''
      },

      /**
       * The size of the button.
       */
      size: {
        type: String,
        default: 'medium',
        validator: (v) => ['small', 'medium', 'large', 'huge'].includes(v)
      },

      /**
       * An override to what HTML tag it should render as.
       */
      tag: {
        type: String,
        default: ''
      }
    },

    computed: {
      attributes () {
        if (this.disabled) {
          return {}
        }

        switch (this.component) {
        case 'nuxt-link':
        case 'router-link':
          return { to: this.href }
        case 'a':
          return { href: this.href }
        default:
          return {}
        }
      },

      binds () {
        return { ...this.$attrs, ...this.attributes }
      },

      classes () {
        return filterObjectKeys(this.$style, {
          button: true,
          'button--active': this.active,
          'button--block': this.block,
          'button--disabled': this.disabled,
          'button--ghost': this.ghost,
          'button--outline': this.outline,
          [`button--${this.color}`]: true,
          [`button--${this.size}`]: true,
          [`button--${this.direction}`]: true
        })
      },

      hasHref () {
        return (this.href !== '')
      },

      isExternalHref () {
        return (this.hasHref && typeof this.href === 'string' && this.href.indexOf('://') !== -1)
      },

      isNuxtApp () {
        return (this.$nuxt != null)
      },

      listners () {
        return {
          click: this.onClick,
          ...this.$listeners
        }
      },

      component () {
        if (this.tag !== '') {
          return this.tag
        } else if (this.hasHref && !this.disabled) {
          if (!this.isExternalHref) {
            if (this.isNuxtApp) {
              return 'nuxt-link'
            } else {
              return 'router-link'
            }
          } else {
            return 'a'
          }
        } else {
          return 'button'
        }
      }
    },

    methods: {
      onClick (e) {
        /**
         * When the button is clicked.
         *
         * @event click
         * @property {Event} MouseEvent Same as the native onclick event
         */
        this.$emit('click', e)

        /**
         * When the button active state switches.
         *
         * @event toggle
         * @property {Boolean} active The opposite of the current active prop
         */
        this.$emit('toggle', !this.active)
      }
    }
  }
</script>

<style module>
  .button {
    -webkit-font-smoothing: antialiased;
    align-content: center;
    align-items: center;
    appearance: none;
    background-color: transparent;
    border-radius: 0.25em;
    border: 0.15em solid transparent;
    cursor: pointer;
    display: inline-flex;
    font-style: normal;
    font-weight: 400;
    justify-content: center;
    letter-spacing: 1px;
    line-height: 24px;
    text-align: center;
    text-decoration: none;
    transition-duration: 100ms;
    transition-property: background-color, border-color, box-shadow;
    transition-timing-function: ease;
    user-select: none;
  }

  /**
   * Styles
   */

  .button--normal {
    background-color: var(--color-light-form-button-normal);
    border-color: var(--color-light-form-button-normal);
    color: var(--color-light-form-button-normal-contrast);
    font-family: var(--font-family-sans);
    letter-spacing: normal;
  }

  .button--normal:hover,
  .button--normal:focus-within {
    box-shadow: 1px 1px 3px var(--color-light-form-button-normal-shadow);
  }

  .button--normal.button--active,
  .button--normal:active {
    background-color: var(--color-light-form-button-normal-light);
    border-color: var(--color-light-form-button-normal-light);
    box-shadow: 1px 1px 3px var(--color-light-form-button-normal-shadow);
  }

  .button--normal.button--disabled,
  .button--normal:disabled {
    background-color: var(--color-light-form-button-normal);
    border-color: var(--color-light-form-button-normal);
  }

  .button--primary {
    background-color: var(--color-light-form-button-primary);
    border-color: var(--color-light-form-button-primary);
    color: var(--color-light-form-button-primary-contrast);
    font-family: var(--font-family-slab);
    text-transform: uppercase;
  }

  .button--primary:hover,
  .button--primary:focus-within {
    box-shadow: 1px 1px 3px var(--color-light-form-button-primary-shadow);
  }

  .button--primary.button--active,
  .button--primary:active {
    background-color: var(--color-light-form-button-primary-light);
    border-color: var(--color-light-form-button-primary-light);
    box-shadow: 1px 1px 3px var(--color-light-form-button-primary-shadow);
  }

  .button--primary.button--disabled,
  .button--primary:disabled {
    background-color: var(--color-light-form-button-primary);
    border-color: var(--color-light-form-button-primary);
  }

  .button--secondary {
    background-color: var(--color-light-form-button-secondary);
    border-color: var(--color-light-form-button-secondary);
    color: var(--color-light-form-button-secondary-contrast);
    font-family: var(--font-family-slab);
    text-transform: uppercase;
  }

  .button--secondary:hover,
  .button--secondary:focus-within {
    box-shadow: 1px 1px 3px var(--color-light-form-button-secondary-shadow);
  }

  .button--secondary.button--active,
  .button--secondary:active {
    background-color: var(--color-light-form-button-secondary-light);
    border-color: var(--color-light-form-button-secondary-light);
    box-shadow: 1px 1px 3px var(--color-light-form-button-secondary-shadow);
  }

  .button--secondary.button--disabled,
  .button--secondary:disabled {
    background-color: var(--color-light-form-button-secondary);
    border-color: var(--color-light-form-button-secondary);
  }

  .button--danger {
    background-color: var(--color-light-form-button-danger);
    border-color: var(--color-light-form-button-danger);
    color: var(--color-light-form-button-danger-contrast);
    font-family: var(--font-family-slab);
    text-transform: uppercase;
  }

  .button--danger:hover,
  .button--danger:focus-within {
    box-shadow: 1px 1px 3px var(--color-light-form-button-danger-shadow);
  }

  .button--danger.button--active,
  .button--danger:active {
    background-color: var(--color-light-form-button-danger-light);
    border-color: var(--color-light-form-button-danger-light);
    box-shadow: 1px 1px 3px var(--color-light-form-button-danger-shadow);
  }

  .button--danger.button--disabled,
  .button--danger:disabled {
    background-color: var(--color-light-form-button-danger);
    border-color: var(--color-light-form-button-danger);
  }

  .button--ghost:not(:hover):not(:focus):not(:focus-within):not(.button--active):not(:active):not(.button--disabled):not(:disabled) {
    background-color: transparent;
    border-color: transparent;
    color: inherit;
  }

  /**
   * States
   */

  .button:hover,
  .button:focus,
  .button--active,
  .button:active {
    outline: none;
  }

  .button--disabled,
  .button:disabled {
    box-shadow: none !important;
    color: rgba(0, 0, 0, 0.4);
    cursor: default;
  }

  /**
   * Sizes
   */

  .button--small {
    font-size: 0.8rem;
    padding: 0.5em 0.75em 0.4em; /** Offset to account for text **/
  }

  .button--medium {
    font-size: 1rem;
    padding: 0.4em 0.6em;
  }

  .button--large,
  .button--huge {
    font-size: 1.4rem;
    padding: 0.6em;
  }

  @media only screen and (min-width: 1500px) {
    .button--huge {
      font-size: 1.8rem;
      padding: 0.6em;
    }
  }

  /**
   * Layouts
   */

  .button--block {
    display: flex;
    margin: 1rem 0;
    width: 100%;
  }

  .button:not(.button--block) {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .button--horizontal {
    flex-direction: row;
  }

  .button--vertical {
    flex-direction: column;
  }

  /**
   * Children
   */

   .button > svg {
     height: 1em;
   }

   .button--horizontal > *:not(:first-child) {
     margin-left: 0.25em;
   }

   .button--horizontal > *:not(:last-child) {
     margin-right: 0.25em;
   }

   .button--vertical > *:not(:first-child) {
     margin-top: 0.25em;
   }

   .button--vertical > *:not(:last-child) {
     margin-bottom: 0.25em;
   }
</style>
