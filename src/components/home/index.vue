<template>
    <div id="home">
        <div id="home-calendar">
            <calendar initView="week"></calendar>
        </div>

        <div id="home-timetable">
            <timetable></timetable>
        </div>
        
    </div>
</template>

<script>

import calendar from '../widgets/calendar'
import timetable from '../widgets/timetable'

export default {
    name: "home",
    components:{
        calendar,
        timetable
    },
    data(){
        return{

        }
    },
    created(){

    }
}
</script>

<style scoped>
#home-timetable{
    height: 500px;
}
</style>