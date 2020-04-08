<template>
    <div id="personal">
              

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
    created(){
        //this.view(this.userId)
        //this.add(this.userId, this.name, this.location, this.allDay, this.start, this.startTS, this.end, this.endTS)
        //this.delete(this.id, this.userId)
        this.edit(this.id, this.userId, this.name, this.location, this.allDay, this.start, this.startTS, this.end, this.endTS)
    },
    data(){
        return{
            userId: 16,
            id: 6,
            name: "Lecture Advanced Databases_Lecture",
            location: "2.13, Geography (Old Infirmary)",
            allDay: "true",
            start: "2020-02-24,9:0:0",
            startTS: "1582534800000",
            end: "2020-02-24,10:0:0",
            endTS: "1582538400000"
        }
    },

    methods:{
        view(uuid){
            //console.log(111)
            const postReady = [
                {
                    name: "uuid",
                    val: uuid
                },
            ]

            request.get('/personalView', postReady, (res)=>{
                console.log(res)
            })
        },

        add(uuid, name, location, allDay, start, startTS, end, endTS){
            const postReady = {
                    uuid: uuid,
                    name: name,
                    location: location,
                    allDay: allDay,
                    start: start,
                    startTS: startTS,
                    end: end,
                    endTS: endTS
                }

                request.post('/personalAdd', postReady, (res)=>{
                    console.log(res)
                })
        },

        delete(id, uuid){
            const postReady = {
                    id: id,
                    uuid: uuid
                }

                request.post('/personalDelete', postReady, (res)=>{
                    console.log(res)
                })
        },

        edit(id, uuid, name, location, allDay, start, startTS, end, endTS){
            const postReady = {
                    id: id,
                    uuid: uuid,
                    name: name,
                    location: location,
                    allDay: allDay,
                    start: start,
                    startTS: startTS,
                    end: end,
                    endTS: endTS
                }

                request.post('/personalEdit', postReady, (res)=>{
                    console.log(res)
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