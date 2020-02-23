<template>
  <div id="app">

    <titlebar></titlebar>

    <div id="main-cont">
      <div id="main-cont-left">
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
      tabs: [
          {
              icon: "/assets/icons/i_calendar.svg",
              icon_selected: "/assets/icons/i_calendar_s.svg",
              routerName: "home",
              name: "Calendar"
          },
          {
              icon: "/assets/icons/i_team.svg",
              icon_selected: "/assets/icons/i_team_s.svg",
              routerName: "group",
              name: "Groups"
          },
          {
              icon: "/assets/icons/i_tasks.svg",
              icon_selected: "/assets/icons/i_tasks_s.svg",
              routerName: "newGroup",
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
}
</style>
