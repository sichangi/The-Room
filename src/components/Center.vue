<template>
  <article>
    <div class="title-wr">
      <div class="cnt">
        <h1 class="title">Show</h1>
        <div class="p">Work presentation</div>
      </div>
    </div>
    <div class="details-wr">
      <div class="cnt">
        <div class="left">
          <h3 class="desc">
            On the cliff <br>by the edge
          </h3>
          <div class="open-cta">
            <span class="icon">
              <svg ref="moreIcon"><use href="#plus"></use></svg>
            </span>
            more
          </div>
        </div>
        <div class="right">
          <div class="counter">
            <span class="crnt">5</span>
            <span class="ttl">6</span>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
  export default {
    name: 'Center'
  }
</script>

<style lang="scss">
  @import "../assets/css/layout/_grid";

  article {
    grid-column-start: col2;
    grid-row-start: row2;
    grid-column-end: span 4;
    display: grid;
    grid-template-columns: $four-column-inner-grid;
    overflow: visible;

    [class*="-wr"] {
      display: flex;
      align-items: center;
    }

    [class*="-cta"] {
      cursor: pointer;
    }

    .title-wr {
      grid-column-start: i-col1;
      grid-column-end: i-col2;

      .cnt {
        text-align: right;
      }

      .title {
        font-size: 14vw;
        font-weight: 600;
        margin: 0 0 0 -.4em;
        line-height: .8;

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

    .details-wr {
      grid-column-start: i-col3;
      grid-column-end: i-col4;

      .cnt {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
          width: 60%;

          .desc {
            font-size: 2.6rem;
            font-weight: 600;
            margin-bottom: .4em;
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
              align-items: center;
              justify-content: center;
              color: white;
              border: 2px solid white;
              margin-right: 1em;

              svg {
                height: 16px;
                width: 16px;
              }
            }
          }
        }

        .right {
          .counter {
            display: flex;
            align-items: flex-start;
            margin-right: -3.2em;

            span {
              display: block;
            }

            .crnt {
              font-size: 7rem;
            }

            .ttl {
              font-size: 2rem;
            }
          }
        }
      }
    }
  }
</style>
