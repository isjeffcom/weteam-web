import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import home from './components/home'
import login from './components/login'
import welcome from './components/welcome'
import signup from './components/signup'
import join from './components/join'
import task from './components/task'
import created from'./components/created'
import group from './components/group'
import groupDetail from './components/groupDetail'
import newGroup from './components/newGroup'
import groupManager from './components/groupManager'
import MyTask from './components/MyTask'
import MyNewTask from './components/MyNewTask'
import GroupTask from './components/GroupTask'
import GroupNewTask from './components/GroupNewTask'
import TaskEdit from './components/TaskEdit'



export default new VueRouter({
  routes: [
      { path:'/', name:'Home', redirect: '/home' },
      { path: '/home', name: 'home', component: home },
      { path: '/login', name: 'login', component: login },
      { path: '/welcome', name: 'welcome', component: welcome },
      { path: '/signup', name: 'signup', component: signup },
      { path: '/join', name: 'join', component: join },
      { path: '/task', name: 'task', component: task },
      { path: '/created', name: 'created', component: created},
      { path: '/group', name: 'group', component: group },
      { path: '/groupDetail', name: 'groupDetail', component: groupDetail },
      { path: '/newGroup', name: 'newGroup', component: newGroup },
      { path: '/groupManager', name: 'groupManager', component: groupManager },
      { path: '/MyTask', name: 'MyTask', component: MyTask },
      { path: '/MyNewTask', name: 'MyNewTask', component: MyNewTask },
      { path: '/GroupTask', name: 'GroupTask', component: GroupTask },
      { path: '/GroupNewTask', name: 'GroupNewTask', component: GroupNewTask },
      { path: '/TaskEdit', name: 'TaskEdit', component: TaskEdit },
    ]
})