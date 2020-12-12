import Vue from 'vue'
import VueRouter from 'vue-router'

//导入子组件
// import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  {
    //重定向，如果访问/，就会直接访问/login
    path:'/',
    redirect:'/home'
  },
  //() => import('') 相当于导入子组件
  { path: '/login', component: () => import('../views/Login') },
  { path: '/tabBar', component: () => import('../views/TabBar'),
    children: [
      { path: '/home', component: () => import('../views/Home') },
      { path: '/search', component: () => import('../views/Search') },
      { path: '/my', component: () => import('../views/My') },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
