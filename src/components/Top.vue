<template>
  <header>
    <div class="wrapper">
      <nav class="left-nav">
        <div class="nav-items">
          <div class="nav-item">Works</div>
          <div class="nav-item">clients</div>
        </div>
      </nav>
      <nav class="right-nav">
        <div class="logo"><span>the</span> ROOM</div>
        <div class="nav-items">
          <div class="nav-item">news</div>
          <div class="nav-item">about us</div>
          <div class="nav-item">contacts</div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'Top'
  }
</script>

<style lang="scss">
  @import "../assets/css/layout/_grid";

  $nav-margin-size: 1.4em;

  header {
    position: relative;
    z-index: 4;
    grid-column-start: col1;
    grid-column-end: span 6;
    grid-row-start: row1;
    grid-row-end: row1;

    display: flex;
    align-items: center;

    .wrapper {
      grid-template-columns: $five-column-grid;
    }

    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .logo {
        display: flex;
        align-items: flex-end;
        font-weight: 700;
        font-size: 4.8vw;
        line-height: 0;

        @media(min-width: 740px) {
          font-size: 1.4vw;
        }

        span {
          font-size: 2.8vw;
          font-weight: 400;
          margin-right: .2rem;
          text-transform: uppercase;
          position: relative;

          &:after {
            content: "";
            position: absolute;
            margin-top: .5rem;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: white;
          }

          @media(min-width: 740px) {
            font-size: .8vw;
          }
        }
      }

      .nav-items {
        display: flex;
        align-items: center;
      }


      .nav-item {
        cursor: pointer;
        font-weight: 500;
        text-transform: uppercase;
        font-size: 2.5vw;
        letter-spacing: .4px;

        @media(min-width: 760px) {
          font-size: .8vw;
        }
      }

      &.left-nav {
        grid-column-start: col2;
        grid-column-end: col3-end;

        .nav-item {
          margin-right: $nav-margin-size;
          @media(max-width: 760px) {
            display: none;
          }
        }
      }

      &.right-nav {
        grid-column-start: col4;
        grid-column-end: col5-end;
        justify-content: space-between;

        .nav-item {
          margin-left: $nav-margin-size;
          @media(max-width: 760px) {
            display: none;
          }
        }
      }
    }
  }
</style>
