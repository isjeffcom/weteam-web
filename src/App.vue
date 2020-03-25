<template>
  <div id="app">

    <titlebar></titlebar>

    <div id="main-cont">

      <div id="main-cont-left" v-if="hasSidebar">
        <sidebar :tabs="tabs"></sidebar>
      </div>

      <div id="main-cont-right">
        <router-view id="rv"></router-view>
      </div>
      
    </div>
    
  </div>
</template>

<script>

import titlebar from './components/widgets/titlebar'
import sidebar from './components/widgets/sidebar'

import { EventBus } from './bus'

export default {
  name: 'App',
  components: {
    titlebar,
    sidebar
  },
  data(){
    return{
      hasSidebar: true,
      tabs: [
          {
              icon: "./assets/icons/i_calendar.svg",
              icon_selected: "./assets/icons/i_calendar_s.svg",
              routerName: "home",
              name: "Calendar"
          },
          {
              icon: "./assets/icons/i_team.svg",
              icon_selected: "./assets/icons/i_team_s.svg",
              routerName: "group",
              name: "Groups"
          },
          {
              icon: "./assets/icons/i_tasks.svg",
              icon_selected: "./assets/icons/i_tasks_s.svg",
              routerName: "task",
              name: "Tasks"
          }
      ]
    }
  },
  created(){
    //Global Router
    var that = this
    EventBus.$on("sidebar", function(data){
      
      console.log(that.tabs[data].routerName)
      that.$router.push(that.tabs[data].routerName)
    })

    EventBus.$on("showSidebar", function(data){
      that.hasSidebar = data
    })
  }
}
</script>

<style>

*{
  padding: 0;
  margin: 0;
}

#app {
  width: 100%;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  user-select: none;
}

.el-button{
  border-radius: 0px !important;
}

#main-cont{
  display: flex;
  width: 100%;
}

#main-cont-left{
  width: 20%;
}

#main-cont-right{
  width: 80%;
  height: 100%;
  overflow: hidden;
}

#rv{
  width: 100%;
  overflow: hidden;
}

.pupup-title{
  font-size: 24px;
  font-weight: bold;
}

#popup{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}

.popup-bg{
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
  z-index: 99998;
}

.popup-cont{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 99999;
}

.popup-inner{
  top: 50%;
  transform: translateY(50%);
  margin-left: auto;
  margin-right: auto;
  width: 410px;
  height: 300px;
  background: #fff;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.05);
  z-index: 99999;
}
</style>
