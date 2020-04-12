<template>
    <div id="group">

        <div class="group-title">
            <span>All Groups</span>
        </div>

        <div class="group-add">
            <span style="color:#0277F9" v-on:click="toNew"> + NEW </span>
        </div>
        
        <div class="group-list">

            <div class="group-list-single" v-for="(item, index) in list" :key="index" v-on:click="toDetail(item.id, item.name, item.code, item.open)">
                <span class="group-list-s-title">{{item.name}}</span><br>
                <span class="group-list-s-sub">{{ item.members.split(",").length}} members</span>
            </div>
        </div>

        <div class="page-bg">
            <img src="../../assets/bg_grouplist.png" width="100%">
        </div>

    </div>
</template>

<script>

import { EventBus } from '../../bus'

const request = require('../../request')
const ls = require('local-storage')

export default {
    name: "group",
    components:{

    },
    props:{

    },

    data(){
        return{
            list: []
        }
    },

    // Fire When Page Init
    created(){

        if(!ls.get("login_name") && !ls.get("login_token")){
            this.$router.push('login')
            return
        }

        this.getList(ls.get("login_uuid"))
        EventBus.$emit("showSidebar", true)

    },

    methods:{
        getList(userId){

            const postReady = [
                {
                    name: "id",
                    val: userId
                }
            ]

            request.get('/group', postReady, (res)=>{
                this.list = res.data.data
            })
        },

        toDetail(id, name, code, open){
            this.$router.push({name: "groupDetail", query: { id: id, name: name, code: code, open: open }})
        },

        toNew(){
            this.$router.push({name: "newGroup"})
        }
    }
}
</script>


<style scoped>



.single{
    margin-top: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(0,0,0,0.5);
}

.group-list{
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
}

.group-title{
    font-size: 32px;
    font-weight: bold;
    text-align: left;
    width: 200px;
    background: #5756B3;
    color: #fff;
    padding: 10px;
    margin-top: 30px;
    margin-left: 40px;
}

.group-list-single{
    background: #FFFFFF;
    border: 0.5px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    margin-right: 20px;
    width: 280px;
    height: 48px;
    border-radius: 8px;
    margin-bottom: 20px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

.group-list-single:hover{
    background: #F9F9F9;
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.2);
}

.group-list-single:active{
    background: #E4E4E4;
}

.group-list-s-title{
    font-size: 20px;
    font-weight: bold;
}

.group-list-s-sub{
    font-size: 14px;
    opacity: 0.5;
}

.group-add{
    position: absolute;
    margin-top: -30px;
    right: 30px;
    cursor: pointer;
}
</style>