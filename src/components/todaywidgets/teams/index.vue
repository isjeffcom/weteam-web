<template>
    <div id="teams" class="user-widget">
        <div id="team-inner" class="user-widget-inner">
            <div class="user-widget-title">
                <span>TEAMS</span>
            </div>

            <div class="user-widget-more">
                <img src="../../../assets/more.svg" alt="">
            </div>

            <div id="team-list">
                <div class="team-list-s" v-for="(item, index) in renderList" :key="index">
                    <div class="team-list-s-img">
                        <div class="circle" :style="'background:' + color(index)">
                            <div class="team-list-s-img-name">{{ item.name.substring(0,2) }}</div>
                        </div>
                    </div>

                    <div class="team-list-s-name">
                        <span>{{ item.name }}</span>
                    </div>

                    <div class="team-list-s-num">
                        <div style="margin-right:4px;">x{{ item.count }}</div>
                        <img src="../../../assets/man.svg" alt="">
                    </div>
                </div>
            </div>

            
        </div>
    </div>
</template>


<script>
import { getColors } from './color'

export default {
    name: "teams",
    props:{
        list: {
            type: Array,
            default(){
                return[
                    {
                        name: "Dynamic Web Design",
                        count: 4
                    },
                    {
                        name: "Performance Art",
                        count: 2
                    },
                    {
                        name: "DMSP",
                        count: 7
                    },
                ]
            }
        }
    },

    data(){
        return {
            renderList: []
        }
    },

    mounted(){

        // 3 item most
        if(this.list.length > 3){
            this.renderList = this.list.slice(0,2)
        } else {
            this.renderList = this.list
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

.circle{
    width: 40px;
    height: 40px;
    border-radius: 100px;
    text-align: center;
}


#team-list{
    margin-top:16px;
    margin-bottom:24px;
}

.team-list-s{
    display: flex;
    margin-top:18px;
    margin-bottom:18px;
}

.team-list-s-img-name{
    color: #fff;
    font-weight: bold; 
    text-transform: uppercase;
    padding-top: 11px;
}

.team-list-s-name{
    margin-top:12px;
    margin-left: 12px;
}

.team-list-s-num{
    position: absolute;
    display: flex;
    margin-left: 260px;
    margin-top: 8px;
    font-size:10px;
}
</style>