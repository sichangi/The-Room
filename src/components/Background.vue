<template>
  <div id="bg-canvas" @click="transit">
    <div id="container-a">
      <div id="container-b"></div>
    </div>
  </div>
</template>

<script>
  import Slider from '@/core/Slider'
  import {Power3} from 'gsap'

  export default {
    name: 'Background',
    data() {
      return {
        animDuration: 1,
        easing: Power3.easeOut,
        maskWidth: 20,
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
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
          'https://images.unsplash.com/photo-1513584684374-8bab748fbf90',
          'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg'
        ],
        slideInView: 2
      }
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
        this.base.container = document.getElementById('bg-canvas')

        // Inner
        this.inner.globalContainer = document.getElementById('bg-canvas')
        this.inner.container = document.getElementById('container-b')

        // Outer
        this.outer.globalContainer = document.getElementById('bg-canvas')
        this.outer.container = document.getElementById('container-a')
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

        this.canvas.base = new Slider({
          ...this.base,
          ...globalConfig
        })
        this.canvas.inner = new Slider({
          ...this.inner,
          ...globalConfig
        })
        this.canvas.outer = new Slider({
          ...this.outer,
          ...globalConfig
        })
      },
      handleResize() {
        this.canvas.base.onResize()
        this.canvas.inner.onResize()
        this.canvas.outer.onResize()
      },
      transit() {
        if (++this.slideInView === this.slides.length) {
          this.slideInView = 0
        }
        this.canvas.base.navigate(this.slideInView)
        this.canvas.inner.navigate(this.slideInView)
        this.canvas.outer.navigate(this.slideInView, true)

        setTimeout(() => {
          this.canvas.outer.navigate(this.slideInView)
          this.canvas.inner.navigate(this.slideInView, true)
        }, 400)
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/css/layout/_grid";

  #bg-canvas {
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

    #container-a {
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

    #container-b {
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
