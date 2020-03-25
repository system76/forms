/**
 * src/components/sys-label.vue
 * A basic html label tag. This is only the styling.
 */

<template>
  <label
    v-bind="$attrs"
    :class="$style.label"
    v-on="$listeners"
  >
    <slot />
  </label>
</template>

<script>
export default {
  name: 'SysLabel'
}
</script>

<style module>
  .label {
    display: block;
    font-family: var(--font-family-sans);
    font-size: 1rem;
    user-select: none;
  }
</style>
