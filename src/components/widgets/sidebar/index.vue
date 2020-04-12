<template>
    <div id="sidebar">
        <div id="sidebar-inner">

            <div id="sidebar-logo">
                <img src="../../../assets/logo.png" alt="">
            </div>

            <div id="sidebar-tab">
                <div class="sidebar-tab-s" v-for="(item, index) in tabs" :key="index" v-on:click="clicked(index)">
                    <div class="sidebar-tab-s-icon">
                        <img :src="index == current ? item.icon_selected : item.icon" alt="tab icon">
                    </div>

                    <div class="sidebar-tab-s-text" :style="'color: ' + (index == current ? selectedColor : unselectedColor) + ';'">
                        <span>{{ item.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { EventBus } from '../../../bus'

export default {
    name: "sidebar",
    props:{
        tabs: {
            type: Array
        }
    },

    data(){
        return{
            current: 0,
            height: 0,
            unselectedColor: "#6B717D",
            selectedColor: "#5756B3"
        }
    },

    mounted(){
        var that = this

        const now = this.$router.currentRoute.name
        
        this.tabs.forEach((el, index) => {
            if(now == el.routerName){
                that.current = index
            }
        });
    },

    created(){

    },
    methods:{

        clicked(idx){
            this.current = idx
            EventBus.$emit("sidebar", idx)
        }
    }
}
</script>

<style scoped>
#sidebar{
    position: fixed;
    width: 10%;
    height: 100%;
    min-width: 160px;
    user-select: none;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    background: #fff;
}

#sidebar-logo{
    margin-top: 30px;
    margin-bottom: 60px;
}

#sidebar-logo img{
    width: 120px;
}

#sidebar-inner{
    padding: 20px;
}

.sidebar-tab-s{
    display: flex;
    margin-bottom: 40px;
    cursor: pointer;
}

.sidebar-tab-s-icon{
    width: 30px;
    height: 30px;
}
.sidebar-tab-s-icon img{
    width: 30px;
    height: 30px;
}

.sidebar-tab-s-text{
    margin-top: 4px;
    margin-left: 18px;
    font-size: 20px;
}

</style>