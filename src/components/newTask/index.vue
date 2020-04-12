<template>
    <div id="newtask">


        <div class="popup-bg" v-on:click="close"></div>

        <div class="popup-cont">
            <div class="popup-inner">
                <div class="popup-title">
                    <span>New Task</span>
                </div>

                <div class="popup-s popup-select" v-if="mode == 'new'">
                    <select v-model="setGid" :disabled="gid != 'null'">
                        <option v-for="item in allGroups" :key="item.id" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>

                <div class="popup-s popup-input">
                    <input id="taskName" type="text" v-model="taskName" placeholder="Description">
                </div>

                <div class="popup-s popup-more-content" style="margin-top:20px;">
                    <div class="popup-more-btn" v-if="!addDue" v-on:click="addDue = true">
                        <span>+ Due Date</span>
                    </div>

                    <div class="pop-more-hidden" v-else>
                        <datepicker format="yyyy-MM-dd" v-model="taskEnd" input-class="dp-overwrite" placeholder="Select a date"></datepicker>
                    </div>
                </div>

                <div class="popup-s popup-more-content">
                    <div class="popup-more-btn" v-if="!addLabel" v-on:click="addLabel = true">
                        <span>+ Colour Label</span>
                    </div>

                    <div class="pop-more-hidden tasks-new-label-picker" v-else>

                        <div 
                            class="tasks-label-s" 
                            v-for="(item, idx) in labelColors" 
                            :key="idx"
                            :data-c="item"
                            :style="'background:' + item + ';border: ' + (item == selectedLabel ? '3px solid #333' : '3px solid rgba(0,0,0,0)')"
                            v-on:click="selectLabel(item)">
                        </div>

                    </div>
                </div>

                <div class="popup-submit">
                    <button v-on:click="mode == 'new' ? addNew() : editTask()">SUBMIT</button>
                    <button v-on:click="deleteTask()" v-if="mode == 'edit'" style="background:#F24C4C;">DELETE</button>
                </div>
                
            </div>
        </div>


    </div>
</template>

<script>

import { EventBus } from '../../bus'
import Datepicker from 'vuejs-datepicker'

import { checkFilled } from '../../util'

const request = require('../../request')
const ls = require('local-storage')

export default {
    
    name: "newtask",
    components:{
        Datepicker
    },

    props:{
        gid: {
            type: String,
            default: "null"
        },

        d: {
            type: Object,
            val: {}
        }
    },

    data(){
        return{
            mode: "new",
            api_glist: "/group",
            api_edit: "/editTask",
            api_add: "/addMyTask",
            api_del: "/deleteTask",
            setGid: null,
            allGroups: [],
            addDue: false,
            addLabel: false,
            userId: null,
            taskGid: null,
            taskId: "",
            taskName:"",
            taskStart:"",
            taskEnd: "",
            taskState: "",
            selectedLabel: "",
            labelColors: [
                "#F24C4C",
                "#FF7A00",
                "#1DDB8B",
                "#603BF4",
                "#F90279",
                "#0277F9",
                "#25FFCB"
            ],
            list: []
        }
    },

    created(){

        
        this.userId = ls.get("login_uuid")

        if(this.d){

            this.mode = "edit"
            this.taskId = this.d.id
            this.taskName = this.d.des
            this.taskStart = this.d.startDate 
            this.taskEnd = this.d.endDate
            this.taskMembers = this.d.members
            this.selectedLabel = this.d.color
            this.taskState = this.d.state

            this.addLabel = this.selectedLabel.indexOf("#") == -1 ? false : true
            this.addDue = this.d.endDate == "0000-00-00" ? false : true

            this.setGid = this.gid

            

        } else {

            this.mode = "new"

            if(this.gid != "null"){
                this.setGid = this.gid
            }

            this.getAllGroups()

        }
    },

    methods:{
        addNew(){

            const postReady = {
                uid: this.userId,
                gid: this.setGid,
                taskName: this.taskName,
                taskStart: this.taskStart,
                taskEnd: this.taskEnd,
                taskColor: this.selectedLabel == "" ? "null" : this.selectedLabel,
            }

            if(!checkFilled(postReady, ["taskStart", "taskEnd"])){
                alert("Please fill task description and/or select a group")
                return
            }

            request.post(this.api_add, postReady, (res)=>{
                if(res.status){
                    EventBus.$emit("task-added", true)
                    this.$nextTick(()=>{
                        this.close()
                    })
                    
                }
            })
        },

        editTask(){

            const postReady = {
                uid: this.userId,
                taskId: this.taskId,
                gid: this.setGid,
                taskName: this.taskName,
                taskStart: this.taskStart,
                taskEnd: this.taskEnd,
                taskMembers: this.taskMembers,
                taskColor: this.selectedLabel == "" ? "null" : this.selectedLabel,
                taskState: this.taskState
            }

            if(!checkFilled(postReady, ["taskStart", "taskEnd"])){
                alert("Please fill task description and/or select a group")
                return
            }


            request.post(this.api_edit, postReady, (res)=>{
                if(res.status){
                    EventBus.$emit("task-added", true)
                    this.$nextTick(()=>{
                        this.close()
                    })
                }
            })
        },

        deleteTask(){
            const postReady = {
                uid: this.userId,
                gid: this.setGid,
                taskId: this.taskId,
            }

            request.post(this.api_del, postReady, (res)=>{
                if(res.status){
                    EventBus.$emit("task-added", true)
                    this.$nextTick(()=>{
                        this.close()
                    })
                }
            })
        },

        selectLabel(val){
            this.selectedLabel = String(val)
        },

        getAllGroups(){

            const postReady = [
                {
                    name: "id",
                    val: this.userId
                }
            ]

            request.get(this.api_glist, postReady, (res)=>{
                this.allGroups = res.data.data
            })

        },

        close(){
            EventBus.$emit("popup-close", true)
        },

        now(){
            let now = new Date()
            let yy = now.getFullYear()
            let m = now.getMonth() + 1
            let d = now.getDate()
            let mm = m < 10 ? '0' + m : m 
            let dd = d < 10 ? '0' + d : d
            return new Date(yy + ',' + mm + ',' + dd)
        }
    }
}
</script>


<style scoped>



.popup-inner{
    position: fixed;
    padding: 24px;
}

.popup-title{
    font-size: 24px;
    font-weight: bold;
}

.popup-s{
    margin-top: 14px;
    margin-bottom: 14px;
}

.popup-submit{
    position: absolute;
    width: 90%;
    bottom: 20px;
}

.popup-more-content{
    color: #808080;
    cursor: pointer;
}

.tasks-new-label-picker{
  width: 100%;
  height: 30px;
  display: flex;
}

.tasks-label-s{
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 4px;
  cursor: pointer;
}

</style>