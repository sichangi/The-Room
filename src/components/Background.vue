<template>
  <div id="bg">
    <div id="cnt-a">
      <div id="cnt-b"></div>
    </div>
  </div>
</template>

<script>
  import { debounce } from '../lib';
  import { Shifter } from '../lib/shifter';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Background',
    computed: mapGetters({
      pages: 'show/pages',
      currentIx: 'show/currentIx'
    }),
    data() {
      return {
        animDuration: 1.2,
        shiftDelay: 400,
        easing: 'easeOutCubic',
        maskWidth: 20,
        maskWidthMobile: 15,
        inTransit: false,
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
        }
      };
    },
    created() {
      this.instance = new VirtualScroll({multiplier: 5});
      this.instance.on(debounce(this.triggerScroll, 200));
    },
    mounted() {
      this.init();
      let resizeTimeout;
      window.onresize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(this.handleResize, 50);
      };
    },
    methods: {
      init() {
        const pc = this.pages.map(x => x.img);
        const mobile = this.pages.map(x => x.mobileImg);
        this.prepareContainers();
        this.prepareCanvas(...(this.isMobile ? [mobile, this.maskWidthMobile] : [pc, this.maskWidth]));
      },
      prepareContainers() {
        // base
        this.base.container = document.getElementById('bg');

        // Inner
        this.inner.globalContainer = document.getElementById('bg');
        this.inner.container = document.getElementById('cnt-b');
        this.inner.container.style.display = this.isMobile ? 'none' : 'block';

        // Outer
        this.outer.globalContainer = document.getElementById('bg');
        this.outer.container = document.getElementById('cnt-a');
      },
      prepareCanvas(slides, maskWidth) {
        const globalConfig = {
          slides,
          maskWidth,
          easing: this.easing,
          duration: this.animDuration,
          animationProps: {zoom: {scale: 2}}
        };

        this.canvas.base = new Shifter({
          ...this.base,
          ...globalConfig
        });
        this.canvas.inner = new Shifter({
          ...this.inner,
          ...globalConfig
        });
        this.canvas.outer = new Shifter({
          ...this.outer,
          ...globalConfig
        });
      },
      async triggerScroll(e) {
        this.transit(e.deltaY > 0 ? 'UP' : 'DOWN');
      },
      transit(direction) {
        if (this.inTransit) return;
        return new Promise(async resolve => {
          this.inTransit = true;
          let result;
          if (direction === 'UP') {
            result = this.currentIx - 1 < 0 ? this.pages.length - 1 : this.currentIx - 1;
          } else if (direction === 'DOWN') {
            result = this.currentIx + 1 === this.pages.length ? 0 : this.currentIx + 1;
          }

          this.canvas.base.navigate(result);
          this.canvas.inner.navigate(result);
          this.canvas.outer.navigate(result, true);

          setTimeout(() => this.$store.dispatch('show/setPage', result), this.shiftDelay / 2);
          setTimeout(async () => {
            await Promise.all([
              this.canvas.outer.navigate(result),
              this.canvas.inner.navigate(result, true)
            ]);
            this.inTransit = false;
            resolve();
          }, this.shiftDelay);
        });
      },
      async handleResize() {
        // Hide the inner ring on mobile
        this.inner.container.style.display = this.isMobile ? 'none' : 'block';

        // Update the images to the mobile ones
        const update = {
          slides: this.isMobile ? this.pages.map(x => x.mobileImg) : this.pages.map(x => x.img),
          maskWidth: this.isMobile ? this.maskWidthMobile : this.maskWidth
        };
        await Promise.all([
          this.canvas.base.update(update),
          this.canvas.inner.update(update),
          this.canvas.outer.update(update)
        ]);

        // Trigger appropriate resize
        this.canvas.base.onResize();
        this.canvas.inner.onResize();
        this.canvas.outer.onResize();
      }
    },
    beforeDestroy() {
      this.instance.destroy();
    }
  };
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

    @media (max-width: 760px) {
      grid-template-rows: $three-row-grid-sm;
    }

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
