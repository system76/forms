/**
 * src/components/sys-button.vue
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
function styleClasses (styles, keys) {
  const output = []

  Object.keys(keys).forEach((key) => {
    if (keys[key]) {
      output.push(styles[key])
    }
  })

  return output
}

export default {
  name: 'SysFormButton',

  model: {
    prop: 'active',
    event: 'toggle'
  },

  props: {
    active: {
      type: Boolean,
      default: false
    },

    block: {
      type: Boolean,
      default: false
    },

    color: {
      type: String,
      default: 'normal',
      validator: (v) => ['normal', 'primary', 'secondary'].includes(v)
    },

    disabled: {
      type: Boolean,
      default: false
    },

    href: {
      type: String,
      default: ''
    },

    size: {
      type: String,
      default: 'medium',
      validator: (v) => ['small', 'medium', 'large', 'huge'].includes(v)
    },

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
      return styleClasses(this.$style, {
        button: true,
        'button--active': this.active,
        'button--block': this.block,
        'button--disabled': this.disabled,
        'button--outline': this.outline,
        [`button--${this.color}`]: true,
        [`button--${this.size}`]: true
      })
    },

    hasHref () {
      return (this.href !== '')
    },

    isExternalHref () {
      return (this.hasHref && this.href.indexOf('://') !== -1)
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
      this.$emit('click', e)
      this.$emit('toggle', !this.active)
    }
  }
}
</script>

<style module>
  .button {
    -webkit-font-smoothing: antialiased;
    appearance: none;
    background-color: transparent;
    border-radius: 0.25em;
    border: 0.15em solid transparent;
    cursor: pointer;
    display: inline-block;
    font-family: var(--font-family-slab);
    font-style: normal;
    font-weight: 400;
    letter-spacing: 1px;
    line-height: 1;
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
    padding: 0.6em;
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
    display: block;
    margin: 1rem 0;
    width: 100%;
  }

  .button:not(.button--block) {
    margin: 0.25rem 0.5rem;
  }

  /**
   * Children
   */

  /** TODO: Better icon handling in this component **/
  .button > svg {
    height: 1em;
    margin: 0 0.5ch;
  }
</style>
