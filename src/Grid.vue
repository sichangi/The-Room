<template>
  <div id="grid" class="row-grid">
    <div class="column-grid">
      <div class="col"></div>
      <div class="col"></div>
      <div class="col"></div>
      <div class="col"></div>
      <div class="col"></div>
      <div class="col"></div>
    </div>
    <div class="column-grid second-chunk">
      <div class="col"></div>
      <div class="col">
        <div class=" row-grid inner">
          <div class="column-grid inner">
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
          </div>
          <div class="column-grid inner">
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
          </div>
          <div class="column-grid inner">
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
          </div>
        </div>
      </div>
      <div class="col"></div>
    </div>
    <div class="column-grid">
      <div class="col"></div>
      <div class="col"></div>
      <div class="col"></div>
      <div class="col"></div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Grid'
  }
</script>

<style lang="scss">
  @import "~@/assets/css/layout/_grid";

  #grid {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    z-index: 2;
    overflow: hidden;
  }

  .row-grid {
    display: grid;
    grid-template-rows: $three-row-grid;
    height: 100%;

    &.inner {
      grid-template-rows: $three-row-inner-grid;
    }
  }

  .column-grid {
    position: relative;
    display: grid;
    grid-template-columns: $five-column-grid;
    border-bottom: var(--border);
    height: 100%;

    &.second-chunk {
      grid-template-columns: $three-column-grid;

      @media (max-width: 760px) {
        grid-template-columns: unset;
      }
    }

    &.inner {
      grid-template-columns: $four-column-inner-grid;
    }

    .col {
      border-right: var(--border);
      justify-self: stretch;
      align-self: stretch;
    }
  }
</style>
