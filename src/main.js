import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import store from './store';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})