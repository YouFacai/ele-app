import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import MintUI from 'mint-ui'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'mint-ui/lib/style.css'
import './assets/font/iconfont.js' //引入阿里巴巴图标库js
import './assets/font/iconfont.css'//引入阿里巴巴图标库css
Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(ElementUI)
Vue.prototype.$axios = axios;
import { Indicator } from 'mint-ui';

// 全局axios拦截器(请求)
axios.interceptors.request.use(
	res => {
		Indicator.open('加载中...');
		return res
	},
	err=>{
		return err
	}
),


// 全局axios拦截器(响应)
axios.interceptors.response.use(
	res => {
		Indicator.close();
		return res
	},
	err=>{
		Indicator.close();
		return err
	}
),

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
