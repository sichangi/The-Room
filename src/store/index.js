import Vuex from 'vuex';
import Vue from 'vue';
import show from './modules/show';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {show}
});
