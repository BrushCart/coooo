import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import app from './module/app';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app
  },
  plugins:[createLogger()]
})
