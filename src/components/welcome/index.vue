<template>
    <div id="home">

        <div class="main">
            <span>{{ nihao }}</span>
            <router-link :to="nav">
                <button>start</button>
            </router-link>
        </div>
        
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
            nav: "login"
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