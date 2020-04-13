<template>
    <div id="newtask">


        <div class="popup-bg" v-on:click="close()"></div>

        <div class="popup-cont">
            <div class="popup-inner">
                <div class="popup-title">
                    <span>Event</span>
                </div>

                <div class="popup-s popup-input">
                    <input type="text" v-model="name" placeholder="Name">
                </div>

                <div class="popup-s popup-input">
                    <input type="text" v-model="location" placeholder="Location">
                </div>

                <div class="popup-s">
                    <!--datepicker format="yyyy-MM-dd" v-model="evtDate" input-class="dp-overwrite" placeholder="Select a date"></datepicker-->
                    <el-date-picker
                        v-model="evtDate"
                        type="date"
                        placeholder="Pick a day">
                    </el-date-picker>
                </div>

                <div class="popup-s popup-flex">
                    <el-time-select
                        v-model="startTime"
                        :picker-options="{
                            start: '00:00',
                            end: '23:30'
                        }"
                        placeholder="Start time">
                    </el-time-select>

                    <el-time-select
                        v-model="endTime"
                        :picker-options="{
                            start: '00:00',
                            end: '23:30'
                        }"
                        placeholder="End time">
                    </el-time-select>
                </div>

                <div class="popup-submit">
                    <el-button v-on:click="up()">SUBMIT</el-button>
                </div>
                
            </div>
        </div>


    </div>
</template>

<script>

import { EventBus } from '../../bus'

import { checkFilled } from '../../support/util'

//import Datepicker from 'vuejs-datepicker'

const request = require('../../request')
const ls = require('local-storage')

export default {
    
    name: "newtask",
    components:{
        //Datepicker
    },

    props:{
        d: {
            type: Object,
            val: {}
        }
    },

    data(){
        return{
            mode: "new",
            api_edit: '/personalEdit',
            api_add: "/personalAdd",
            api_del: '/personalDelete',
            id: "",
            name: "",
            location: "",
            userId: null,
            evtDate:"",
            startTime: "09:00",
            endTime: "12:00"
        }
    },

    created(){

        this.userId = ls.get("login_uuid")

        if(this.d){
            this.id = this.d.id
            this.mode = "edit"
            this.name = this.d.name
            this.location = this.d.location
            this.evtDate = this.d.start.split(",")[0]
            this.startTime = this.d.startTime
            this.endTime = this.d.endTime

        } else {

            this.mode = "new"

        }
    },

    methods:{
        up(){

            // Date is ready
            let dateReady = this.dateFormatter(this.evtDate)
            
            // Check every thing filled
            if(this.name.length < 1 || this.location.length < 1 || this.endTime.length < 1 || this.evtDate.length < 1){
                alert("please fill in")
                return
            }

            let postReady = {
                uuid: this.userId,
                name: this.name,
                location: this.location,
                allDay: false,
                start: dateReady + "," + this.timeFormatter(this.startTime),
                startTS: Date.parse( new Date(dateReady + " " + this.timeFormatter(this.startTime))),
                end: dateReady + "," + this.timeFormatter(this.endTime),
                endTS: Date.parse( new Date(dateReady + " " + this.timeFormatter(this.endTime))),
            }

            // Check new or edit, change api dynamically
            let api = this.mode == "new" ? this.api_add : this.api_edit

            // If is edit mode, add event id to post data
            if(this.mode == "edit") {
                postReady['id'] = this.id
            }
            
            // Post Request
            request.post(api, postReady, (res)=>{
                if(res.status){
                    EventBus.$emit("evt-up", true)
                    this.close()
                }
            })
        },

        // Send Close Event
        close(){
            EventBus.$emit("popup-close", true)
        },

        // Convert date to weteam server accepted format
        dateFormatter(date){
            let sd = new Date(date)
            return sd.getFullYear() + "-" + this.addZeroToMouth(sd.getMonth() + 1) + '-' + sd.getDate()
        },

        // Convert time to weteam server accepted format
        timeFormatter(time){
            let ready = time.split(":")
            return ready.length < 3 ? time + ":00" : time
        },

        // Add an zero if mouth less than 10
        addZeroToMouth(m){
            return m < 10 ? "0" + m : m
        }
    }
}
</script>


<style scoped>



.popup-inner{
    position: fixed;
    padding: 24px;
}

.popup-title{
    font-size: 24px;
    font-weight: bold;
}

.popup-s{
    margin-top: 14px;
    margin-bottom: 14px;
}

.popup-submit{
    position: absolute;
    width: 90%;
    bottom: 20px;
}

.popup-more-content{
    color: #808080;
    cursor: pointer;
}

.popup-flex{
    display: flex;
}

</style>