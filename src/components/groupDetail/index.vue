<template>
    <div id="group-detail">

        <div id="group-info">
            <div id="group-info-inner">

                <div id="group-info-left">
                    <div id="group-info-avatar">
                        <img src="../../assets/i_group_c.svg" alt="group management button">
                    </div>

                    <div id="group-info-name">
                        <span>{{gname}}</span>
                    </div>

                    <div id="group-info-more" v-on:click="toGroupManage">
                        <img src="../../assets/i_more.svg" alt="to group management page">
                    </div>
                </div>

                <div id="group-info-right">
                    <div id="group-info-invite" v-if="gopen" v-on:click="popInvite">
                        <span> + Invite</span>
                    </div>

                    <div v-else>
                        <span style="opacity: 0.5;">Access Closed by Admin</span>
                    </div>
                </div>
            </div>
        </div>

        <div id="group-calendar">
            <calendar initView="week" selectedColor="#0277F9" v-on:day="afterTapDay"></calendar>
        </div>

        <div id="group-timetable">
            <timetable :events="currentEvtArr"></timetable>
        </div>
    </div>
</template>

<script>
import calendar from '../widgets/calendar'
import timetable from '../widgets/timetable'

const util = require('../../support/util')
const request = require('../../request')
const ls = require('local-storage')

export default {
    name: "groupDetail",
    components:{
        calendar,
        timetable
    },
    data(){
        return{
            gid: "",
            gname: "",
            gcode: "",
            gopen: true,
            memImgs: [],
            allTTData: [],
            allTasksData: [],
            currentEvtArr: []
        }
    },

    created(){
        this.gid = this.$route.query.id
        this.gname = this.$route.query.name
        this.gcode = this.$route.query.code
        this.gopen = parseInt(this.$route.query.open) == 1 ? true : false

        const cacheData = ls.get("data_gtt_" + this.gid)

        if(cacheData){
            this.allTTData = cacheData
            this.renderDayEvt()
        } else {
            this.update()
        }

    },


    methods:{
        afterTapDay(val) {
            this.renderDayEvt(val)
        },

        renderDayEvt(date) {
            if (!date) {
                var tod = new Date()
                date = { day: tod.getDate(), week: tod.getDay(), month: tod.getMonth() + 1, year: tod.getFullYear() }
            }

            var evtData = this.getEvt(date)

            if (evtData.status) {
                this.currentEvtArr = evtData.data
            }
        },

        getEvt(sDate) {


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
                this.update()
                return { status: false, count: 0, data: "no timetable data, try to get data" }
            }

        },

        update(){
            const postReady = [
                {
                    name: "gid",
                    val: this.gid
                }
            ]

            request.get('/memberTimetable', postReady, (res)=>{
                this.allTTData = res.data
                ls.set("data_gtt_" + this.gid, res.data)
                this.renderDayEvt()
            })
        },

        popInvite(){
            const base_url = window.location.origin
            const uuid = ls.get("login_uuid")
            const username = ls.get("data_n")

            this.$prompt('Copy Invite Link', 'Invitation', {
                confirmButtonText: 'OK',
                cancelButtonText: 'CANCEL',
                inputValue: base_url + '/#/join/?code='+this.gcode+'&uname='+username+'&gid='+this.gid+'&gname='+this.gname,
            }).then(({ value }) => {

            }).catch(() => {
              
            });
        },

        toGroupManage(){
            this.$router.push({name: "groupManager", query:{gid: this.gid}})
        }
    }
}
</script>

<style scoped>
#group-timetable{
    height: 500px;
}

#group-info{
    width: 100%;
    height: 50px;
    background: #fafafa;
}

#group-info-inner{
    display: flex;
}

#group-info-name{
    margin-top: 7px;
    margin-left: 10px;
    font-size: 18px;
    font-weight: bold;
}

#group-info-more{
    width: 44px;
    height: 26px;
    border-radius: 4px;
    background: #f2f2f2;
    text-align: center;
    padding-top:4px;
    margin-left: 10px;
    margin-top: 2px;
    cursor: pointer;
    transition: all 0.32s cubic-bezier(.25,.8,.25,1);
}

#group-info-more:hover{
    background: #E7E7E7;
}

#group-info-left{
    display: flex;
    margin-top: 20px;
    margin-left: 40px;
}

#group-info-right{
    position: absolute;
    right: 30px;
    margin-top: 20px;
}

#group-info-invite{
    width: 80px;
    height: 24px;
    background: #fafafa;
    border: 2px solid #0277F9;
    color: #0277F9;
    font-weight: bold;
    text-align: center;
    padding-top: 7px;
    border-radius: 4px;
    cursor:pointer;
    transition: all 0.32s cubic-bezier(.25,.8,.25,1);
}

#group-info-invite:hover{
    background: #0277F9;
    color: #ffffff;
}
</style>