<template>
  <aside id="r">
  </aside>
</template>

<script>
  export default {
    name: 'right-aside'
  }
</script>

<style lang="scss">
  @import "../assets/css/layout/_grid";

  aside#r {
    grid-row-start: row2;
    grid-column-start: col6;
    grid-row-end: row3;
  }
</style>
