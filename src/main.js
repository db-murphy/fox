import Vue from 'vue';
import App from './App';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false;
Vue.use(ElementUI);


new Vue({
	el: '#app',
	store,
	template: '<App/>',
	components: { App }
});
Vue.config.devtools = true;
