<template>
    <div id="popup">


        <div class="popup-bg" v-on:click="close"></div>

        <div class="popup-cont">
            <div class="popup-inner">
                <input id="taskName" type="text" v-model="taskName"><br>
                <input id="taskstart" type="text" v-model="taskStart"><br>
                <input id="taskEnd" type="text" v-model="taskEnd"><br>
                <input id="taskColor" type="text" v-model="taskColor"><br>
                <button v-on:click="addNew">SUBMIT</button>
            </div>
        </div>


    </div>
</template>

<script>

import { EventBus } from '../../bus'

const request = require('../../request')
const ls = require('local-storage')

export default {
    
    //name: "task",
    components:{

    },
    props:{
        gid: {
            type: Number,
            default: 15
        }
    },

    data(){
        return{
            userId: 16,
            taskName:"task name",
            taskStart:"start date",
            taskEnd:"end date",
            taskColor:"color",
            list: []
        }
    },

    methods:{
        addNew(){
            const postReady = {
                uid: this.userId,
                gid: this.gid,
                taskName: this.taskName,
                taskStart: this.taskStart,
                taskEnd: this.taskEnd,
                taskColor: this.taskColor,
            }

            request.post('/addMyTask', postReady, (res)=>{
                if(res.status){
                    this.close()
                }
            })
        },

        close(){
            EventBus.$emit("popup-close", true)
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

.task-list{
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
}

.task-title{
    font-size: 32px;
    font-weight: bold;
    text-align: left;
    width: 95%;
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
}

.task-list-single{
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

.task-list-single:hover{
    background: #F9F9F9;
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.2);
}

.task-list-single:active{
    background: #E4E4E4;
}

.task-list-s-title{
    font-size: 20px;
    font-weight: bold;
}

.task-list-s-sub{
    font-size: 14px;
    opacity: 0.5;
}

.task-add{
    position: absolute;
    margin-top: -30px;
    right: 30px;
    cursor: pointer;
}
</style>