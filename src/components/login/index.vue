<template>
    <div id="login">

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
            

        </div>

    </div>
</template>

<script>

export default {
    name: "login",
    components:{

    },
    props:{

    },

    data(){
        return{

        }
    },

    created(){

    },

    methods:{
        
    }
}
</script>


<style scoped>

</style>