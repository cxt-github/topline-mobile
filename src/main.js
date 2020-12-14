import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入自己封装的vue插件
import myplugs from './utils/loginplugs'
//导入vant
import Vant from 'vant';
import { Lazyload } from 'vant';
//导入dayjs
import * as dayjs from 'dayjs'
require('dayjs/locale/zh-cn')
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
Vue.use(Lazyload);
//使用vee-validate
Vue.component('ValidationProvider', ValidationProvider);
//使用dayjs,语言包
dayjs.locale('zh-cn') // 全局使用简体中文
//使用dayjs插槽
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

//全局过滤
//过滤过去到现在的相对事件，用dayjs
Vue.filter('dateFilter',item => {
  return dayjs().from(dayjs(item))
})

Vue.filter('timeFilter',item => {
  return dayjs().format('MM-DD HH:mm')
})

//使用自己封装的vue插件
Vue.use(myplugs)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
