<template>
    <div id="group">
        <div class="mainBody">
            <p>My Group</p>

        </div>
        
        <div class="group-list">
            <div class="group-list-single" v-for="item in list" :key="item.name">
                <span>{{item.gname}}</span><br>
                <span>{{item.memCount}} members</span>
            </div>
        </div>

        <div class="bottom">
        </div>

        

        <div id="login-inner">

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
            email: "",
            password: "",
            list: []
        }
    },

    created(){
        //this.getData()
    },

    methods:{
        getTask(){
            postReady={
                name: "id",
                val: 10
            }
            request.get('/group', postReady, (res)=>{
                this.list = res.data
                console.log(res)
            })
        },
        loginLocal(){
            console.log(this.email + this.password)
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
                console.log(res)
                if(res.data == "t"){
                    console.log("success")
                    this.$router.push('home')
                } else {
                    this.$alert('Wrong student number or password, please try again', 'Try again', {
                        confirmButtonText: 'OK'
                    });
                }
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

.group-list-single{
    margin-bottom: 20px;
}
</style>