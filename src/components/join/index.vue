<template>
    <div id="join">

        <div id="join-inner" v-loading="loading">

            <div class="join-invitor-name">
                <span>{{userName}}</span>
            </div>

            <div class="cont-list-single">
                <span>Invited you to join</span>
            </div>
           
            <div class="join-icon">
                <img src="../../assets/team.png" alt="team icon"/>
            </div>        
            
            <div class="cont-list-sin" >
                <span>{{groupName}}</span>
            </div>

            <div class="cont-list-sing">
              
                <span>with 4 members have shared their timetable</span>
          
            </div>
            
            <div class="Join button">
                <el-row>
            
                    <el-button type="success" style="background:#1DDB8B; border:none;" v-on:click="toJoin">JOIN</el-button>

                </el-row>   
            </div>
            
            <div class="cont-list">       
                <span>By click JOIN, you agree with TEAMWORK’S </span>
            </div>
            
            <div class="cont-list-singl">
            
                <span>Terms and conditions</span>
            </div>
        </div> 
    </div>
</template>

<script>

import { EventBus } from '../../bus'

const request = require('../../request')
const ls = require('local-storage')

export default {
    name: "join",
    data() {
      return {
        value: true,
        userName: "",
        groupName: "",
        toGID: "",
        loading: false
      }
    },
    created(){
        EventBus.$emit("showSidebar", false)
        this.userName = this.$route.query.uname
        this.groupName = this.$route.query.gname
        this.code = this.$route.query.code
        this.toGID = this.$route.query.gid
        this.uuid = this.$route.query.uuid
    },
    methods:{
        toJoin(){
            console.log(ls.get("login_uuid"))
            if(ls.get("login_uuid")){
                this.loading = true

                const postReady = {
                    gid: this.toGID,
                    uuid: parseInt(ls.get("login_uuid"))
                }


                request.post('/join', postReady, (res)=>{
                    
                    this.loading = false
                    if(res.status){

                        this.$message({
                            type: 'success',
                            message: 'Welcome!'
                        })
                        this.$router.push({name: "group"})

                    } else {
                        this.$message({
                            type: 'warning',
                            message: 'Something Wrong'
                        })
                    }
                })
            } else {
                this.$message({
                    type: 'warning',
                    message: "You haven't sign in yet, please the team know who you are."
                })

                ls.set("to_join", this.toGID)
                this.$router.push({name: "home"})
            }
        }
    }
}

</script>

<style scoped>

    #join-inner{
        width: 100%;
        text-align: center
       
    }
    
    .join-invitor-name{
        margin-top:30px;
        font-size: 30px;
        font-weight:normal;
    }

    .cont-list{
        font-size:10px;
        color: rgba(0,0,0,0.5);
        margin-top: 20px;
    }
    
    .cont-list-sing{
       font-size: 16px;  
       color: rgba(0,0,0,0.5);
       margin-bottom: 60px; 
    }
    
    .cont-list-singl{
        margin-top: 5px;
        margin-bottom: 20px;
        font-size:10px;
        color: rgba(2,119,249,1);
    }    
  
    .join-invitor-link{
        font-size: 24px;
        font-weight: bold;
    }
    .cont-list-sin{
        font-size: 35px;
        font-weight: bolder;
    }
    .main{
        padding: 20px;
    }

    .cont{
        margin-top: 40px;
        margin-left: 40px;
    }
    .Join button{
        width: 300px;    
        font-size:20px;
        font-weight: bold;
    }
    .cont-list-single{
        margin-top: 5px;
        margin-bottom: 20px;
        font-size:20px;
        color: rgba(0,0,0,0.5);
    }

    .join-icon{
        width: 100%;
        text-align:center;
    }

    .join-icon img{
        width: 30px;
        height: 30px;
    }

    .cont-list-single{
        margin-top: 5px;
        margin-bottom: 20px;
        font-size:20px;
        color: rgba(0,0,0,0.5);
    }

    .cont-list-s-title{
        font-size: 15px;
        font-weight: normal;
        margin-bottom: 10px;
        color: rgba(0,0,0,1);
        width: 100px;
        text-align: center;
    }

    .cont-list-s-img{
        width: 100px;
        height: 100px;
        border-radius: 1000px;
        overflow: hidden;
    }
    

    .cont-list-s-img img{
        width: 70%;
    }
</style>
















