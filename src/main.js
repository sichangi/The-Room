import Vue from 'vue';
import App from './App.vue';
import store from './store';
import '@sichangi/virtual-scroll';
import 'animejs';

Vue.config.productionTip = false;

Vue.mixin({
  data() {
    return {
      _mq: null,
      isMobile: false
    };
  },
  mounted() {
    if (typeof window !== 'undefined') {
      this.$data._mq = window.matchMedia('(max-width: 770px)');

      const isMobileHandler = () => this.isMobile = this.$data._mq.matches;

      isMobileHandler();
      this.$data._mq.addListener(isMobileHandler);

      this.$once('hook:beforeDestroy', () => {
        this.$data._mq.removeListener(isMobileHandler);
      });
    }
  }
});

new Vue({
  store,
  render: h => h(App)
}).$mount('main');
