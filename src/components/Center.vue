<template>
  <article>
    <div class="title-wr">
      <div class="cnt">
        <h1 class="title">Show</h1>
        <div class="p">Work presentation</div>
      </div>
    </div>
    <div class="left-cnt">
      <div class="desc-wr">
        <div class="desc-cnt">
          <div class="desc-wrap" v-for="page in pages">
            <h3 ref="desc" class="desc" v-html="page.name"/>
          </div>
        </div>
        <div class="open-cta">
          <span class="icon">
            <svg ref="moreIcon"><use href="#plus"></use></svg>
          </span>
          more
        </div>
      </div>
    </div>
    <div class="right-cnt">
      <div class="counter">
        <div class="nums">
          <div class="num-wrap" v-for="i in Array.from(Array(total).keys())">
            <span class="num" ref="num">{{i+1}}</span>
          </div>
        </div>
        <span class="ttl">0{{total}}</span>
      </div>
      <div class="scroll">
        scroll
      </div>
    </div>
  </article>
</template>

<script>
  import { mapGetters } from 'vuex';
  import anime from 'animejs';

  export default {
    name: 'Center',
    computed: mapGetters({
      pages: 'show/pages',
      total: 'show/pageCount',
      current: 'show/currentIx'
    }),
    data() {
      return {
        duration: 800,
        easing: 'easeInOutQuint'
      };
    },
    watch: {
      current(next, prev) {
        this.animateTo(next, prev);
      }
    },
    mounted() {
      const nums = this.$refs.num;
      const descs = this.$refs.desc;
      anime.set(nums[this.current], {translateY: '60%', opacity: 0});
      anime.set(descs[this.current], {translateX: '100%', opacity: 0});

      anime({
        targets: nums[this.current],
        delay: 600,
        opacity: {
          value: 1,
          duration: this.duration
        },
        translateY: {
          value: '0%',
          duration: this.duration,
          easing: this.easing
        }
      });

      anime({
        targets: descs[this.current],
        delay: 600,
        opacity: {
          value: 1,
          duration: this.duration
        },
        translateX: {
          value: '0%',
          duration: this.duration,
          easing: this.easing
        }
      });
    },
    methods: {
      animateTo(next, prev) {
        const nums = this.$refs.num;
        const descs = this.$refs.desc;
        const icon = this.$refs.moreIcon;
        const nextNumElm = nums[next];
        const prevNumElm = nums[prev];
        const nextDescElm = descs[next];
        const prevDescElm = descs[prev];

        this.animateNums(prevNumElm, nextNumElm);
        this.animateDescs(prevDescElm, nextDescElm);
        this.rotateIcon(icon);
      },
      animateNums(prevElm, nextElm) {
        // animate out the previous section
        anime.set(prevElm, {translateY: '0%', opacity: 1});
        anime({
          targets: prevElm,
          opacity: {
            value: 0,
            duration: this.duration - 100,
            easing: 'easeInOutCubic'
          },
          translateY: {
            value: '-100%',
            duration: this.duration,
            easing: this.easing
          }
        });

        // animate in the new section
        anime.set(nextElm, {translateY: '60%', opacity: 0});
        anime({
          targets: nextElm,
          delay: 50,
          opacity: {
            value: 1,
            duration: this.duration - 300,
            easing: 'easeInOutCubic'
          },
          translateY: {
            value: '0%',
            duration: this.duration,
            easing: this.easing
          }
        });
      },
      animateDescs(prevElm, nextElm) {
        // animate out the previous section
        anime.set(prevElm, {translateX: '0%', opacity: 1});
        anime({
          targets: prevElm,
          opacity: {
            value: 0,
            duration: this.duration - 100,
            easing: 'easeInOutCubic'
          },
          translateX: {
            value: '-100%',
            duration: this.duration,
            easing: this.easing
          }
        });

        // animate in the new section
        anime.set(nextElm, {translateX: '100%', opacity: 0});
        anime({
          targets: nextElm,
          opacity: {
            value: 1,
            duration: this.duration - 200,
            easing: 'easeInOutCubic'
          },
          translateX: {
            value: '0%',
            duration: this.duration,
            easing: this.easing
          }
        });
      },
      rotateIcon(icon) {
        anime.set(icon, {rotate: 0});
        anime({
          targets: icon,
          rotate: {
            value: 90,
            duration: this.duration,
            easing: 'linear'
          }
        });
      }
    }
  };
</script>

<style lang="scss">
  @import "../assets/css/layout/_grid";

  $pre-translate: translateY(80%);
  $pre-r-translate: translateX(100%);

  article {
    grid-column-start: col2;
    grid-row-start: row2;
    grid-column-end: span 4;
    display: grid;
    overflow: visible;
    grid-template-rows: $three-row-inner-grid;
    grid-template-columns: $four-column-inner-grid;

    @media (max-width: 760px) {
      grid-template-columns: $four-column-inner-grid-sm;
    }

    [class*="-cta"] {
      cursor: pointer;
    }

    .title-wr {
      display: flex;
      align-items: center;
      grid-row-start: i-row1;
      grid-row-end: i-row3-end;
      grid-column-start: i-col1;
      grid-column-end: i-col2;

      .cnt {
        text-align: right;
      }

      .title {
        font-size: 14vw;
        font-weight: 500;
        margin: 0 0 0 -.4em;
        line-height: 1;

        @media(min-width: 740px) {
          font-size: 10vw;
        }
      }

      .p {
        margin: 0 1.8vw 0 0;
        text-transform: lowercase;
        font-size: 2.8vw;

        @media(min-width: 740px) {
          font-size: 1.28vw;
        }
      }
    }

    /*.details-wr {*/
    /*  grid-column-start: i-col3;*/
    /*  grid-column-end: i-col4;*/

    .left-cnt {
      height: 100%;
      grid-row-start: i-row1;
      grid-row-end: i-row3-end;
      grid-column-start: i-col3;
      grid-column-end: i-col3-end;

      .desc-wr {
        height: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
      }

      .desc-cnt {
        position: relative;
        min-height: 140px;
        width: 100%;
        margin-top: 2.2rem;
      }

      .desc-wrap {
        overflow: hidden;
        position: absolute;

        .desc {
          font-size: 2.4vw;
          line-height: 1.4;
          font-weight: 500;
          margin: 0;
          position: relative;
          transform: $pre-r-translate;
        }
      }

      .open-cta {
        display: flex;
        align-items: center;
        text-transform: capitalize;
        font-size: 1.3rem;

        .icon {
          height: 30px;
          width: 30px;
          display: flex;
          color: white;
          align-items: center;
          justify-content: center;
          border: 1.4px solid white;
          margin-right: 1em;

          svg {
            height: 16px;
            width: 16px;
          }
        }
      }
    }

    .right-cnt {
      height: 100%;
      grid-row-start: i-row1;
      grid-row-end: i-row3-end;
      grid-column-start: i-col4;
      grid-column-end: i-col4-end;
      position: relative;

      .counter {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        max-height: 160px;
        display: flex;
        align-items: flex-start;
        margin: auto -3.6rem auto auto;

        @media (max-width: 760px) {
          font-size: 4rem;
          margin: auto -2.6rem auto auto;
        }

        span {
          display: block;
        }

        .nums {
          height: 100%;
          position: relative;
        }

        .num-wrap {
          position: absolute;
          /*overflow: hidden;*/
          font-size: 9rem;
          font-weight: 600;
          line-height: 1.18;
          height: 100%;
          right: 0;

          @media (max-width: 760px) {
            font-size: 4rem;
          }

          .num {
            opacity: 0;
            transform: $pre-translate;
          }
        }

        .ttl {
          font-size: 2rem;
          font-weight: 400;

          @media (max-width: 760px) {
            font-size: 1rem;
          }
        }
      }

      .scroll {
        left: 0;
        right: 0;
        pointer-events: none;
        margin: auto;
        bottom: -1em;
        display: flex;
        align-items: center;
        font-size: 1rem;
        position: absolute;
        letter-spacing: 1px;
        writing-mode: vertical-rl;
        text-orientation: mixed;

        @media (max-width: 760px) {
          display: none;
        }
      }
    }

    /*}*/
  }
</style>
