import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import home from './components/home'
import login from './components/login'
import welcome from './components/welcome'


export default new VueRouter({
  mode: 'history',
  routes: [
      { path:'/', name:'Home', redirect: '/home' },
      { path: '/home', name: 'home', component: home },
      { path: '/login', name: 'login', component: login },
      { path: '/welcome', name: 'welcome', component: welcome }
    ]
})