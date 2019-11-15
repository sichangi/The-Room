<template>
  <footer>
    <div class="wrapper">
      <div class="cnt-a">
        <div class="langs">
          <div class="lang">EN</div>
          <div class="lang">SW</div>
        </div>
        <div class="socials">
          <a href="https://twitter.com/mecolela" rel="noreferrer" target="_blank" class="social">
            <svg>
              <use href="#twitter"></use>
            </svg>
          </a>
          <a href="https://instagram.com" rel="noreferrer" target="_blank" class="social">
            <svg>
              <use href="#instagram"></use>
            </svg>
          </a>
          <a href="https://gitlab.com/mecolela/the-room" rel="noreferrer" target="_blank" class="social">
            <svg>
              <use href="#gitlab"></use>
            </svg>
          </a><a href="https://github.com/sichangi/the-room" rel="noreferrer" target="_blank" class="social">
          <svg>
            <use href="#github"></use>
          </svg>
        </a>
        </div>
      </div>
      <div class="cnt-b">
        <div class="copyright">
          &copy; {{new Date().getFullYear()}} All rights reserved
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'Bottom'
  }
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
          font-weight: 600;
          margin-right: 1em;
          cursor: pointer;
        }
      }

      .socials {
        display: flex;
        align-items: center;

        .social {
          display: block;
          height: 15px;
          width: 15px;
          margin-right: 1.2rem;
        }
      }
    }

    .cnt-b {
      grid-column-start: col4;
      grid-column-end: col5-end;

      .copyright {
        font-weight: 400;
        font-size: .8rem;
      }
    }
  }
</style>
