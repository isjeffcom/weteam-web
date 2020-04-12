<template>
    <div id="titlebar" :style="'position:' + posi + ';'">

        <div id="titlebar-right">

            <div id="titlebar-settings">
                <img src="../../../assets/settings_b.svg" alt="settings" v-if="color == 'black'">
                <img src="../../../assets/settings.svg" alt="settings" v-if="color == 'white'">
            </div>

            <div data-id="tu" id="titlebar-user" v-on:click="menu = !menu">
                <div data-id="tu" id="titlebar-avator">
                    <img data-id="tu" src="../../../assets/default_avatar.png" alt="user avatar">
                </div>
            </div>

            <div data-id="tu" id="titlebar-menu" v-if="menu">
                <div data-id="tu" id="titlebar-menu-s" v-on:click="signout">
                    <span data-id="tu">Sign Out</span>
                </div>
            </div>
        </div>

    </div>
</template>


<script>

import { logout } from '../../../support/util'

export default {
    name: "titlebar",
    props:{
        color: {
            type: String,
            default: "black"
        },
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
            menu: false,
        }
    },

    mounted(){
        addEventListener("click", (e)=>{
            if(e.target.dataset.id != "tu"){
                this.menu = false
            }
            
        })
    },

    methods:{
        signout(){
            // Call global sign out function
            logout()

            // Router to url
            this.$router.push('login')
        }
    }
}
</script>

<style scoped>
#titlebar{
    width: 100%;
    height: 50px;
    padding: 24px;
    background: rgba(255,255,255,0);
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
    right: 100px;
    display: flex;
}

#titlebar-menu{
    position: absolute;
    width: 200px;
    height: 20px;
    padding: 22px;
    text-align: center;
    border-radius: 10px;
    font-weight: bold;
    top: 60px;
    right: -40px;
    background: rgba(255,255,255,1);
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
    cursor:pointer;
}

#titlebar-settings{
    margin-top: 10px;
    margin-right: 30px;
    cursor: pointer;
}

#titlebar-settings img{
    width: 24px;
    height: 24px;
}

#titlebar-avator{
    height: 40px;
    width: 40px;
    border-radius: 100px;
    overflow: hidden;
    cursor: pointer;
}


#titlebar-avator img{
    width: 100%;
    height: 100%;
    object-fit: fill;
}
</style>