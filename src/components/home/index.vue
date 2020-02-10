<template>
    <div id="home">

        <span class="test">This is the home page</span>
        


        <router-link to="welcome">
            <button>to welcome</button>
        </router-link>
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

        }
    },

    created(){

    },

    methods:{
        
    }
}
</script>

<style scoped>
.test{
    font-size: 44px;
}
</style>