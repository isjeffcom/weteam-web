<template>

    <div class="calendar">

        <div class="calendar-control" id="calendar-control" :style="'height:' + calendar_control_height + 'px;' + 'opacity:' + calendar_control_opacity + ';'">

            <div class="calendar-control-inner">

                <div class="calendar-control-btn calendar-control-btn-left" v-on:click="lastMonth" :style="'top:' + control_top + 'px;'">
                    <img class="calendar-control-btn-image" src="./assets/left.svg">
                </div>

                <div class="calendar-control-center" :style="'opacity:' + control_center + ';'" >
                    <span>{{ thisTodayStr.year }}-{{ thisTodayStr.month }}</span>
                </div>

                <div class="calendar-control-btn calendar-control-btn-right" v-on:click="nextMonth" :style="'top:' + control_top + 'px;'">
                    <img class="calendar-control-btn-image" src="./assets/right.svg">
                </div>
            
            </div>
        
        </div>

        <div class="calendar-week-indi" id="calendar-week-indi" :style="'margin-top:' + (currentView == 'month' ? '20' : '-6' + 'px')" v-if="currentView == 'month'">
            <div class="calendar-week-indi-inner" :style="'opacity:' + (currentView == 'month' ? '0.2' : '0.4')">

                <div
                    class="calendar-week-indi-s"
                    v-for="(item, index) in weeksStr"
                    :key="index">
                    
                    <span>{{ item }}</span>

                </div>
            </div>
            
        </div>

        <div class="calendar-cont" id="calendar-cont" :style="'height:' + calendar_cont_height + 'px;'">

            <div class="calendar-inner" id="calendar-inner">

                <!-- MONTH VIEW START -->
                <div v-if="currentView == 'month'" class="calendar-inner-in">

                    <div 
                    class="calendar-all"
                    v-for="(item, index) in thisMonth"
                    :key="index"
                    :style="'opacity: ' + (item.isThisMonth ? '1' : '0.3')">

                        <div 
                            class="calendar-slot" 
                            v-on:click="daySelected(item)"
                            v-if="item.isThisMonth && item.d == currentSelected">
                            
                            <div class="calendar-slot-text">
                                <span>{{ item.d }}</span>
                            </div>

                            <div class="calendar-slot-selected" :style="'background:' + selectedColor + ';box-shadow:' + selectedShadow"></div>
                        
                        </div>

                        <div 
                            class="calendar-slot" 
                            v-on:click="daySelected(item)" 
                            v-else>

                            <div>
                                <span>{{ item.d }}</span>
                            </div>
                        </div>

                    </div>
                
                
                </div>
                <!-- MONTH VIEW END -->

                <!-- WEEK VIEW START -->
                <swiper 
                    ref="weekSwiper"
                    v-if="currentView == 'week'"
                    class="calendar-week-swiper"
                    :options="swiperOption">

                    <swiper-slide
                    class="calendar-all-week"
                    id="calendar-all-week"
                    v-for="(item, idx) in thisMonthInWeek"
                    :key="idx">

                        <div 
                        class="calendar-week"
                        v-for="(el, idxx) in item"
                        :key="idxx"
                        :style="'opacity:' + (el.isThisMonth ? '1' : '0.3')">

                            <div 
                            class="calendar-slot"
                            v-on:click="daySelected(el)"
                            v-if="el.isThisMonth && el.d == currentSelected">
                        
                                <div class="calendar-slot-text">
                                    <span style="font-size: 22px;">{{ el.d }}</span>
                                    <br>
                                    <span style="font-size: 12px; font-weight:normal;">{{ weeksStr[idxx] }}</span>
                                </div>

                                <div class="calendar-slot-selected" :style="'background:' + selectedColor + ';box-shadow:' + selectedShadow"></div>
                                
                            </div>

                            <div 
                                class="calendar-slot" 
                                v-on:click="daySelected(el)" 
                                v-else>

                                <div>
                                    <span style="font-size: 22px;">{{ el.d }}</span>
                                    <br>
                                    <span style="font-size: 12px; font-weight:normal;">{{ weeksStr[idxx] }}</span>
                                </div>
                            </div>

                        </div>

                    </swiper-slide>
                </swiper>
                <!-- WEEK VIEW END -->
            
            </div>

        </div>

        <div class="calendar-view-c-b">
            <div class="calendar-view-c-btn" id="calendar-view-c-btn" v-on:click="btnChangeView">
                <img class="calendar-view-c-btn-img" src="./assets/arrow.svg" :style="'transform: rotate(' + viewBtn_Angle + 'deg)'">
            </div>
        </div>

    </div>

</template>

<script>


export default {
    name: "calendar",
    components:{

    },
    props:{
        weekStartMonday: {
            type: Boolean,
            default: true
        },
        initView: {
            type: String,
            default: "month"
        },
        selectedColor:{
            type: String,
            default: "#000000"
        },
        selectedShadow: {
            type: String,
            default: "0px 4px 16px rgba(122, 119, 199, 0.5);"
        }
    },

    data(){
        return{
            weeksStr: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
            thisToday: Object,
            thisTodayStr: Object,
            currentSelected: Number,
            monthSlotNum: 35,
            thisMonth: Array,
            thisMonthInWeek: Array,
            thisYear: Array,
            weekView: Array,
            weekCurrent: 0,
            currentView: "month",
            cvcY: 0,
            cvcYInit: 0,
            cvcOpen: false,
            cvcHeight:28,
            calHeight: 60,
            cc_height_month: "300px",
            cc_height_week: "60px",
            ct_height_month: "32px",
            ct_height_week: "0px",
            viewBtn_Angle: this.initView == 'mouth' ? 180 : 0,
            calendar_cont_height: 250,
            calendar_control_height: 32,
            calendar_control_opacity: 1,
            control_top: 0,
            control_center: 1,
            swiperOption: {
                initialSlide: 0,
                preventDefault: false,
                threshold: 10
            }
        }
    },

    computed: {
      swiper() {
        if(this.mode == "week"){
            return this.$refs.weekSwiper.swiper
        } else {
            return null
        }
        
      }
    },

    mounted() {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      //console.log('this is current swiper instance object', this.swiper)
      //this.swiper.slideTo(3, 1000, false)
    },

    created(){
        this.cvcY = -15

        // Start
        var today = this.getToday()
        this.renderDate(today)

        setTimeout(() => {
            // Init View
            if (this.currentView != this.initView) {
                this.toView(this.initView)
                this.currentView = this.initView
            }
        }, 880)

    },

    
    methods:{
        // Render Functions
        renderDate(date){

            // Receive date obj: day, month, year, weekday
            
            var monthDay = this.getMonthDay(date.month, date.year)
            var wholeMonth = this.generateMonthArr(monthDay)
            // Return arr[0]: date, arr[1]: weekday
            var thisMonth = this.fillWeekday(date.year, date.month, date.day, date.week, wholeMonth)
            var thisMonthInWeek = this.convertToWeekArr(thisMonth)
            //var currentWeekCount = this.idCurrentWeek(date, thisMonthInWeek)
            
            var thisTodayStr = {
                year: date.year,
                month: this.constMonthStr(date.month),
            }

            this.thisToday = date
            this.thisMonthInWeek = thisMonthInWeek
            this.thisTodayStr = thisTodayStr
            this.thisMonth = thisMonth
            //currentWeekCount: currentWeekCount,
            this.currentSelected = date.day
        

            return
        },

        idCurrentWeek(day, arr){
            for(let i=0;i<arr.length;i++){
                for(let ii=0;ii<arr[i].length;ii++){
                    if(day == arr[i][ii].d && arr[i][ii].isThisMonth){
                        return i
                    }
                }
            }

            return false
        },

        convertToWeekArr(data){
        var arr = []
        var tmp = []
        // Generate Week Count for week view
        for (let i = 0; i < data.length; i++) {
            if(tmp.length >= 6){
            tmp.push(data[i])
            arr.push(tmp)
            tmp = []
            } else {
            tmp.push(data[i])
            }
        }
        return arr
        },

        fillWeekday(year, month, today, weekday, all){

            var res = []

            // Get first and end weekday
            var monthSE = this.getFirstAndEndWeekday(today, weekday, all)

            // Generate all days
            for(var i=0;i<all.length;i++){
                var wd = (monthSE.first + i) % 7
                var tmp = { d: all[i], w: wd, y: year, m: month, isThisMonth: true}
                res.push(tmp)
            }

            // Fill begin and end
            // Fill begin (last month)
            if(monthSE.start != 1){
                var lT = monthSE.start == 0 ? 6 : (6 - (6 - monthSE.first))-1

                var lastMonthDay = this.getMonthDay(month-1, year)

                for (let i = 0; i < lT; i++) {
                    var tps = { d: lastMonthDay - i, w: (monthSE.first - (i + 1)) % 7, y: year, m: month, isThisMonth: false }
                    res.unshift(tps)
                }
            }
        
            // Fill end (next month)
            if(monthSE.end != 0){
                // if is Sunday fo nothing, else get rest
                var sT = monthSE.end == 0 ? 0 : (6 - monthSE.end) + 1
                for (let i = 0; i < sT; i++) {
                var tpe = { d: i + 1, w: (monthSE.end + (i + 1)) % 7, y: year, m: month, isThisMonth: false }
                res.push(tpe)
                }
            }
            return res
        },

        // Control Functions
        nextMonth () {
            if(this.currentView == "month"){
                const n = this.thisToday

                if(n.month == 11){
                    n.year = n.year + 1
                    n.month = 0
                } else {
                    n.month = n.month + 1
                }

                var checkIfDayExist = this.getMonthDay(n.month, n.year)
                if (n.day >= checkIfDayExist) {
                    n.day = checkIfDayExist
                }
                
                this.renderDate(this.getToday(n))
            } else {
                this.$refs.weekSwiper.swiper.slideNext()
            }

            
        },

        lastMonth() {
            if(this.currentView == "month"){
                const n = this.thisToday
            
                if(n.month == 0){
                    n.year = n.year - 1
                    n.month = 11
                } else {
                    n.month = n.month - 1
                }

                var checkIfDayExist = this.getMonthDay(n.month, n.year)
                if (n.day > checkIfDayExist) {
                    n.day = checkIfDayExist
                }
                
                this.renderDate(this.getToday(n))
            } else {
                this.$refs.weekSwiper.swiper.slidePrev()
            }
            
        },

        cvcChange (e) {
        var cP = e.detail.y

        if (!this.cvcOpen){
            if (this.currentView == "month" && cP < -25) {
                this.toView("week")
            }

            if (this.currentView == "week" && cP > -10) {
                this.toView("month")
            }
        }

        },

        setCVC(bol){
            this.cvcOpen = bol
            this.cvcY = -15
        },

        btnChangeView(){


            this.toView()

            this.viewBtn_Angle = this.currentView == "week" ? 0 : 180

        
        },

        toView(mode){

            if (!mode){
                mode = this.currentView == "week" ? "month" : "week"
            }

            this.setCVC(true)

            //console.log(calContainer, calControl)
            

            if(mode == "week"){
                
                var currentWeekCount = this.idCurrentWeek(this.currentSelected, this.thisMonthInWeek)
                this.currentWeekCount = currentWeekCount,
                this.swiperOption.initialSlide = this.currentWeekCount

                this.toViewAni(true)
            }

            if(mode == "month"){
                this.toViewAni(false)
            }


            this.currentView = mode
            
        },

        toViewAni(bol){
        
            this.calendar_cont_height = bol ? 80 : 250
            this.calendar_control_height = bol ? 4 : 32
            this.control_top = bol ? 36 : 0
            this.control_center = bol ? 0 : 1

        },

        daySelected: function(val){

            if(!val.isThisMonth){
                return false
            }

            var res = {
                day: val.d,
                month: parseInt(val.m) + 1,
                week: val.w,
                year: val.y,
            }


            this.currentSelected = res.day

            this.$emit('day', res);
            //this.triggerEvent('onDayTap', res)

            return res
        },

        // Basic Functions
        getFirstAndEndWeekday(today, weekday, all) {
            var firstWeekday = 0
            var endWeekday = 0

            if (today == 1) {
                firstWeekday = weekday
            } else {
                var ftt = today
                if (today - weekday < 0) {
                ftt = today + 7
                }

                firstWeekday = (ftt - weekday) % 7
                firstWeekday = 7 - firstWeekday

                if(this.weekStartMonday){
                firstWeekday = firstWeekday + 1
                }
            }

            endWeekday = (weekday + (all.length - today)) % 7
            endWeekday = endWeekday == 0 ? 0 : endWeekday
            return { first: firstWeekday, end: endWeekday }
        },

        getToday(val){
            var date
            // val = { year: Num, month: Num, day: Num }
            if(val){
                date = new Date(val.year, val.month, val.day)
            } else {
                date = new Date()
            }

            return {
                day: date.getDate(),
                week: date.getDay(),
                month: date.getMonth(),
                year: date.getFullYear()
            }

        },

        getMonthDay(month, year){
            // month is start from 1
            var totalDay = 0
            
            if(month == 1){
                // If is Feb, others is normal
                if(this.leapYear(year)){
                totalDay = 29
                } else {
                totalDay = 28
                }
            } else {
                totalDay = this.matchMonth(month)
            }
            return totalDay
        },

        matchMonth(month){
            // do not pass 1, feb
            var day = 30
            
            const m31 = [1, 3, 5, 7, 8, 10, 12]

            for(var i=0;i<m31.length;i++){
                if(month + 1 == m31[i]){
                day = 31
                return day
                }
            }

            return day
        },

        generateMonthArr(total){

            total = parseInt(total)

            var arr = []
            for(var i=0;i<total;i++){
                arr.push(i+1)
            }
            return arr
            },

            leapYear(year){
            return((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
            },

            constMonthStr(str){
            return str+1 > 9 ? str + 1 : "0" + (str + 1)
        }
    }
    
}
</script>

<style scoped>
/* component/ncalendar/ncalendar.wxss */

.calendar{
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  background: #F8F9FC;
  border-top-left-radius:0px;
  border-top-right-radius:0px;
  border-bottom-right-radius:10px;
  border-bottom-left-radius:10px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.05);
  z-index: 100;
  user-select: none;
}

.calendar-cont{
    transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

.calendar-control{
  height: 32px;
  padding-top: 16px;
  margin-bottom: 20px;
  transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

.calendar-control-inner{
    display: flex;
    width: 100%;
}

.calendar-control-btn{
  position: relative;
  cursor: pointer;
  transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

.calendar-control-btn-image{
  width: 20px;
  height: 20px;
  opacity: 0.35;
}

.calendar-control-btn-left{
  left: 40px;
}

.calendar-control-btn-right{
  right: 40px;
}

.calendar-control-center{
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-weight: bold;
  transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

.calendar-week-indi{
  width: 100%;
}

.calendar-week-indi-inner{
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  text-align: center;
  font-weight: bolder;
  font-size: 12px;
}

.calendar-week-indi-s{
  width: calc(100%/7);
}

.calendar-cont{
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.calendar-inner{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
}

.calendar-inner-in{
    width: 80%;
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    z-index:1;
}

.calendar-all{
  margin-top: 2px;
  width: calc(100%/7);
  text-align: center;
  cursor: pointer;
}

.calendar-week{
  margin-top: 14px;
  width: calc(100%/7);
  cursor: pointer;
}

.calendar-slot{
  text-align: center;
  font-weight: bolder;
  height: 48px;
}

.calendar-slot-text{
  color: #ffffff;
  z-index:10;
}

.calendar-slot-selected{
    position: relative;
    width: 51px;
    height: 64px;
    border-radius: 10px;
    margin-top: -52px;
    margin-left: auto;
    margin-right: auto;
    z-index: -1;
}

.calendar-view-contoller{
  display: block;
  position: relative;
  width: 100%;
  height: 80px;
  margin-top: 40px;
}

.calendar-view-contoller-cont{
  width: 100%;
  height: 80px;
  padding-top: 30px;
}

.calendar-view-contoller-box{
  width: 80px; 
  height: 12px; 
  border-radius: 200px; 
  margin-left: auto;
  margin-right: auto;
  background: rgba(0, 0, 0, 0.3);
}

.calendar-week-swiper{
  height: 100px;
  width: 80%;
}

.calendar-all-week{
  display: flex;
  overflow: hidden;
}

.calendar-view-c-b{
  width: 100%;
  height: 55px;
}

.calendar-view-c-btn{
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  opacity: 0.1;
  text-align: center;
  height: 50px;
  
}

.calendar-view-c-btn-img{
  width: 50px;
  cursor:pointer;
  transition: all 0.88s cubic-bezier(.25,.8,.25,1);
}
</style>