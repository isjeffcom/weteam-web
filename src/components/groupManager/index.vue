<template>
    <div id="groupManager">
        <div class="mainBody">
            <p>ID: {{myid}}</p>
            <p>Group Management</p>
            <p>Name: {{groupName}}</p>
            <p>Access</p> 

        </div>
        
        <div class="new-group-detail">
        </div>

        

        <div id="login-inner">
            <button v-on:click="allow">Allow Join</button> <p>{{state}}</p>

        </div>

        <div class="group-list">
            <p>Members</p>
            <div class="group-list-single" v-for="(item, index) in list" :key="index">
                <span>{{item.name}}</span><p>     </p><button v-on:click="deleteMb(item.id)">Delete</button><br>
            </div>
        </div>

    </div>
</template>

<script>

const request = require('../../request')

export default {
    name: "login",
    components:{

    },
    props:{

    },

    data(){
        return{
            gid: 0,
            myid: 14,
            groupName: "Group",
            list:[],
            state: 1,
            liststring:"1,2"
        }
    },

    // Fire When Page Init
    created(){
        this.gid = this.$route.params.gid
        this.groupName = this.$route.params.name
        //this.liststring = this.$route.params.members
        var listStr = this.$route.params.members
        this.list = listStr.split(",")
        this.getName()
        //console.log(this.groupName)
        //this.judgeState()
    },

    methods:{
        getName(){
            //console.log(this.list)
            const postReady = [
                {
                    name: "memberId",
                    val: this.list
                }
            ]
            request.get('/groupManagerGetName', postReady, (res)=>{
                this.list = res.data
            })
        },
        allow(){
            const postReady = 
                {
                    userid: this.myid,
                    gid: this.gid,
                    //groupName: this.groupName
                }
            request.post('/groupManager', postReady, (res)=>{
                console.log(res)
            })
        },

        deleteMb(nameId){
            //console.log(nameId)
            const postReady = 
                {
                    id: this.myid,
                    nameid: nameId,
                    gid: this.gid
                }
            request.post('/groupManagerDelete', postReady, (res)=>{
                console.log(res)
            })
        },

        judgeState(){
            //console.log(this.gid)
            const postReady =
            [ 
                {
                    name: "gid",
                    val: this.gid
                }
            ]
            request.get('/groupManagerState', postReady, (res)=>{
                //console.log(res.data.data)
                this.state = res.data.data
                //console.log(this.state)
            })


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

.group-list-single{
    margin-bottom: 20px;
}
</style>