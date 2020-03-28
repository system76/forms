/**
 * src/components/sys-form-error.vue
 * A basic style component for displaying form errors.
 */

<template>
  <div :class="$style.error">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SysFormError'
}
</script>

<style module>
  .error {
    background-color: var(--color-light-form-input-invalid);
    border-radius: 3px;
    border: 1px solid var(--color-light-form-input-border);
    color: var(--color-light-form-input-background);
    display: block;
    padding: 0.5rem;
  }
</style>
