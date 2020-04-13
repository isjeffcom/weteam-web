import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import home from './components/home'
import today from './components/today'
import login from './components/login'
import welcome from './components/welcome'
import join from './components/join'
import created from'./components/created'
import group from './components/group'
import groupDetail from './components/groupDetail'
import newGroup from './components/newGroup'
import groupManager from './components/groupManager'
import GroupTask from './components/taskList'
import settings from './components/settings'




export default new VueRouter({
  routes: [
      { path:'/', name:'Home', redirect: '/home' },
      { path: '/today', name: 'today', component: today },
      { path: '/home', name: 'home', component: home },
      { path: '/login', name: 'login', component: login },
      { path: '/welcome', name: 'welcome', component: welcome },
      { path: '/join', name: 'join', component: join },
      { path: '/created', name: 'created', component: created},
      { path: '/group', name: 'group', component: group },
      { path: '/groupDetail', name: 'groupDetail', component: groupDetail },
      { path: '/newGroup', name: 'newGroup', component: newGroup },
      { path: '/groupManager', name: 'groupManager', component: groupManager },
      { path: '/GroupTask', name: 'GroupTask', component: GroupTask },
      { path: '/settings', name: 'settings', component: settings },
      //{ path: '/GroupNewTask', name: 'GroupNewTask', component: GroupNewTask },
      //{ path: '/personal', name: 'personal', component: personal},
    ]
})