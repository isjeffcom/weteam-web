<template>
    <div id="newGroup">
        <div class="mainBody">
            <p>ID: {{myid}}</p>
            <p>New Group</p>

        </div>
        
        <div class="new-group-detail">
            <input id="groupName" type="text" v-model="groupName">
        </div>

        

        <div id="login-inner">

            <button v-on:click="add">Create</button>
            

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
            myid: 11,
            groupName: ""
        }
    },

    // Fire When Page Init
    created(){
    },

    methods:{
        add(){
            const postReady = 
                {
                    id: this.myid,
                    groupName: this.groupName
                }
            request.post('/newGroup', postReady, (res)=>{
                console.log(res)
            })
        },
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