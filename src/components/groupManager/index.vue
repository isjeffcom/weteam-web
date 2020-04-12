<template>
    <div id="groupManager">
        <div id="group-m-inner" v-loading="loading">
            <el-page-header @back="goBack" content="Group Management"></el-page-header>

            <div class="group-m-item group-manager-name">
                <span>Name: </span>
                <el-input v-model="groupName" :disabled="!isAdm"></el-input>
            </div>

            

            <div class="group-m-item group-manager-allow">
                <span>Allow Access: </span>
                <el-switch
                    v-model="open"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    :disabled="!isAdm">
                </el-switch>
            </div>

            <div class="group-m-item group-manager-mems">
                <span>Members: </span>
                <div class="group-manager-mems-cont">
                    <div class="group-mems-single" v-for="(item, index) in list" :key="index">
                        <div class="group-mems-single-name">
                            <span>{{item.name}}</span>
                        </div>

                        <div class="group-mems-single-act">
                            <span v-on:click="deleteMb(item.id)" v-if="item.id != admId">remove</span>
                        </div>
                    </div>
                </div>
                
            </div>

            <div class="group-m-submit" v-if="isAdm">
                <el-button style="background: #0277F9; color: #ffffff; font-weight: bold; border: none;" v-on:click="save">SAVE</el-button>
                <el-button style="background: #F24C4C; color: #ffffff; font-weight: bold; border: none;">DELETE</el-button>
            </div>
        </div>

        <div class="page-bg">
            <img src="../../assets/bg_admin.png" width="100%">
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
            gid: 0,
            myid: '',
            groupName: "",
            list:[],
            open: true,
            isAdm: true,
            admId: "",
            loading: false
        }
    },

    // Fire When Page Init
    created(){
        this.gid = this.$route.query.gid
        this.myid = ls.get("login_uuid")
        this.getName()
        this.getDetail()
    },

    activated(){
        this.getName()
        
    },

    methods:{
        getName(){

            const postReady = [
                {
                    name: "groupId",
                    val: this.gid
                }
            ]
            request.get('/groupManagerGetName', postReady, (res)=>{
                this.list = res.data
            })
        },

        getDetail(){

            const postReady = [
                {
                    name: "gid",
                    val: this.gid
                }
            ]

            request.get('/groupsingle', postReady, (res)=>{
                this.groupName = res.data.data.name
                this.open = res.data.data.open == 1 ? true : false
                this.isAdm = res.data.data.adm == ls.get("login_uuid") ? true : false
                this.admId = res.data.data.adm
            })
        },

        goBack(){
            this.$router.go(-1);
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

            var that = this

            this.$confirm('Removing member, are you sure?', 'Alert', {

                confirmButtonText: 'CONFIRM',
                cancelButtonText: 'CANCEL',
                type: 'warning'

            }).then(() => {

                that.loading = true

                const postReady = {
                    id: that.myid,
                    nameid: nameId,
                    gid: that.gid
                }

                request.post('/groupManagerDelete', postReady, (res)=>{
                    that.loading = false
                    if(res.status){
                        this.$message({
                            type: 'success',
                            message: 'Removed'
                        })
                        that.getName()
                    }
                    
                })


            }).catch(() => {
                // Do nothing
            });
            
        },

        save(){
            const postReady = {
                gid: this.gid,
                groupName: this.groupName,
                allow: this.open ? 1 : 0
                
            }
            this.loading = true
            request.post('/saveChange', postReady, (res)=>{
                this.loading = false
                if(res.status){
                    this.$message({
                        message: 'Saved',
                        type: 'success'
                    });
                    this.getDetail()
                }

            })
        }

        /*judgeState(){
            //console.log(this.gid)
            const postReady = [ 
                {
                    name: "gid",
                    val: this.gid
                }
            ]

            request.get('/groupManagerState', postReady, (res)=>{
                //console.log(res.data.data)
                this.state = res.data.data == 1 ? true : false
                //console.log(this.state)
            })

        }*/

    }
}
</script>


<style scoped>
input{
    width: 300px;
}

span{
    font-size: 18px;
}


#group-m-inner{
    width: 95%;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
}

.group-m-item{
    margin-top: 20px;
    margin-bottom: 20px;
}

.group-manager-mems-cont{
    width: 100%;
    margin-top: 20px;
    border-radius: 8px;
    border: 1px solid rgba(0,0,0,0.1);
}

.group-mems-single{
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
}

.group-mems-single-name{
    margin-left: 14px;
}

.group-mems-single-act{
    position: absolute;
    right: 50px;
}


.group-mems-single-act span{
    cursor: pointer;
    color: #F24C4C;
}
</style>