<template>
    <div id="logina">

        <div id="logina-cont">
            <div id="login-img">
                <div id="login-img-img">
                    <img src="../../assets/login-title-img.png" alt="">
                </div>
                
            </div>

            <div id="login-inner">

                <div id="login-input-cont">
                    <div class="login-title">
                        <span>Login</span><br>
                    </div>
        
                    <div class="contactway">   
                        <el-input v-model="email" placeholder="Email"></el-input>    
                    
                    </div>
                    
                    <div class="contactwaya">
                        <el-input v-model="password" type="password" placeholder="Password"></el-input>
                    </div>

                    <div class="button">
                        <el-button type="success" style="background:rgba(149,149,149,1); border:none;width: 400px" v-on:click="loginLocal">
                            LOGIN OR CREATE
                        </el-button>

                    </div>

                    <div class="test">
                        <span>By using this service, you agree to abide by the University's 
                            computing regulations and you understand how the University uses your personal information.</span>
        

                
                    </div>
                    
                </div>

            </div>
        </div>

        
        

    </div>
</template>



<script>

const request = require('../../request')

import { EventBus } from '../../bus'

const ls = require('local-storage')

 export default {
    name: "logina",
    data() {
        return {
            email: '',
            password: ''
        }
    },
    created(){

        EventBus.$emit("showSidebar", false)
        
    },
    methods:{
        loginLocal(){
            if(this.email.length < 0 && this.password.length < 0){
                console.log("empty")
                return false
            }
            const postReady = {
                u: this.email,
                p: this.password,
                t: "tweb",
                r: Math.floor(1000+Math.random()*9000),
                platform: navigator.platform,
                language: navigator.language
            }

            request.post('/login', postReady, (res)=>{
                if(res.data.name && res.data.token){

                    ls.set('login_token', res.data.token)
                    ls.set('login_snum', this.email)
                    ls.set('login_uuid', res.data.id)
                    ls.set('data_n', res.data.name)
                    ls.set('data_tt', res.data.tt)

                    this.$router.push('home')

                } else {
                    this.$alert('Wrong student number or password, please try again', 'Try again', {
                        confirmButtonText: 'OK'
                    });
                }
            })
        },
    }


   
   
}
</script>



<style scoped>

    #logina-cont{
        width: 100%;
        display: flex;
    }

    
    #login-img{
        width: 33%;
        text-align: center;
    }

    #login-img-img{
        margin-top: 220px;
        margin-left: 150px;
    }
       
    

    #login-inner{
        width: 66%;
    }

    #login-input-cont{
        width: 400px;
        margin-left: 120px;
    }


    .login-title{
        margin-top:80px;
        margin-bottom:40px;
        font-size: 30px;
        font-weight:bold;
    }
      .contactway{
        font-size: 30px;
        font-weight:bold;
        margin-top:100px;
      
    }
    .contactwaya{
        font-size: 40px;
        font-weight:bold;
        margin-bottom:30px;
        margin-top:40px;
      
    }
    .button{
        font-size:30px;
        color: rgba(255,255,255,1);
        margin-top: 40px;
        font-weight:bold;
        width: 400px;
    }
    .test{
       font-size: 10px;
       color:rgba(0,0,0,0.5);
       margin-top: 10px;

    }



</style>



