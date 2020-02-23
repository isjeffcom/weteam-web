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
const ls = require('local-storage')

export default {
    name: "login",
    components:{

    },
    props:{

    },

    data(){
        return{
            groupName: ""
        }
    },

    // Fire When Page Init
    created(){
        this.myid = parseInt(ls.get("login_uuid"))
    },

    methods:{
        add(){
            const gn = this.groupName
            if(gn.length > 2 && gn.length < 48){
                const postReady = {
                    id: this.myid,
                    groupName: this.groupName
                }

                request.post('/newGroup', postReady, (res)=>{
                    if(res.status){
                        this.$message({
                            message: 'Group: ' + gn + ' added',
                            type: 'success'
                        })

                        this.$router.push('group')

                    } else {
                        this.$message({
                            message: 'Can not add group',
                            type: 'warning'
                        })
                    }
                })
            } else {
                this.$alert('Group name must longer than 2 and shorter than 48', 'Check Group Name', {
                    confirmButtonText: 'OK',
                })
            }

            
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