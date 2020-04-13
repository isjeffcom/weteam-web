<template>
  <div id="app">

    <div id="main-cont">

      <div id="main-cont-left" v-if="hasSidebar">
        <sidebar :tabs="tabs"></sidebar>
      </div>

      <div id="main-cont-right">
        <titlebar :color="titlebarColor"></titlebar>
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
      titlebarColor: "white",
      tabs: [
          {
              icon: "./assets/icons/i_today.svg",
              icon_selected: "./assets/icons/i_today_s.svg",
              routerName: "today",
              name: "Today"
          },
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
              routerName: "GroupTask",
              name: "Tasks"
          }
      ]
    }
  },

  watch: { 
    '$route': {
      handler: function(data) {
        if(data.name == "today"){
          this.titlebarColor = "white"
        } else {
          this.titlebarColor = "black"
        }

      }
    }
  },

  created(){
    //Global Router
    var that = this

    // Receive event from sidebar when sidebar item clicked
    EventBus.$on("sidebar", function(data){

      // Get name
      let tn = that.tabs[data].routerName

      // ignore action if is the same
      if(that.$router.currentRoute.name != tn){
        that.$router.push(tn)
      }
      
    })

    // If show sidebar
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

input{
  height: 30px;
  width: 100%;
  font-size: 18px;
  appearance: none;
  border: none;
  border-bottom: 2px solid #888;
  -webkit-appearance: none;
  -moz-appearance: none;
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}

input:focus{
  outline: none;
  border-bottom: 2px solid #000;
}

.inner{
    width: 95%;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
}

.dp-overwrite{
  border-bottom: none;
  color: #797979;
  border: 1px solid #C2C2C2;
  background: #F2F2F2;
  border-radius: 2px;
}

.page-bg{
    position: fixed;
    top:0px;
    width: 100%;
    height: 100%;
    z-index: -1;
}

#app {
  width: 100%;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  user-select: none;
  color: #494E59;
}

progress[value]{
    border: 0;
    height: 6px;
    -webkit-appearance: none;
    appearance: none;
}

progress[value]::-webkit-progress-bar{
    background-color: #46545B;
    height: 6px;
    -webkit-appearance: none;
    border-radius: 100px;
}

progress[value]::-webkit-progress-value{
    border-radius: 100px;
    background-color: #36FFAB;
}

.el-button{
  border-radius: 0px !important;
}

.ctitle{
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 10px;
}

.floating-btn{
  position: fixed;
  height: 60px;
  width: 60px;
  bottom: 40px;
  right: 30px;
  background: #5756B3;
  color: #fff;
  box-shadow: 0px 2px 12px rgba(122, 119, 199, 0.5);
  border-radius: 100px;
  font-size: 24px;
  cursor: pointer;
  transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.floating-btn:hover{
  background: rgb(131, 129, 252);
  box-shadow: 0px 6px 24px rgba(122, 119, 199, 0.5);
}

.floating-btn-inner{
  width:100%;
  height: 100%;
  text-align: center;
  margin-top: 17px;
}

.floating-btn-inner img{
  width: 25px;
  height: 25px;
}

.cal-cont{
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid rgba(0,0,0,0.05);
    background: #fff;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
}

#main-cont{
  display: flex;
  width: 100%;
}

#main-cont-left{
  width: 10%;
}

#main-cont-right{
  width: 90%;
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
  z-index: 98;
}

.popup-cont{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 99;
}

.popup-inner{
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-left: auto;
  margin-right: auto;
  width: 410px;
  height: 300px;
  background: #fff;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.05);
  z-index: 99;
}

.user-widget{
  width: 100%;
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  color: #494E59;
  transition: all 1.4s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.user-widget:hover{
  box-shadow: 0px 10px 22px rgba(0, 0, 0, 0.1);
}

.user-widget-more{
    float: right;
    cursor: pointer;
    margin-right: 2px;
    margin-top: -26px;
}

.user-widget-title{
    margin-top: 24px;
    font-size: 18px;
    color: #6B717D;
}

.user-widget-inner{
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

</style>
