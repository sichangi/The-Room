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
  #grid {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    z-index: 2;
    overflow: hidden;
    pointer-events: none;
  }
</style>
