import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入vant
import Vant from 'vant';
//导入vee-validate
import { ValidationProvider, extend } from 'vee-validate';

//导入全局默认样式
import './styles/base/base.css'

//导入vant样式
import 'vant/lib/index.css';

extend('secret', {
  validate: value => value === 'example',
  message: 'This is not the magic word'
});

//使用vant
Vue.use(Vant);
//使用vee-validate
Vue.component('ValidationProvider', ValidationProvider);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
