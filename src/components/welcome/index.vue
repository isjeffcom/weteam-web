<template>
    <div id="home">

        <!--div class="main">
            <span>{{ nihao }}</span>
            <router-link :to="nav">
                <button>start</button>
            </router-link>
        </div-->

        <div class="cont">

            <div class="cont-inner">
                <div class="cont-intro">
                    <span>can help you orginize your schedule with your team by connecting to the calendar account.</span>
                </div>

                <div class="cont-list-single">
                    <div class="cont-list-s-title">
                    </div><span>WE WILL DO</span>

                    <div class="cont-list-s-content">
                        <span>
                            
                            - WE CAN DO <br>
                            - View your own timetable  <br>
                            - View your teammate’s timetable  <br>
                            - Create your own team <br>
                        </span>
                    </div>
                </div>

                <div class="cont-list-single">
                    <div class="cont-list-s-title">
                        <span>WE WILL DO</span>
                    </div>

                    <div class="cont-list-s-content">
                        <span>
                            - Room booking system <br>
                            - Task management<br>
                            - Event or meeting planner <br>
                            - call-board <br> 
                            - Support more schools  <br>
                        </span>
                    </div>
                </div>
            </div>

        </div>
        



        <el-button type="info" plain>start</el-button>


     
   
    </div>
</template>


<script>


export default {
    name: "home",
    components:{

    },
    props:{
        
    },

    data(){
        return{
            nihao: "Welcome page",
            nav: "login",
            input: ''
        }
    },

    created(){

    },

    methods:{
        
    }
}
</script>

<style scoped>
    .main{
        padding: 30px;
    }

    .cont{
        margin-top: 40px;
        margin-left: 40px;
    }

    .cont-list-single{
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .cont-list-s-title{
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 5px;
    }
</style>