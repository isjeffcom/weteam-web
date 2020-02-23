<template>
    <div id="group">
        <div class="mainBody">
            <p>ID: {{myid}}</p>
            <p>My Group</p>

        </div>
        
        <div class="group-list">
            <div class="group-list-single" v-for="(item, index) in list" :key="index" v-on:click="toGroupAdmin(item.id, item.name, item.members)">
                <span>{{item.name}}</span><br>
                <span>{{ item.members.split(",").length}} members</span>
            </div>
        </div>

        <div class="bottom">
        </div>

        

        <div id="login-inner">

            <!--button v-on:click="updateMenu">Update Menu</button-->
            <button v-on:click="getTask">Get Task</button>
            

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
            list: [
                {
                    id: 33,
                    name: "lalala",
                    members: "10,14"
                },
                {
                    id: 16,
                    name: "Group name",
                    members: "15,14,16"
                },
            ],
            myid: 11
        }
    },

    // Fire When Page Init
    created(){
        //this.getTask(this.myid)
        //this.getData()
    },

    methods:{
        getTask(userId){
            const postReady = [
                {
                    name: "id",
                    val: userId
                }
            ]
            request.get('/group', postReady, (res)=>{
                this.list = res.data.data
                console.log(res)
            })
        },

        toGroupAdmin(gid, name, members){
            this.$router.push({name: "groupManager", params: { gid: gid, name: name, members: members}})
            //console.log(gid)
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