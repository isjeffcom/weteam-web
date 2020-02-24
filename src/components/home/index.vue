<template>
    <div id="home">
        <div id="home-calendar">
            <calendar initView="week" selectedColor="#0277F9" v-on:day="afterTapDay"></calendar>
        </div>

        <div id="home-timetable">
            <timetable :events="currentEvtArr"></timetable>
        </div>
        
    </div>
</template>

<script>

import calendar from '../widgets/calendar'
import timetable from '../widgets/timetable'

import { EventBus } from '../../bus'

const ls = require('local-storage')
const request = require('../../request')
const util = require('../../support/util')

export default {
    name: "home",
    components:{
        calendar,
        timetable
    },
    data(){
        return{
            allTTData: [],
            currentEvtArr: [],
            currentView: "week",
            hasUpdated: false,
        }
    },
    created(){
        EventBus.$emit("showSidebar", true)

        if(!ls.get("login_name") && !ls.get("login_token")){
            this.$router.push('login')
            return
        }

        if(ls.get("to_join")){

            const postReady = {
                gid: parseInt(ls.get("to_join")),
                uuid: parseInt(ls.get("login_uuid"))
            }

            request.post('/join', postReady, (res)=>{
                if(res.status){
                    this.$message({
                        type: 'success',
                        message: 'You have successfully joined!!'
                    })
                } else {
                    this.$message({
                        type: 'warning',
                        message: 'Join group unsuccessful. Please try again.'
                    })
                }
            })

            ls.remove("to_join")
        }

        this.allTTData = ls.get("data_tt")

        this.renderDayEvt()



    },
    methods:{
        renderDayEvt (date) {

            var that = this

            const ttLastUp = ls.get("tt_lastUp") ? ls.get("tt_lastUp") : 0
            const currentTs = new Date().getTime()
            const expire = 7 * (24 * (60 * (60 * 1000))) //7 day
            //const expire = 0
            
            if(!date){
                var tod = new Date()
                date = { day: tod.getDate(), month: tod.getMonth() + 1, week: tod.getDay(), year: tod.getFullYear() }
            }
            
            var evtData = this.getEvt(date)

            console.log(evtData)

            if (evtData.status){
                this.currentEvtArr = evtData.data
            }

            // If data expired 
            /*if (!this.hasUpdated && Math.abs(currentTs - ttLastUp) > expire) {

                request.updateTT((res) => {
                    this.hasUpdated = true
                })
            }*/
        },

        getEvt(sDate){

            // Get data from local storage
            var tt = this.allTTData

            if (tt) {
                // sometime is an arr, so get the 1st one(only one)
                if (Array.isArray(sDate)) {
                    sDate = sDate[0]
                }

                // combine query string
                var tar = sDate.year + "-" + util.ifSingleAddZero(sDate.month) + "-" + sDate.day

                // excute matcher
                var res = util.timeEvtMatcher(tar, tt)

                // Return
                return { status: true, count: res.length, data: res }

            } else {
                // If no timetable data from storage, get new
                /*request.updateTT((res) => {

                    if (res.data.status) {

                    var result = res.data.data

                    that.renderDayEvt(sDate)

                    return { status: false, count: 0, data: "updating" }

                    } else {

                    return { status: false, count: 0, data: "no timetable data" }

                    }
                })*/

                return { status: false, count: 0, data: "no timetable data"  }
            }
        },

        /**
         * 选择日期后执行的事件
         */
        afterTapDay(val) {
            this.renderDayEvt(val)
        },
    }
}
</script>

<style scoped>
#home-timetable{
    height: 500px;
}
</style>