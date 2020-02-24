<template>
    <div id="titlebar" :style="'position:' + posi + ';'">

        <div id="titlebar-left">
            <div id="titlebar-logo">
                <img src="../../../assets/logo.png" alt="">
            </div>
        </div>

        <div id="titlebar-right">
            <div id="titlebar-logout">
                <el-button type="text" v-on:click="logout">Logout</el-button>
            </div>
        </div>

    </div>
</template>


<script>

const util = require('../../../support/util')
export default {
    name: "titlebar",
    props:{
        posi: {
            type: String,
            default: "relative"
        },

        mode: {
            type: String,
            default: "center"
        }
    },

    data(){
        return{

        }
    },

    created(){

    },

    methods:{
        logout(){
            util.logout()
            this.$router.push('login')
        }
    }
}
</script>

<style scoped>
#titlebar{
    width: 100%;
    height: 30px;
    padding: 24px;
    background: rgba(255,255,255,1);
    border-bottom: 1px solid rgba(0,0,0,0.08);
    display: flex;
}

#titlebar-logo img{
    width: 120px;
}
#titlebar-left{
    margin-top: 6px;
}

#titlebar-right{
    position: absolute;
    right: 60px;
}
</style>