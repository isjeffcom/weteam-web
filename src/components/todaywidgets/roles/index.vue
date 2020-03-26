<template>
    <div id="roles" class="user-widget">
        <div id="roles-inner" class="user-widget-inner">

            <div class="user-widget-title">
                <span>ROLES</span>
            </div>


            <div class="user-widget-more">
                <img src="../../../assets/more.svg" alt="more">
            </div>

            <div id="roles-main">
                <div class="roles-m-s" v-for="(item, index) in tags" :key="index" :style="'background:' + color(index).bg + ';color:' + color(index).txt + ';'">
                    <div>{{ item }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getColors } from './color'

export default {
    name: "roles",
    props:{
        tags:{
            type: Array,
            default(){
                return ["Designer", "Project Manager"]
            }
        }
    },
    methods:{
        color(idx){
            return getColors(idx)
        }
    }
}
</script>

<style scoped>
#roles-main{
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
}

.roles-m-s{
    text-align: center;
    padding: 10px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 100px;
}
</style>