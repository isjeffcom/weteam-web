<template>
    <div id="timetable">
        <div style="height: 100%;">

            <div class="tt-cont" id="tt-cont">

                <!-- Render Time Slots Background -->
                <div class="tt-time">
                    <div 
                        class="tt-time-single" 
                        v-for="(item, idx) in times" 
                        :key="idx"
                        :style="'height:' + (slotHeight - 1) + 'px;'">
                            <div class="tt-time-single-text">
                                <span>{{ item }}</span>
                            </div>
                    </div>
                </div>


                <div class="tt-evts" v-if="ttEvtsDisplay">

                    <!-- Get All Sorted Events -->
                    <div 
                    class="tt-evts-single"
                    :style="'opacity:' + tt_evts_single.opa"
                    v-for="(item,idx) in innerEvts" 
                    :key="idx">

                        <!-- Get Events in the same time slot -->
                        <div 
                        class="tt-evts-single-slot"
                        v-for="(evt, evtIdx) in item.child "
                        v-on:click="openDetail(evt)"
                        :key="evtIdx"
                        :style="'top: ' + evt.size.top + 'px; height:' + evt.size.height + 'px; width: calc(80%/' + item.child.length + '); left: ' + (evtIdx * ((screenWidth / item.child.length + 1) - 40)) + 'px; background: ' + (hMems ? setColor(evt.uuid) : setColor())">

                        <!-- Event Time Slot -->
                        <!--div class="tt-evts-single-time">
                            <span>{{evt.startTime}} - {{evt.endTime}}</span>
                        </div-->

                            <!-- Event Name -->
                            <div class="tt-evts-single-name">
                                <span v-if="evt.hide">**</span>
                                <span> {{ setName(evt.name, evt.size.height)}} </span>
                                <span v-if="evt.hide">**</span>
                            </div>

                            <!--div class="tt-evts-single-name" v-if="item.child.length < 3">
                                <span wx:if="{{evt.hide}}">**</span>
                                <span> {{ cname.setName(evt.name, evt.size.height) }} </span>
                                <span wx:if="{{evt.hide}}">**</span>
                            </div-->

                            <!--div class="tt-evts-single-name" v-if="item.child.length >= 3 && evtIdx == 0">
                                <span>{{ item.child.length }} 个事件</span>
                            </div-->

                            <!-- User Avatar -->
                            <div class="tt-evts-single-uimg" v-if="hMems && evt.uimg != null">
                                <div class="avatar tt-evts-single-uimg-inner" >
                                <image 
                                    class="tt-evts-single-uimg-img" 
                                    :src="evt.uimg">
                                </image>
                                </div>
                            </div>
                        </div>

                        <!-- IF TOO MANY EVENTS -->
                        <!--div 
                        class="tt-evts-single-slot"
                        bindtap="openDetail"
                        wx:for="{{ item.child }}" 
                        wx:for-item="evt" 
                        wx:for-index="evtIdx" 
                        wx:key="evtIdx"
                        data-d="{{ item.child }}"
                        wx:if="{{ item.child.length >= 3 && evtIdx == 0}}"
                        style="top: {{ evt.size.top }}px; height: {{ evt.size.height }}px; background: {{ ccolors.getEvtsColor(evt.uuid ? evt.uuid : 0  ) }};"-->
                        <!-- Events Count Number -->
                            <!--div class="tt-evts-single-name">
                                <span>{{ item.child.length }} 个事件</span>
                            </div>
                        </div-->
                    
                    </div>

                </div>

                <!-- Current Time Indicator -->
                <div 
                class="tt-evts-single tt-evts-current"
                id="tt-evts-current"
                :style="'top: ' + currentLine.top + 'px; height:' + currentLine.height + 'px; background:#F90279;'">
                    <span class="tt-evts-current-text">NOW</span>
                </div>
            
            </div>

        </div>

        <div class="tt-cover" id="tt-cover" :style="'opacity:' + tt_cover.opa" v-on:click="closeDetail" v-if="detailOpen"></div>

        <!-- Display Event Detail Once User Clicked -->
        <div class="tt-evts-detail" id="tt-evts-detail" v-if="detailOpen" :style="'opacity:' + tt_evts_detail.opa + ';bottom:' + tt_evts_detail.bottom + 'px;transfrom: scale' + tt_evts_detail.scale + ';'">

            
            <div class="tt-evts-detail-inner" id="tt-evts-detail-inner">
            <!-- Detail Popup Title Area for Name and BG -->
            <div class="tt-evts-detail-title" :style="'background: ' + (hMems ? setColor(currentInfo[currentInfoIndex].uuid) : setColor())">
                <!-- Person who attend this event with avatar and name -->
                <div class="tt-evts-detail-title-user tt-evt-switch-ani" :style="'display: flex; opacity:' + tt_evt_switch.opa + ';'" v-if="hMems">
                    <div class="avatar" v-if="currentInfo.length > 0">
                        <image :src="currentInfo[currentInfoIndex].uimg" style="width: 50px; height:50px;"></image>
                    </div>
                    
                    <span class="avatar-text">{{currentInfo[currentInfoIndex].uname}} \n</span>
                </div>

                <div class="tt-evts-detail-title-text tt-evt-switch-ani" :style="'opacity:' + tt_evt_switch.opa + ';'">{{ limitName(currentInfo[currentInfoIndex].name, 80) }}</div>
            </div>

            <!-- Detail Popup Window Content -->
            <div class="tt-evts-detail-content tt-evt-switch-ani" :style="'opacity:' + tt_evt_switch.opa + ';'">
                <span class="tt-evts-detail-c-s">开始: {{currentInfo[currentInfoIndex].start}}</span> <br>
                <span class="tt-evts-detail-c-s">结束: {{currentInfo[currentInfoIndex].end}}</span> <br>
                <span class="tt-evts-detail-c-s">位置: {{currentInfo[currentInfoIndex].location}}</span> <br>
                <span v-if="currentInfo[currentInfoIndex].hide" style="opacity: 0.5;font-size: 14px;">用户开启隐私保护，不显示名称地点</span>
            </div>



            </div>

            <!-- Multiple Events Swiper -->
            <div class="tt-evts-detail-control" v-if="currentInfo.length > 1">
                <div class="tt-evts-d-c-inner">
                    <!-- Left -->
                    <div class="tt-evts-detail-c tt-evts-detail-c-left" v-on:click="lastEvt">
                        <div class="tt-evts-detail-c-icon" :style="'opacity: ' + currentInfoIndex == 0 ? 0.3 : 1">
                            <image class="tt-evts-detail-c-icon-img" src="./assets/left.svg"></image>
                        </div>
                    </div>

                    <!-- Right -->
                    <div class="tt-evts-detail-c tt-evts-detail-c-right" v-on:click="nextEvt">
                        <div class="tt-evts-detail-c-icon" :style="'transform: rotate(180deg); opacity: ' + currentInfoIndex == currentInfo.length-1 ? 0.3 : 1">
                            <image class="tt-evts-detail-c-icon-img" src="./assets/left.svg"></image>
                        </div>
                    </div>
                </div>
            </div>
            

            <!-- Close Btn -->
            <div class="tt-evts-detail-close" v-on:click="closeDetail">

                <div class="tt-evts-detail-close-icon">
                    <image class="tt-evts-detail-close-icon-img" src="./assets/close.svg"></image>
                </div>
            
            </div>
        </div>
    </div>
</template>


<script>

const timeProcessing = require('../../../support/time')

export default {
    name: "timetable",
    props:{
        events: Array,
        hasMems: {
            type: String,
            default: "f",
        },
        memsImg: Array
    },
    data(){
        return{
            times: [
                "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00",
                "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
                "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00"
            ],
            innerEvts: Array,
            currentLine: Object,
            currentInfo: Array,
            currentInfoIndex: 0,
            ttEvtsDisplay: false,
            detailOpen: false,
            screenWidth: 0,
            screenHeight: 0,
            slotHeight: 60,
            bugOffset: 6,
            memsAvas: Array,
            hMems: true,
            startAniDone: false,
            aniSpeed: 540,
            tt_evts_single: {
                opa:1
            },
            tt_evts_detail:{
                opa: 1,
                bottom: -2000,
                scale: "(0.96, 0.96)"
            },
            tt_cover:{
                opa: 0
            },
            tt_evt_switch:{
                opa: 1
            },
            /*events: [
                {
                    allDay: false,
                    end: "2020-02-27,13:0:0",
                    endTS: "1582808400000",
                    endTime: "13:0:0",
                    location: "G.10, Alison House",
                    name: "Lecture Digital Media Studio Project - Lecture",
                    start: "2020-02-27,10:0:0",
                    startTS: "1582797600000",
                    startTime: "10:0:0"
                },
                {
                    allDay: false,
                    end: "2020-02-27,16:0:0",
                    endTS: "1582819200000",
                    endTime: "16:0:0",
                    location: "G.10, Alison House",
                    name: "Tutorial Dynamic Web Design - Lecture",
                    start: "2020-02-27,14:0:0",
                    startTS: "1582812000000",
                    startTime: "14:0:0"
                }
            
            ]*/
        }
    },

    watch:{
        "events": function(val){
            //console.log(val)
            this.renderEvts(val)
        },

        "memsImg": function(val){
            var eevt = this.events
            for (let i=0; i<eevt.length;i++){
                var uinfo = this.matchEvtUImg(eevt[i].uuid, this.memsImg)
                eevt[i].uimg = uinfo.img
                eevt[i].uname = uinfo.name
            }

            this.renderEvts(eevt)
        }
    },

    created(){
        this.currentTime()

        setInterval(()=>{
            this.currentTime()
        }, 60 * 1000)


        this.hMems = this.hasMems == "f" ? false : true,
        this.screenWidth = window.innerWidth,
        this.screenHeight = window.innerHeight

        this.positionToTimeSlot()
        this.renderEvts(this.events)
    
    },

    methods:{
        renderEvts (data) {
            
            if(data){
                var evts = this.parseEvtsTop(data)
                evts = timeProcessing.reConstructDataByTimeSlot(evts)

                this.innerEvts = evts
                this.ttEvtsDisplay = true

                if(data.length == 0){
                    this.$message('No event for today.');
                }

            } else {
                
                this.ttEvtsDisplay = false
            }
        },

        startAni(){
            // Events display animation
            if (!this.startAniDone) {
                this.startAniDone = true

                this.tt_evts_single.opa = 1

                /*this.animate('.tt-evts-single', [
                    { opacity: 0, offset: 1, ease: "ease-in-out" },
                    { opacity: 1, offset: 1, ease: "ease-in-out" },
                ], 600, function () {
                    this.clearAnimation('.tt-evts-single', {}, function () {
                })
                }.bind(this))*/
            }
        },

        parseEvtsTop(data) {
            var res = data
            for(var i = 0; i<res.length; i++) {
                
                res[i].size = timeProcessing.timeToSize(res[i].startTime, res[i].endTime, this.slotHeight)
                if (this.memsImg) {
                    var uinfo = this.matchEvtUImg(res[i].uuid, this.memsImg)
                    res[i].uimg = uinfo.img
                    res[i].uname = uinfo.name
                }

            }
            return res
        },

        matchEvtUImg(target, arr){
            for(let i=0;i<arr.length;i++){
                if(target == arr[i].id){
                    return { name: arr[i].name, img: arr[i].img }
                }
            }

            return { name: null, img: null }
        },

        currentTime () {
            const now = new Date();
            const hour = now.getHours()
            const minute = now.getMinutes()
            //var hour = 10
            //var minute = 0
            const line = timeProcessing.timeToSize(hour+":"+minute, hour+":"+minute, this.slotHeight)
            line.height = 1

            this.currentLine = line

            return
        },

        openDetail(val){

            var data = val

            //const aniSpeed = this.aniSpeed

            if(!Array.isArray(data)){
                data = [val]
            }

            this.detailOpen = true,
            this.currentInfo = data,
            this.currentInfoIndex = 0

            this.tt_evts_detail.opa = 1
            this.tt_evts_detail.bottom = 0
            this.tt_evts_detail.scale = "(1,1)"

            this.tt_cover.opa = 1


            /*this.animate('#tt-evts-detail', [
                { opacity: 0,  bottom: "-2000px", ease: "ease-in-out" },
                { opacity: 1, scale: [0.96, 0.96], bottom: "0px", ease: "ease-in-out" },
                { scale: [1, 1], ease: "ease-in-out" },
            ], aniSpeed, function () {
                this.clearAnimation('#tt-evts-detail', { }, function () {

                })
            }.bind(this))

            this.animate('#tt-cover', [
                { opacity: 0, ease: "ease-in-out" },
                { opacity: 1, ease: "ease-in-out" },
            ], aniSpeed, function () {
                this.clearAnimation('#tt-cover', {}, function () {

                })
            }.bind(this))*/
        

        },

        closeDetail(){
            
            //const aniSpeed = this.aniSpeed
            /*this.animate('#tt-evts-detail', [
                { scale: [1, 1], ease: "ease-in-out" },
                { opacity: 1, scale: [0.96, 0.96], bottom: "0px", ease: "ease-in-out" },
                { opacity: 0, bottom: "-2000px", ease: "ease-in-out" },
            ], aniSpeed, function () {
                this.clearAnimation('#tt-evts-detail', {}, function () {

                })
            }.bind(this))

            this.animate('#tt-cover', [
                { opacity: 1, ease: "ease-in-out" },
                { opacity: 0, ease: "ease-in-out" },
            ], aniSpeed, function () {
                this.clearAnimation('#tt-cover', {}, function () {
                
                })
            }.bind(this))*/

            this.tt_evts_detail.scale = "(0.96,0.96)"
            this.tt_evts_detail.bottom = -2000
            this.tt_evts_detail.opa = 0

            this.tt_cover.opa = 0

            setTimeout(() => {
                this.detailOpen = false,
                this.currentInfo = []
            }, 200)
        },

        // Mutiple Event Detail Popup Controller, next and last
        lastEvt(){
        
            var cii = this.currentInfoIndex

            this.currentInfoIndex = cii - 1

            this.evtSwitchAni()

            return
        },

        nextEvt(){
            var cii = this.currentInfoIndex

            if (cii != this.currentInfo.length - 1) {
                this.currentInfoIndex = cii + 1

            }

            this.evtSwitchAni()

            return
        },

        evtSwitchAni () {

            this.tt_evt_switch.opa = 1

        
            /*this.animate('.tt-evt-switch-ani', [
                { opacity: 0, ease: "ease-in-out" },
                { opacity: 1, ease: "ease-in-out" },
            ], 160, function () {
                this.clearAnimation('#tt-evts-detail', {}, function () {

                })
            }.bind(this))*/
        },

        positionToTimeSlot () {

            var now = new Date();
            now = now.getHours()
            //now = 8
            var posi = 0
            if(now >= 0 && now < 6){
                posi = 6 * this.slotHeight
            } 

            else if(now >= 6 && now < 12){
                posi = 7 * this.slotHeight
            }

            else if (now >= 12 && now < 18) {
                posi = 12 * this.slotHeight
            }

            else{
                posi = 18 * this.slotHeight
            }

            /*scrollTo(0, posi, {
                ease: 'out-bounce',
                duration: 1500
            });*/

            var VueScrollTo = require('vue-scrollto');
 
            var options = {
                container: '#tt-cont',
                easing: 'ease-in',
                offset: -100,
                force: true,
                /*onStart: function(element) {
                // scrolling started
                },
                onDone: function(element) {
                // scrolling is done
                },
                onCancel: function() {
                // scrolling has been interrupted
                },*/
                x: false,
                y: true
            }
            
            VueScrollTo.scrollTo('#tt-evts-current', 200, options)

        },

        // Color related functions
        setColor(index) {

            if(!index){
                index = 0
            }

            const colors = [
                'rgba(2, 119, 249, 1)',
                'rgba(96, 59, 244, 1)',
                'rgba(255, 122, 0, 1)',
                'rgba(8, 201, 85, 1)',
                'rgba(122, 59, 295, 1)',
                'rgba(255, 94, 84, 1)',
                'rgba(241, 193 , 69, 1)'
            ]

            if(!index){
                return colors[0]
            }

            if(index > colors.length){
                index = index % colors.length
            }

            return colors[index];
        },

        getEvtsColor() {
            return "rgba(88, 88, 88, 1)"
        },

        // Name related functions
        setName(str, height) {
            if (!str) {
                return
            }

            var length = Math.floor((height / 60) * 32)

            if (str.length > length){
                str = str.slice(0, length) + "..."
            }

            return str
        },

        limitName(str, length){
            if(!str){
                return
            }
            if (str.length > length) {
                str = str.slice(0, length) + "..."
            }

            return str
        },

        getNamePT(str){
            if(str){
                var tl = Math.ceil(str.length / 28)
                return 18 * (tl + 1)
            }
        }
    }
}
</script>


<style scoped>

#timetable{
    width: 100%;
    height: 100%;
}

.tt-cont{
  position: relative;
  height: 100%;
  overflow-y: scroll;
}

.tt-cover{
  position: fixed;
  background: rgba(0,0,0,0.6);
  width: 100%;
  height: 100%;
  z-index: 9998;
  overflow: hidden;
  top: 0px;
  opacity: 0;
  transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

.tt-time-single{
  /* total need to -1 cause border */
  width: 100%;
  border-bottom: 1px solid rgba(0,0,0,0.1)
}

.tt-time-single-text{
  color: rgba(0,0,0,0.4);
  margin-left: 6px;
  padding-top: 20px;
}

.tt-evts{
  position: absolute;
  top: 0px;
  width: 80%;
  right: 0px;
}

.tt-evts-single{
  position: absolute;
  width: 100%;
  right: 0px;
  color: #ffffff;
}

.tt-evts-single-name{
  margin: 4px;
}

.tt-evts-single-uimg{
  width: 20px;
  height: 20px;
  position: absolute;
  right: 5px;
  bottom: 5px;
}

.avatar{
  width: 40px;
  height: 40px;
  margin-right: 18px;
  overflow: hidden;
  border-radius: 100px;
  font-weight: normal;
}

.avatar-text{
  font-size: 16px;
  font-weight: normal;
  margin-top: 4px;
}

.tt-evts-single-uimg-img{
  width: 40px;
  height: 40px;
}

.tt-evts-single-slot{
  position: absolute;
  width: 90%;
  left: 0px;
  font-size: 12px;
  border-radius: 2px;
}

.tt-evts-current-text{
  position:absolute;
  font-weight: bold;
  font-size: 9px;
  right: 0px;
  margin-top: -20px;
  color: #ffffff;
  padding-left:6px;
  padding-right:6px;
  padding-top: 4px;
  padding-bottom: 4px;
  border-radius: 2px;
  background-color: #F90279;
}

.tt-evts-detail{
  position: fixed;
  bottom: -2000px;
  width: 100%;
  z-index: 9999;
  transition: all 2s cubic-bezier(.25,.8,.25,1);
}

.tt-evts-detail-inner{
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 420px;
  width: 100%;
  background: rgba(255,255,255,1);
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border-top-left-radius:24px;
  border-top-right-radius:24px;
  border-bottom-right-radius:0px;
  border-bottom-left-radius:0px;
  transition: all 2s cubic-bezier(.25,.8,.25,1);
}

.tt-evts-detail-title{
  width: 100%;
  height: 240px;
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  padding-top: 15px;
}

.tt-evts-detail-title-user{
  display: flex;
  padding-top: 18px;
  padding-left: 30px;
}

.tt-evts-detail-title-text{
  margin-left: 30px;
  margin-bottom: 12px;
  word-wrap: auto;
  width: 90%;
  padding-top: 24px;
}

.tt-evts-detail-content{
  padding: 30px;
  font-size: 18px;
  color: #444444;
}

.tt-evts-detail-close{
  width: 100%;
  position: absolute;
  bottom: 900px;
}


.tt-evts-detail-c-s{
  margin-bottom: 20px;
}

.tt-evts-detail-close-icon{
  position: absolute;
  right: 20px;
  margin-top: 40px;
}

.tt-evts-detail-close-icon-img{
  width: 70px;
  height: 70px;
}

.tt-evts-detail-control{
  position: absolute;
  bottom: 30px;
  transform: translate(0, -38%);
  width: 100%;
  display: flex;
}

.tt-evts-d-c-inner{
  margin-left: auto;
  margin-right: auto;
  display: flex;
}

.tt-evts-detail-c{
  width: 80px;
  height: 80px;
  margin-left: 48px;
  margin-right: 48px;
  background: rgba(255,255,255,1);
  box-shadow: 0 3px 6px rgba(0,0,0,0.12), 0 3px 6px rgba(0,0,0,0.18);
  border-radius: 200px;
}

.tt-evts-detail-c:active{
  background: rgba(238,238,238,1);
}

.tt-evts-detail-c-icon{
  width: 44px;
  height: 44px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 19px;
}

.tt-evts-detail-c-icon-img{
  width: 44px;
  height: 44px;
}

.tt-evt-switch-ani{
    transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}




</style>