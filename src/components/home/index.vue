<template>
    <div id="home">


        


        <span class="test">This is the home page</span>

        <div id="onebutton">
            <el-button type="primary" v-on:click="go">主要按钮</el-button>
        </div>

        <div id="customButton">
            <span>开始</span>
        </div>
        
        <router-link to="signup">
            <button>to welcome</button>
        </router-link>


        <el-select v-model="value" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>

        <el-switch
            v-model="onoff"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>



    </div>
</template>




<style scoped>
.test{
    font-size: 44px;
}

#onebutton{
    margin-left: 100px; 
    
}

#customButton{
    width: 300px;
    height: 50px;
    background: rgba(0,0,255,0.6);
    color: #fff;
    cursor: pointer;
    user-select: none;
    box-shadow: 0 3px 6px rgba(0,0,255,0.06), 0 3px 6px rgba(0,0,255,0.13);
    transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

#customButton:hover{
    background: rgba(0,0,255,1);
    box-shadow: 0 3px 6px rgba(0,0,255,0.16), 0 3px 6px rgba(0,0,255,0.23);
}

#customButton:active{
    background: rgb(255, 0, 0);
}

</style>


<script>


export default {
    name: "home",
    components:{
    },
    props:{
        
    },

    data(){
        return{
            options: [
                {
                    value: '1',
                    label: '黄金糕'
                }, 
                {
                    value: '2',
                    label: '双皮奶'
                }, 
                {
                    value: '3',
                    label: '蚵仔煎'
                }, {
                    value: '4',
                    label: '龙须面'
                }, {
                    value: '5',
                    label: '北京烤鸭'
            }],
                value: '',
                onoff: false
            }
    },

    created(){

    },

    methods:{
        go(){
            console.log(this.value)
        }
    }
}
</script>