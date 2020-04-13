<template>
    <div id="newGroup">

        <div class="inner">
            <el-page-header @back="goBack" content="New Group"></el-page-header>
            
            <div class="new-group-detail">
                <input id="groupName" type="text" v-model="groupName" placeholder="Name">
            </div>

            <div id="new-group-add">
                <el-button v-on:click="add">Create</el-button>
            </div>

        </div>

        <div class="page-bg">
            <img src="../../assets/bg_newgroup.png" width="100%">
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

        goBack(){
            this.$router.go(-1);
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

.new-group-detail{
    margin-top: 100px;
    margin-bottom: 100px;
}

#new-group-add{
    margin-top: 20px;
}
</style>