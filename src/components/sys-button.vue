/**
 * src/components/sys-button.vue
 * The default button for System76 projects. It always looks like a button, but
 * changes DOM tags based on the props given.
 */

<template>
  <component
    :is="tag"
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
  name: 'SysButton',

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
      validator: (v) => ['normal', 'destructive', 'suggested'].includes(v)
    },

    disabled: {
      type: Boolean,
      default: false
    },

    href: {
      type: String,
      default: ''
    },

    outline: {
      type: Boolean,
      default: false
    },

    size: {
      type: String,
      default: 'medium',
      validator: (v) => ['small', 'medium', 'large', 'huge'].includes(v)
    }
  },

  computed: {
    attributes () {
      if (this.disabled) {
        return {}
      }

      switch (this.tag) {
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
        'button': true,
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

    tag () {
      if (this.hasHref && !this.disabled) {
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
    letter-spacing: 0.05em;
    line-height: 1;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    transition: all 150ms ease;
    user-select: none;
  }

  /**
   * Styles
   */

   .button--normal {
     border-color: var(--base-font-color);
     color: var(--base-font-color);
   }

   .button--normal:hover {
     box-shadow: 0 0 4px color-mod(var(--action-color) a(0.4));
   }

   .button--normal:focus {
     box-shadow:
       0 0 12px color-mod(var(--action-color) lightness(-5%) a(-0.3)),
       0 0 1px color-mod(var(--action-color) lightness(-5%) a(-0.3));
   }

   .button--normal.button--active,
   .button--normal:active {
     background-color: var(--action-color);
     color: var(--white);
   }

   .button--normal.button--disabled,
   .button--normal:disabled {
     border-color: var(--base-font-color) !important;
     color: var(--base-font-color) !important;
   }

   .button--suggested {
     background-color: var(--suggested-color);
     border-color: color-mod(var(--suggested-color) shade(38%));
     color: var(--white);
   }

  /**
   * Variations
   */

  .button--outline {
    background-color: transparent;
  }

  .button--outline:hover {
    box-shadow: 0 0 4px color-mod(var(--action-color) a(0.4));
  }

  .button--outline:focus {
    box-shadow:
      0 0 12px color-mod(var(--action-color) lightness(-5%) a(-0.3)),
      0 0 1px color-mod(var(--action-color) lightness(-5%) a(-0.3));
  }

  .button--outline.button--active,
  .button--outline:active {
    color: var(--white);
  }

  .button--outline.button--disabled,
  .button--outline:disabled {
    border-color: var(--base-font-color) !important;
    color: var(--base-font-color) !important;
  }

  /**
   * States
   **/

  .button:hover,
  .button:focus,
  .button--active,
  .button:active {
    outline: none;
  }

  .button--disabled,
  .button:disabled {
    cursor: default;
    opacity: 0.25;
  }

  /**
   * Sizes
   **/

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
    margin: 0 0.5rem;
    width: 100%;
  }

  .button:not(.button--block) {
    margin: 0.25rem 0.5rem;
  }

  /**
   * Children
   **/

  /** TODO: Better icon handling in this component **/
  .button > svg {
    height: 1rem;
    margin-right: 0.5ch;
  }
</style>
