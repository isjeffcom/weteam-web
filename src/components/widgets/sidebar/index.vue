<template>
    <div id="sidebar">
        <div id="sidebar-inner">
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
            unselectedColor: "#000000",
            selectedColor: "#0277F9"
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
        //console.log(this.current)

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
    width: 100%;
    user-select: none;
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
    width: 100%;
    height: 100%;
}

.sidebar-tab-s-text{
    margin-top: 6px;
    margin-left: 18px;
    font-size: 20px;
}

</style>