<template>
  <aside id="r">
    <div class="scroll">
      Scroll
    </div>
  </aside>
</template>

<script>
  export default {
    name: 'right-aside'
  };
</script>

<style lang="scss">
  @import "../assets/css/layout/_grid";

  aside#r {
    grid-row-start: row2;
    grid-column-start: col6;
    grid-row-end: row2-end;
    position: relative;

    .scroll {
      left: 0;
      right: 0;
      bottom: -1em;
      pointer-events: none;
      margin: auto;
      position: absolute;
      display: flex;
      align-items: center;
      font-size: 1rem;
      letter-spacing: 1px;
      writing-mode: vertical-rl;
      text-orientation: mixed;

      @media (max-width: 760px) {
        display: none;
      }
    }
  }
</style>
