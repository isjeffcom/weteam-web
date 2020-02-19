<template>
    <div id="login">

        <div v-for="item in list" :key="item.name" class="single">
            Name: <span>{{item.name}}</span> <br>
            Des: <span>{{item.des}}</span>
        </div>

        <div id="login-inner">

            <div id="login-t-image">

            </div>

            <div id="login-input-cont">

                <div id="login-input-email">

                    Email: <input type="text">

                </div>

                <div id="login-input-psw">
                    Password: <input type="password">
                </div>
            </div>
            
            <div id="login-input-submit">
                <router-link to="home">
                    <button>SUBMIT</button>
                </router-link>
            </div>

            <button v-on:click="updateMenu">Update Menu</button>
            <button v-on:click="hello">callback</button>

           
            

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
            api: "/cafe/update/index.php",
            api_all: "/cafe/",
            list: []
        }
    },

    created(){
        this.getData()
    },

    methods:{
        hello(){
            request.hello("anytext", (res)=>{
                alert()
                console.log(res)
            })
        },

        updateMenu(){
            const postReady = {
                id: 1,
                name: "hello",
                des: "huawei"
            }
            request.post(this.api, postReady, (res)=>{
                console.log(res)
                if(res.status){
                    alert("success")
                } else {
                    alert("fail:" + res.err)
                }
            })
        },

        getData(){
            request.get(this.api_all, {}, (res)=>{
                this.list = res.data
                console.log(res)
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
</style>