<template>
  <div id="bg">
    <div id="cnt-a">
      <div id="cnt-b"></div>
    </div>
  </div>
</template>

<script>
  import Shifter from '@/core/Shifter'
  import {Power3} from 'gsap'
  import {debounce} from 'debounce'

  export default {
    name: 'Background',
    data() {
      return {
        animDuration: 1,
        easing: Power3.easeOut,
        maskWidth: 20,
        instance: null,
        base: {
          masked: false
        },
        inner: {
          masked: true
        },
        outer: {
          masked: true
        },
        canvas: {
          base: null,
          inner: null,
          outer: null
        },
        slides: [
          '/imgs/m-1.jpg',
          '/imgs/m-2.jpg',
          '/imgs/m-3.jpg',
          '/imgs/m-4.jpg',
          '/imgs/m-5.jpg'
        ],
        slideInView: 0
      }
    },
    created() {
      this.instance = new VirtualScroll({multiplier: 5})
      this.instance.on(debounce(this.triggerScroll, 630))
    },
    mounted() {
      this.init()
      window.onresize = this.handleResize
    },
    methods: {
      init() {
        this.prepareContainers()
        this.prepareCanvas()
      },
      prepareContainers() {
        // base
        this.base.container = document.getElementById('bg')

        // Inner
        this.inner.globalContainer = document.getElementById('bg')
        this.inner.container = document.getElementById('cnt-b')

        // Outer
        this.outer.globalContainer = document.getElementById('bg')
        this.outer.container = document.getElementById('cnt-a')
      },
      prepareCanvas() {
        // TODO: Change slides / images to mobile friendly ones when viewport size changes accordinglye
        const globalConfig = {
          maskWidth: this.maskWidth,
          slides: this.slides,
          easing: this.easing,
          duration: this.animDuration,
          animationProps: {zoom: {scale: 2}}
        }

        this.canvas.base = new Shifter({
          ...this.base,
          ...globalConfig
        })
        this.canvas.inner = new Shifter({
          ...this.inner,
          ...globalConfig
        })
        this.canvas.outer = new Shifter({
          ...this.outer,
          ...globalConfig
        })
      },
      handleResize() {
        this.canvas.base.onResize()
        this.canvas.inner.onResize()
        this.canvas.outer.onResize()
      },
      transit(direction) {
        if (direction === 'UP') {
          if (--this.slideInView < 0) {
            this.slideInView = this.slides.length - 1
          }
        } else if (direction === 'DOWN') {
          if (++this.slideInView === this.slides.length) {
            this.slideInView = 0
          }
        }
        // console.log(direction, this.slideInView)
        this.canvas.base.navigate(this.slideInView)
        this.canvas.inner.navigate(this.slideInView)
        this.canvas.outer.navigate(this.slideInView, true)

        setTimeout(() => {
          this.canvas.outer.navigate(this.slideInView)
          this.canvas.inner.navigate(this.slideInView, true)
        }, 400)
      },
      triggerScroll(e) {
        const direction = e.deltaY > 0 ? 'UP' : 'DOWN'
        this.transit(direction)
      }
    },
    beforeDestroy() {
      this.instance.destroy()
    }
  }
</script>

<style lang="scss">
  @import "../assets/css/layout/_grid";

  #bg {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: $three-row-grid;
    grid-template-columns: $five-column-grid;
    background-color: rgba(0, 0, 0, 0.4);

    canvas {
      position: absolute;
      top: 0;
      z-index: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    #cnt-a {
      position: relative;
      grid-row-start: row2;
      grid-column-start: col2;
      grid-column-end: col5-end;
      display: grid;
      grid-template-columns: $three-column-inner-grid;
      grid-template-rows: $three-row-inner-grid;

      canvas {
        z-index: 1;
      }
    }

    #cnt-b {
      position: relative;
      grid-row-start: i-row2;
      grid-column-start: i-col2;
      grid-column-end: span 1;

      canvas {
        z-index: 2;
      }
    }
  }
</style>
