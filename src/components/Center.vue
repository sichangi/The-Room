<template>
  <article>
    <div class="title-wrapper">
      <div class="container">
        <h1 class="title">Show</h1>
        <div class="p">Work presentation</div>
      </div>
    </div>
    <div class="details-wrapper">
      <div class="container">

      </div>
    </div>
  </article>
</template>

<script>
  export default {
    name: "show"
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

    [class*="-wrapper"] {
      display: flex;
      align-items: center;
    }

    .title-wrapper {
      grid-column-start: i-col1;
      grid-column-end: i-col2;

      .container {
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

    .details-wrapper {
      grid-column-start: i-col3;
      grid-column-end: i-col4;
    }
  }
</style>
