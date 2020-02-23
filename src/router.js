import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import home from './components/home'
import login from './components/login'
import welcome from './components/welcome'
import signup from './components/signup'
import join from './components/join'
import ooo from './components/liu'
import logina from './components/logina'
import created from'./components/created'

import group from './components/group'
import newGroup from './components/newGroup'
import groupManager from './components/groupManager'



export default new VueRouter({
  routes: [
      { path:'/', name:'Home', redirect: '/home' },
      { path: '/home', name: 'home', component: home },
      { path: '/login', name: 'login', component: login },
      { path: '/welcome', name: 'welcome', component: welcome },
      { path: '/signup', name: 'signup', component: signup },
      { path: '/join', name: 'join', component: join },
      { path: '/liu', name: 'liu', component: ooo },
      { path: '/logina', name: 'logina', component: logina },
      { path: '/created', name: 'created', component: created},
      { path: '/group', name: 'group', component: group },
      { path: '/newGroup', name: 'newGroup', component: newGroup },
      { path: '/groupManager', name: 'groupManager', component: groupManager },
    ]
})