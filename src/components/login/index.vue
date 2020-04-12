<template>
    <div id="login">

        <div id="logina-cont" v-loading="loading">
            <div id="login-img">
                <div id="login-img-img">
                    <img src="../../assets/login-title-img.png" alt="login">
                </div>
                
            </div>

            <div id="login-inner">

                <div id="login-input-cont">
                    <div class="login-title">
                        <span>Login</span>
                    </div>
        
                    <div class="contactway">   
                        <el-input style="width: 410px;" v-model="email" type="text" placeholder="Unversity Email"></el-input>
                    
                    </div>
                    
                    <div class="contactwaya">
                        <el-input style="width: 410px;" v-model="password" type="password" placeholder="Password" ></el-input>
                    </div>

                    <div class="notice" style="opacity: 0.5; font-size: 12px;">
                        <span style="font-weight: bold;">Test Account: </span>
                        <br>
                        <span>1. Number: 1234567, Password: 1234567</span>
                        <br>
                        <span>2. Number: 7654321, Password: 7654321</span>
                    </div>
                    


                    <div class="button">
                        <el-button type="success" :style="'background:' + submitColor + ';border:none; width: 410px; font-weight: bold; font-size: 16px;'" v-on:click="loginLocal">
                            LOGIN OR CREATE
                        </el-button>
                    </div>

                    <div class="terms">
                        <span>By using this service, you agree to abide by the University's 
                            computing regulations and you understand how the University uses your personal information.</span>

                    </div>
                    
                </div>

            </div>
        </div>

        
        

    </div>
</template>



<script>

import request from '../../request'
//const request = require('../../request')

import { EventBus } from '../../bus'

const ls = require('local-storage')

 export default {
    name: "login",
    data() {
        return {
            email: '',
            password: "",
            submitColor: "#C2C2C2",
            submit_disabled: "#C2C2C2",
            submit_enable: "#0277F9",
            loading: false,
        }
    },
    created(){

        if(ls.get("login_uuid")){
            this.$router.push({name: "home"})
        }

        EventBus.$emit("showSidebar", false)
    },

    watch:{
        "password": function(val){
            if(this.email.length >= 5){
                this.submitColor = val.length >= 6 ? this.submit_enable : this.submit_disabled
            }
            //console.log(this.email.length)
        }
    },
    methods:{
        loginLocal(){
            
            if(this.email.length < 0 && this.password.length < 0){
                console.log("empty")
                return false
            }

            this.loading = true

            const postReady = {
                u: this.email,
                p: this.password,
                t: "tweb",
                r: Math.floor(1000+Math.random()*9000),
                platform: navigator.platform,
                language: navigator.language
            }

            request.post('/login', postReady, (res)=>{
                this.loading = false
                if(res.data.name && res.data.token){

                    ls.set('login_token', res.data.token)
                    ls.set('login_snum', this.email)
                    ls.set('login_uuid', res.data.id)
                    ls.set('login_psw', this.password)
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
        margin-top: 160px;
        margin-left: 150px;
    }

    #login-inner{
        width: 66%;
    }

    #login-input-cont{
        width: 550px;
        margin-left: 140px;
    }


    .login-title{
        margin-top:110px;
        margin-bottom:40px;
        font-size: 30px;
        font-weight:bold;
    }

    .contactway{
        font-size: 18px;
        font-weight:bold;
        margin-top:40px;
    }

    .contactway span{
        opacity: 0.7;
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
    .terms{
       font-size: 14px;
       color:rgba(0,0,0,0.5);
       margin-top: 10px;
    }



</style>



