<template>
    <div id="task">

        <div class="task-title">
            <span>{{ gname }}</span>
        </div>

        <div class="task-add">
            <span style="color:#0277F9" v-on:click="toNew"> + NEW </span>
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
                                <span>{{ gname }}</span>
                                <hr>
                            </div>

                            <div class="task-list-s-title">
                                <div class="circle task-list-s-done" v-on:click="getItDone(item)"></div>
                                <div>{{item.des}}</div>
                            </div>

                            <div class="task-list-s-sub" v-show="item.endDate != '0000-00-00'">
                                <hr>
                                <span class="task-list-s-sub">Due: {{item.endDate}}</span>
                            </div>
                        </div>

                        <div class="task-ls-edit" v-on:click="toEdit(item)">
                            <div class="task-ls-edit-inner">···</div>
                        </div>

                    </div>
                </div>

                
            </div>

            
        </div>

        <newTask id="newTask" :gid="gid" v-if="newPopup"></newTask>
        <newTask id="editTask" :gid="gid" :d="selected" v-if="editGroup"></newTask>

    </div>
</template>

<script>
import newTask from '../GroupNewTask'
import { EventBus } from '../../bus'

const request = require('../../request')
const ls = require('local-storage')

export default {
    
    //name: "task",
    components:{
        newTask
    },
    props:{

    },

    data(){
        return{
            api: "",
            states: [
                { n: "To Do", s: 0}, 
                { n: "Done", s: 1}, 
            ],
            userId: 16,
            gname: "",
            gid: 15,
            list: [],
            selected: {},
            selectedState: 0,
            newPopup: false,
            editGroup: false
        }
    },

    mounted(){
        this.userId = ls.get("login_uuid")
        this.gid = this.$route.query.id
        this.gname = this.$route.query.name
        this.getList(this.userId, this.gid)
    },

    // Fire When Page Init
    created(){

        EventBus.$on("popup-close", ()=>{
            this.newPopup = false
            this.editGroup = false
        })

        EventBus.$on("task-added", ()=>{
            this.getList(this.userId, this.gid)
        })

    },

    methods:{
        getList(userId,gid){
            //console.log(userId)
            const postReady = [
                {
                    name: "id",
                    val: userId
                },

                {
                    name: "gid",
                    val: gid
                }
            ]

            request.get('/groupTask', postReady, (res)=>{
                if(res.status){
                    let all = res.data.data
                    let ready = [[], []]
                    
                    all.forEach((el,index) => {
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

            request.post('/editTask', postReady, (res)=>{
                if(res.status){
                    this.getList(this.userId, this.gid)
                }
            })
            
        },

        toEdit(obj){
            this.selected = obj
            this.editGroup = true
            //console.log(obj)
        },

        switchState(val){
            this.selectedState = val
        },


        toNew(){
            this.newPopup = true
        }
    }
}
</script>


<style scoped>

.circle{
    width: 16px;
    height: 16px;
    border: 1px solid rgb(121, 121, 121);
    border-radius: 100px;
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
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
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
    opacity: 0.5;
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