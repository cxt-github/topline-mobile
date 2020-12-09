import Vue from 'vue'
import VueRouter from 'vue-router'

//导入子组件
// import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  //() => import('') 相当于导入子组件
  { path: '/login', component: () => import('../views/Login') },
  { path: '/home', component: () => import('../views/Home') },
]

const router = new VueRouter({
  routes
})

export default router
