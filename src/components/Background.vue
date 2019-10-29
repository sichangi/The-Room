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
          'https://format-com-cld-res.cloudinary.com/image/private/s--hnC5O30p--/c_limit,g_center,h_1200,w_65535/a_auto,fl_keep_iptc.progressive,q_95/v1/6c90bfeb28b4de38bf65c8337349644d/lf1_10.jpg',
          'https://format-com-cld-res.cloudinary.com/image/private/s--6CLoMypk--/c_limit,g_center,h_1200,w_65535/a_auto,fl_keep_iptc.progressive,q_95/v1/421a0ec99340f1a88979465153cac107/lf1_11.jpg',
          'https://format-com-cld-res.cloudinary.com/image/private/s--1OwozA6C--/c_limit,g_center,h_1200,w_65535/a_auto,fl_keep_iptc.progressive,q_95/v1/5f1e518d5c1d5ac63adb915646f897ea/lf1_12.jpg',
          'https://format-com-cld-res.cloudinary.com/image/private/s--DVp80dL4--/c_limit,g_center,h_1200,w_65535/a_auto,fl_keep_iptc.progressive,q_95/v1/799c17921ec5e1b44fffb7b12e58848f/lf1_7.jpg',
          'https://format-com-cld-res.cloudinary.com/image/private/s--MF0_QlLL--/c_limit,g_center,h_1200,w_65535/a_auto,fl_keep_iptc.progressive,q_95/v1/e7d058ee0c20d763e805731f8e853e62/lf1_4.jpg',
          'https://format-com-cld-res.cloudinary.com/image/private/s--G8_tWfiP--/c_limit,g_center,h_1200,w_65535/a_auto,fl_keep_iptc.progressive,q_95/v1/888334384f1be77bda331e69ac0e59a2/lf1_1.jpg'
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
  @import "~@/assets/css/layout/_grid";

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
