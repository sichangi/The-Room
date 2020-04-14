<template>
  <main ref="core">
    <symbols></symbols>
    <background></background>
<!--    <grid></grid>-->
    <div id="c">
      <top></top>
      <!--      <left-aside></left-aside>-->
      <center></center>
<!--      <right-aside></right-aside>-->
      <bottom></bottom>
    </div>
  </main>
</template>

<script>
  import Grid from './Grid';
  import Top from './components/Top';
  import Bottom from './components/Bottom';
  import Center from './components/Center';
  import Background from './components/Background';
  import Symbols from './components/Symbols';
  import RightAside from './components/right-aside';
  import LeftAside from './components/left-aside';

  export default {
    name: 'App',
    components: {LeftAside, RightAside, Symbols, Center, Bottom, Top, Background, Grid}
  };
</script>

<style lang="scss" src="./assets/css/main.scss"></style>

<style lang="scss">
  @import "./assets/css/layout/_grid";

  main {
    position: relative;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    min-height: 100vh;
    overflow: hidden;
    z-index: 1;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    section {
      position: relative;
      height: 100vh;
    }

    #cache {
      visibility: hidden;
      position: fixed;
      opacity: 0;
      height: 0;
      width: 0;
      top: 0;
      left: 0;
    }

    * {
      min-width: 0;
    }

    #c {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 3;
      width: 100%;
      height: 100%;
      overflow: visible;
      display: grid;
      /*pointer-events: none;*/
      background-color: rgba(0, 0, 0, 0.1);
      grid-template-columns: $five-column-grid;
      grid-template-rows: $three-row-grid;

      @media (max-width: 760px) {
        grid-template-rows: $three-row-grid-sm;
      }
    }
  }
</style>
