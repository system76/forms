<template>
  <button :class="$style.button">
    <!-- @slot The Inner HTML -->
    <slot />
  </button>
</template>

<script>
export default {
  name: 'SysButton'
}
</script>

<style module>
  .button {
    font-family: var(--font-family-sans);
    font-size: 2rem;
    font-smooth: auto;
    font-style: italic;
    font-weight: 200;
    line-height: calc(var(--line-height) * 0.8333);
    text-rendering: optimizeLegibility;
  }
</style>
