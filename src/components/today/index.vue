<template>
    <div id="today">

        <div id="today-top">
            <img src="../../assets/today_bg.png" alt="background">
        </div>

        <div id="today-date">
            <div style="font-size: 30px;">Today</div>
            <div>{{todayDate()}}</div>
        </div>

        <div id="today-main">

            <div class="today-row">
                <div class="today-m-s">
                    <user :email="uemail" :name="uname"></user>
                </div>

                <div class="today-m-s"  :style="'animation-delay: 0.1s;'">
                    <userdata></userdata>
                </div>

                <div class="today-m-s"  :style="'animation-delay: 0.2s;'">
                    <teams></teams>
                </div>

                <div class="today-m-s"  :style="'animation-delay: 0.3s;'">
                    <roles></roles>
                </div>
            </div>

            <div class="today-row">
                <div class="today-m-s"  :style="'animation-delay: 0.4s;'">
                    <due></due>
                </div>

                <div class="today-m-s"  :style="'animation-delay: 0.5s;'">
                    <thisweek></thisweek>
                </div>

                <div class="today-m-s"  :style="'animation-delay: 0.5s;'">
                    <teammates></teammates>
                </div>

                
            </div>

            <div class="today-row">
                <div class="today-m-s"  :style="'animation-delay: 0.5s;'">
                    <workload></workload>
                </div>

                <div class="today-m-s"  :style="'animation-delay: 0.5s;'">
                    <assist></assist>
                </div>
            </div>
            

        </div>

        
    </div>
</template>

<script>

import user from '../todaywidgets/user'
import userdata from '../todaywidgets/userdata'
import teams from '../todaywidgets/teams'
import roles from '../todaywidgets/roles'
import due from '../todaywidgets/due'
import thisweek from '../todaywidgets/thisweek'
import teammates from '../todaywidgets/teammates'
import workload from '../todaywidgets/workload'
import assist from '../todaywidgets/assist'

import ls from 'local-storage'

export default {
    name: "today",
    components:{
        user,
        userdata,
        teams,
        roles,
        due,
        thisweek,
        teammates,
        workload,
        assist
    },
    data(){
        return{
            uemail: "",
            uname: ""
        }
    },
    created(){
        this.uemail = ls.get("login_snum")
        this.uname = ls.get("data_n")
    },
    methods:{
        todayDate(){
            const monthNames = ["January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"
                                ]
            
            const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Firday", "Saturday"]

            let d = new Date()
            return weekdays[d.getDay()] + ", " + d.getDate() + " " + monthNames[d.getMonth()]
        }
    }
}
</script>

<style scoped>

@keyframes popup {
    0% {transform: scale(0,0);opacity:0}
    100% {transform: scale(1,1);opacity: 1;}
}

#today-top{
    position: absolute;
    width: 90%;
    margin-left: 10%;
    top: 0px;
    left: 0px;
    z-index: -1;
    color: #494E59;
}

#today-top img{
    width: 100%;
}

#today-date{
    margin-left: 60px;
    color: #ffffff;
    font-size: 22px;
    font-weight: bold;;
}

#today-main{
    display: flex;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
}

.today-row{
    margin-right: 50px;
}

.today-m-s{
    width: 320px;
    margin-top: 20px;
    margin-bottom: 20px;
    opacity: 0;
    animation-name: popup;
    animation-duration: 0.5s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
}



</style>