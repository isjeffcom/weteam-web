<template>
    <div id="home">
        <div id="home-calendar">
            <calendar initView="week" selectedColor="linear-gradient(38.77deg, #C3BCF1 0%, #5756B3 100%)" selectedShadow="0px 2px 12px rgba(122, 119, 199, 0.5)" v-on:day="afterTapDay"></calendar>
        </div>

        <div id="home-timetable">
            <timetable :events="currentEvtArr"></timetable>
        </div>

        <div id="add-calendar" class="floating-btn" v-on:click="newEvt = true">
            <div class="floating-btn-inner">
                <img src="../../assets/add.svg" alt="add event">
            </div>
        </div>

        <newEvt id="newTask" v-if="newEvt"></newEvt>
        <newEvt id="editTask" :d="selectedEditing" v-if="editEvt"></newEvt>
        
    </div>
</template>

<script>

import calendar from '../widgets/calendar'
import timetable from '../widgets/timetable'
import newEvt from '../newEvt'

import { EventBus } from '../../bus'

import ls from 'local-storage'
import request from '../../request'
import {ifSingleAddZero, timeEvtMatcher} from '../../support/util'

export default {
    name: "home",
    components:{
        calendar,
        timetable,
        newEvt
    },
    data(){
        return{
            api_customCal: '/personalView',
            api_delEvt: '/personalDelete',
            selectedDate: false,
            allTTData: [],
            currentEvtArr: [],
            currentView: "week",
            hasUpdated: false,
            newEvt: false,
            editEvt: false,
            selectedEditing: {}
        }
    },
    created(){
        EventBus.$emit("showSidebar", true)

        // Close window
        EventBus.$on("popup-close", ()=>{
            this.newEvt = false
            this.editEvt = false
            this.selectedEditing = {}
        })

        // Add Event Finished
        EventBus.$on("evt-up", ()=>{
            this.getData()
        })

        EventBus.$on("tt-detail-edit", (res) => {
            this.selectedEditing = res
            this.$nextTick(()=>{
                this.editEvt = true
            })
        })

        EventBus.$on("tt-detail-del", (res) => {
            this.delete(res)
        })

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

        this.getData()


    },
    methods:{

        getData(){
            this.allTTData = ls.get("data_tt")

            this.concatWeTeamCal(ls.get("login_uuid"))
        },


        renderDayEvt (date) {

            var that = this

            const ttLastUp = ls.get("tt_lastUp") ? ls.get("tt_lastUp") : 0
            const currentTs = new Date().getTime()
            const expire = 7 * (24 * (60 * (60 * 1000))) //7 day
            //const expire = 0
            
            if(!date){
                let tod = new Date()
                date = { day: tod.getDate(), month: tod.getMonth() + 1, week: tod.getDay(), year: tod.getFullYear() }
            } else {
                // Save current selected date
                this.selectedDate = date
            }
            
            let evtData = this.getEvt(date)
            if(evtData.count == 0){
                this.$message('No event for today.');
            }

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

        // Get calendar added from WeTeam(personal timetable), push it to the main tt data 
        concatWeTeamCal(uuid){
            const postReady = [
                {
                    name: "uuid",
                    val: uuid
                },
            ]

            request.get(this.api_customCal, postReady, (res)=>{
                // Save personal timetable

                let pTT = res.data.data

                if(pTT == "no record"){
                    return
                }

                // Add Unique Marker
                for(let i=0;i<pTT.length;i++){
                    pTT[i].isCustom = true
                }

                // Merge 2 array
                this.allTTData = this.allTTData.concat(pTT)

                // Re-render
                this.renderDayEvt(this.selectedDate)
            })
        },

        // Get Evts according to selected date
        getEvt(sDate){

            // Get data from local storage
            var tt = this.allTTData

            if (tt) {
                // sometime is an arr, so get the 1st one(only one)
                if (Array.isArray(sDate)) {
                    sDate = sDate[0]
                }

                // combine query string
                var tar = sDate.year + "-" + ifSingleAddZero(sDate.month) + "-" + sDate.day

                // excute matcher
                var res = timeEvtMatcher(tar, tt)

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

        delete(item){
            const postReady = {
                id: item.id,
                uuid: ls.get("login_uuid")
            }

            request.post(this.api_delEvt, postReady, (res)=>{
                if(res.status){
                    this.getData()
                    EventBus.$emit("tt-close-detail", true)
                }
            })
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
    height: 600px;
}
</style>