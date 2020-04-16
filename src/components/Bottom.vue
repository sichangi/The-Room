<template>
  <footer>
    <div class="wrapper">
      <div class="cnt-a">
        <!--        <div class="langs">-->
        <!--          <div class="lang">EN</div>-->
        <!--          <div class="lang">SW</div>-->
        <!--        </div>-->
        <div class="socials">
          <a href="https://gitlab.com/mecolela" rel="noreferrer" target="_blank" class="social">
            <svg>
              <use href="#gitlab"></use>
            </svg>
          </a>
          <a href="https://www.behance.net/gallery/43037287/The-Room" rel="noreferrer" target="_blank" class="social">
            <svg>
              <use href="#behance"></use>
            </svg>
          </a>
        </div>
      </div>
      <div class="cnt-b">
        <div class="copyright">
          &copy; {{new Date().getFullYear()}}
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'Bottom'
  };
</script>

<style lang="scss">
  @import "../assets/css/layout/_grid";

  footer {
    display: flex;
    align-items: center;
    grid-row-start: row3;
    grid-row-end: row3;
    grid-column-start: col1;
    grid-column-end: span 6;

    .wrapper {
      grid-template-columns: $five-column-grid;
    }

    .cnt-a {
      grid-column-start: col2;
      grid-column-end: col3;
      color: white;
      display: flex;
      align-items: center;

      .langs {
        display: flex;
        align-items: flex-end;
        margin-right: 2em;

        .lang {
          display: block;
          font-size: .8rem;
          text-transform: uppercase;
          font-weight: 500;
          margin-right: 1em;
          cursor: pointer;
        }
      }

      .socials {
        display: flex;
        align-items: center;

        .txt {
          font-weight: 400;
        }

        .social {
          display: block;
          height: 18px;
          width: 18px;
          margin-right: 1.2rem;

          @media (max-width: 770px) {
            height: 14px;
            width: 14px;
          }
        }
      }
    }

    .cnt-b {
      grid-column-start: col4;
      grid-column-end: col5-end;

      .copyright {
        font-weight: 400;
        font-size: 1em;

        @media (max-width: 770px) {
          text-align: right;
          font-size: .7rem;
        }
      }
    }
  }
</style>
