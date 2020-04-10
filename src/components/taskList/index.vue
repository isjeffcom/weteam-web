<template>
    <div id="task">

        <div class="task-title">
            <span>{{ gname ? gname : "My Task" }}</span>
        </div>

        <div class="task-add">
            <span style="color:#0277F9" v-on:click="toNew()"> + NEW </span>
        </div>
        
        <div class="task-list">

            <div class="task-list-states" v-for="(si, idx) in states" :key="si.s" :style="'width:' + (idx == selectedState ? 80 : 20) + '%;'">

                <div 
                    class="task-list-state-tab" 
                    :style="'opacity:' + (idx == selectedState ? 1 : 0.4)"
                    v-on:click="switchState(idx)">
                    {{ si.n }}
                </div>

                <div class="task-list-states-inner">

                    <div class="task-list-single" v-for="(item, index) in list[idx]" :key="index">

                        <div class="task-ls-label">
                            <div :style="'height: 100%; background:' + (item.color == '' ? '' : item.color)"></div>
                        </div>

                        <div class="task-ls-info">
                            <div class="task-list-sgroup">
                                <span>{{ item.groupName }}</span>
                                <hr>
                            </div>

                            <div class="task-list-s-title">
                                <div class="circle task-list-s-done" v-on:click="getItDone(item)"></div>
                                <div>{{item.des}}</div>
                            </div>

                            <div class="task-list-s-sub" v-show="item.endDate != '0000-00-00'">
                                <hr style="opacity: 0.5;">
                                <span class="task-list-s-sub" :style="'color:' + (checkDate(item.endDate) ? '#96A0B4' : '#F24C4C')">Due: {{item.endDate}}</span>
                            </div>
                        </div>

                        <div class="task-ls-edit" v-on:click="toEdit(item)">
                            <div class="task-ls-edit-inner">···</div>
                        </div>

                    </div>
                </div>

                
            </div>

        </div>

        <newTask id="newTask" :gid="String(gid)" v-if="newPopup"></newTask>
        <newTask id="editTask" :gid="String(gid)" :d="selected" v-if="editGroup"></newTask>

    </div>
</template>

<script>
import newTask from '../newTask'
import { EventBus } from '../../bus'

const request = require('../../request')
const ls = require('local-storage')

export default {
    
    //name: "task",
    components:{
        newTask
    },

    data(){
        return{
            api_group: '/groupTask',
            api_user: '/task',
            api_edit: '/editTask',
            states: [
                { n: "To Do", s: 0}, 
                { n: "Done", s: 1}, 
            ],
            userId: null,
            gname: "",
            gid: null,
            list: [],
            selected: {},
            selectedState: 0,
            newPopup: false,
            editGroup: false,
            mode:"group"
        }
    },

    mounted(){
        this.userId = ls.get("login_uuid")

        // If enter from group
        if(this.$route.query.id && this.$route.query.name){
            this.mode = "group"
            this.gid = this.$route.query.id
            this.gname = this.$route.query.name
        } else {
            // If enter from sidebar tasks
            this.mode = "user"
        }

        this.refresh()

        
        
    },

    // Fire When Page Init
    created(){
        // Close window
        EventBus.$on("popup-close", ()=>{
            this.newPopup = false
            this.editGroup = false
        })

        // Add Task Finished
        EventBus.$on("task-added", ()=>{
            this.refresh() 
        })

    },

    methods:{

        refresh(){
            if(this.mode == "group") {
                this.getList(this.api_group, this.userId, this.gid)
            }

            if(this.mode == "user") {
                this.getList(this.api_user, this.userId)
            }
        },
        getList(api, userId, gid){

            const postReady = [
                {
                    name: "uuid",
                    val: userId
                },

                {
                    name: "id",
                    val: userId
                }
            ]

            if(gid){
                postReady.push({
                    name: "gid",
                    val: gid
                })
            }


            request.get(api, postReady, (res)=>{
                if(res.status){
                    let all = res.data.data
                    let ready = [[], []]
                    let ginfo

                    if(this.mode == "user"){
                        ginfo = res.data.groupData
                    }


                    all.forEach((el,index) => {
                        
                        if(this.mode == "user"){
                            el.groupName = this.findGroupName(el.gid, ginfo)
                        } else {
                            el.groupName = this.gname
                        }
                        
                        if(el.state == 0){
                            ready[0].push(el)
                        }

                        else if(el.state == 1){
                            ready[1].push(el)
                        }

                        if(index == all.length - 1){
                            this.list = ready

                        }
                    });
                }
                
            })
        },

        
        getItDone(obj){


            const postReady = {
                uid: this.userId,
                taskId: obj.id,
                gid: obj.gid,
                taskName: obj.des,
                taskStart: obj.startDate,
                taskEnd: obj.endDate,
                taskMembers: obj.members,
                taskColor: obj.color,
                taskState: obj.state == 1 ? 0 : 1
            }

            request.post(this.api_edit, postReady, (res)=>{
                if(res.status){
                    this.refresh()
                }
            })
            
        },

        toEdit(obj){
            this.selected = obj
            this.editGroup = true
            this.gid = obj.gid
        },

        switchState(val){
            this.selectedState = val
        },

        findGroupName(target, arr){
            let res = ""
            for(let i=0;i<arr.length;i++){
                if(target == arr[i].id){
                    res = arr[i].name
                }
            }

            return res
        },

        checkDate(due){
            // Due
            let d = new Date(due)

            // Current
            let c = new Date()

            if(d < c){
                return false
            } else {
                return true
            }
        },


        toNew(){
            if(this.mode == "user"){
                this.gid = "null"
            }
            this.newPopup = true
        }
    }
}
</script>


<style scoped>

.circle{
    width: 16px;
    height: 16px;
    border: 1px solid #96A0B4;
    border-radius: 100px;
    background: #ffffff;
    transition: all 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.circle:hover{
    background: #0DD681;
    border: 1px solid #0DD681;
}

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
    padding-bottom: 100px;
    display: flex;
    flex-wrap: wrap;
}

.task-list-states{
    transition: all 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.task-list-states-inner{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    border-right:1px solid rgba(0, 0, 0, 0.1)
}

.task-list-s-done{
    margin-top: 2px;
    margin-right: 6px;
}

.task-list-state-tab{
    margin-bottom:10px; 
    font-weight:bold; 
    cursor: pointer;
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
    height: 120px;
    border-radius: 2px;
    margin-bottom: 20px;
    cursor: pointer;
    display: flex;
    transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

.task-list-single:hover{
    background: #F9F9F9;
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.2);
}

.task-list-single:active{
    background: #E4E4E4;
}

.task-ls-info{
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 12px;
    padding-bottom: 8px;
}

.task-ls-label{
    height: 100%;
    width: 4px;
}

.task-list-s-title{
    display: flex;
    height: 50px;
    margin-top: 12px;
    font-size: 20px;
    font-weight: bold;
}

.task-list-s-sub{
    margin-top:4px;
    font-size: 12px;
}

.task-list-sgroup{
    font-size: 12px;
    opacity: 0.5;
}

.task-add{
    position: absolute;
    margin-top: -30px;
    right: 30px;
    cursor: pointer;
}

.task-ls-edit{
    height: 100%;
    width: 10%;
    font-weight: bold;
    text-align: center;
    padding-right: 8px;
    background: rgba(0,0,0,0);
    transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

.task-ls-edit:hover{
    background: rgba(0,0,0,0.1)
}

.task-ls-edit-inner{
    margin-top: 50px;
    text-align: center;
    opacity: 0.5;
}

</style>