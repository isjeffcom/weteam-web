<template>
    <div id="home">

        <div class="main">

                <span>{{ nihao }}</span>
                <router-link :to="nav">
                    <button>start</button>
                </router-link>

            <div style="margin-top: 40px"> <font size ="3" color="red">can help you orginize your schedule with your team by connecting to the calendar account. </font></div>

            <div style="margin-top: 40px"> <font size ="4" color="black">WE CAN DO </font> </div>
        
            <div style="margin-top: 20px"> <font size ="3" color="black"> - View your own timetable </font> </div>
            
            <div style="margin-top: 20px"> <font size ="3" color="black"> -View your teammate’s timetable </font> </div>

            <div style="margin-top: 20px"> <font size ="3" color="black"> - Create your own team </font> </div>

            <div style="margin-top: 40px"> <font size ="4" color="black">WE WILL DO </font> </div>

            <div style="margin-top: 20px"> <font size ="3" color="black"> - Task management </font> </div>
            
            <div style="margin-top: 20px"> <font size ="3" color="black"> - Event or meeting planner </font> </div>

            <div style="margin-top: 20px"> <font size ="3" color="black"> - Room booking system </font> </div>


            <el-button type="info" plain>start</el-button>




        </div>
     <el-input v-model="input" placeholder="hello"></el-input>
   
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
</style>