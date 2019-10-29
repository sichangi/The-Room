<template>
  <div id="core" ref="core">
    <background></background>
    <!--<grid></grid>-->
  </div>
</template>

<script>
  // import VirtualScroll from 'virtual-scroll'
  import Grid from "./Grid";
  import Background from "@/components/Background";

  export default {
    name: 'App',
    components: {Background, Grid},
    mounted() {
      document.addEventListener('touchmove', function (e) {
        e.preventDefault();
      })

      // const section = this.$refs.core

      // let currentY = 0, ease = 0.1, targetY = 0;

      // const run = function () {
      //   requestAnimationFrame(run);
      //   currentY += (targetY - currentY) * ease;
      //   var t = 'translateY(' + currentY + 'px) translateZ(0)';
      //   var s = section.style;
      //   s["transform"] = t;
      //   s["webkitTransform"] = t;
      //   s["mozTransform"] = t;
      //   s["msTransform"] = t;
      // }

      // run();
      // const vs = new VirtualScroll({
      //   el: section
      // })

      // vs.on((e) => {
        // targetY += e.deltaY;
        // console.log(e)
        // targetY = Math.max((window.scrollY - window.innerHeight) * -1, targetY);
        // targetY = Math.min(0, targetY);
      // })
    }
  }
</script>

<style lang="scss" src="./assets/css/main.scss"></style>

<style lang="scss">
  @import "~@/assets/css/layout/_grid";

  #core {
    position: relative;
    top: 0;
    bottom: 0;
    padding-top: 100vh;
    left: 0;
    right: 0;
    min-height: 100vh;
    overflow: hidden;
    z-index: 1;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    section {
      position: relative;
      height: 100vh;
    }

    #cache {
      visibility: hidden;
      position: fixed;
      opacity: 0;
      height: 0;
      width: 0;
      top: 0;
      left: 0;
    }

    * {
      min-width: 0;
    }

    main {
      position: relative;
      z-index: 3;
      overflow: visible;
      grid-row-start: row2;
      grid-column-start: col2;
      grid-column-end: col5-end;
      display: grid;
      grid-template-columns: $three-column-inner-grid;
      grid-template-rows: $three-row-inner-grid;
    }
  }
</style>
