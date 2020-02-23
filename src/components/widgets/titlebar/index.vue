<template>
    <div id="titlebar" :style="'position:' + posi + ';'">

        <div id="titlebar-left">
            <div id="titlebar-logo">
                <img src="../../../assets/logo.png" alt="">
            </div>
        </div>

    </div>
</template>


<script>
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
}

#titlebar-logo img{
    width: 120px;
}
#titlebar-left{
    margin-top: 6px;
}
</style>