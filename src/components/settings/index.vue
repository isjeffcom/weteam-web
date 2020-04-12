<template>
    <div id="settings">
        <div>
            <input type="text" v-model="email">
        </div>
    </div>
</template>


<script>
import ls from 'local-storage'

export default {
    name: "settings",
    data(){
        return{
            email: "",
            name: ""
        }
    },
    created(){
        this.email = ls.get("login_snum")
    }
}
</script>