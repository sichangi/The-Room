<template>
  <header>
    <div class="wrapper">
      <nav class="left-nav">
        <div class="logo">
          <svg><use href="#logo"></use></svg>
        </div>
        <div class="nav-items">
          <div class="nav-item">works</div>
          <div class="nav-item">clients</div>
        </div>
      </nav>
      <nav class="right-nav">
        <div class="logo">
          <svg><use href="#logo"></use></svg>
        </div>
        <div class="nav-items">
          <div class="nav-item">news</div>
          <div class="nav-item">about us</div>
        </div>
        <div class="nav-drop">
          <div class="icon">
            <svg>
              <use href="#ham"></use>
            </svg>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'Top'
  };
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

      @media(max-width: 760px) {
        position: relative;
      }
    }

    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .logo {
        display: flex;
        align-items: center;
        line-height: 0;

        svg {
          width: 120px;
          max-height: 40px;
        }

        @media(max-width: 760px) {
          display: flex;
          width: 80px;
          left: 0;
        }
      }

      .nav-items {
        display: flex;
        align-items: center;
      }

      .nav-item {
        cursor: pointer;
        font-weight: 400;
        text-transform: uppercase;
        font-size: 1em;
        letter-spacing: .6px;

        @media(min-width: 770px) {
          font-size: 1rem;
        }
      }

      &.left-nav {
        grid-column-start: col2;
        grid-column-end: col3-end;

        .logo {
          display: none;
          @media(max-width: 760px) {
            display: flex;
          }
        }

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

        .logo {
          @media(max-width: 760px) {
            display: none;
          }
        }

        .nav-item {
          margin-left: $nav-margin-size;
          @media(max-width: 760px) {
            display: none;
          }
        }
      }

      .nav-drop {
        color: white;
        cursor: pointer;

        .icon {
          height: 18px;
          width: 18px;
        }

        @media(min-width: 760px) {
          display: none;
        }
      }
    }
  }
</style>
