/**
 * src/components/sys-input-error.vue
 * Displays an error for an input
 */

<template>
  <span
    v-bind="$attrs"
    :class="$style.error"
    v-on="$listeners"
  >
    <slot />
  </span>
</template>

<script>
  export default {
    name: 'SysInputError'
  }
</script>

<style module>
  .error {
    align-content: center;
    align-items: center;
    color: var(--color-light-form-input-invalid);
    display: block;
    display: flex;
    font-family: var(--font-family-sans);
    font-size: 0.9rem;
    height: 1rem;
    justify-content: flex-start;
    margin-top: 0.3rem;
    user-select: none;
  }
</style>
