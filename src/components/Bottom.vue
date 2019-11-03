<template>
  <footer>
    <div class="wrapper">
      <div class="container-a">
        <div class="language"></div>
        <div class="socials">
          <div class="social"></div>
          <div class="social"></div>
          <div class="social"></div>
          <div class="social"></div>
        </div>
      </div>
      <div class="container-b">
        <div class="copyright">
          &copy; 2019 All rights reserved
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: "Bottom"
  }
</script>

<style lang="scss">
  @import "../assets/css/layout/_grid";

  footer {
    grid-row-start: row3;
    grid-row-end: row3;
    grid-column-start: col1;
    grid-column-end: span 6;
    display: flex;
    align-items: center;

    .wrapper {
      grid-template-columns: $five-column-grid;
    }

    .container-a {
      grid-column-start: col2;
      grid-column-end: col3;

      .socials {
        display: flex;
        align-items: center;

        .social {
          height: 15px;
          width: 15px;
          border: 1.8px solid whitesmoke;
          margin-right: 1em;
        }
      }
    }

    .container-b {
      grid-column-start: col4;
      grid-column-end: col5-end;

      .copyright {
        font-weight: 400;
        font-size: .8rem;
      }
    }
  }
</style>
