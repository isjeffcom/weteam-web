<template>
    <div id="home">

        <!--div class="main">
            <span>{{ nihao }}</span>
            <router-link :to="nav">
                <button>start</button>
            </router-link>
        </div-->

        <div class="cont">

            <div class="cont-inner">
                <div class="cont-intro">
                    <span>目前是一个提供给爱丁堡大学学生使用的课程表和团队管理工具。目前处于早期测试阶段。</span>
                </div>

                <div class="cont-list-single">
                    <div class="cont-list-s-title">
                        <span>现有能力</span>
                    </div>

                    <div class="cont-list-s-content">
                        <span>
                            - 查看你的课程表 <br>
                            - 创建团队  <br>
                            - 分享团队  <br>
                            - 查看队员课程表 <br>
                        </span>
                    </div>
                </div>

                <div class="cont-list-single">
                    <div class="cont-list-s-title">
                        <span>未来能力</span>
                    </div>

                    <div class="cont-list-s-content">
                        <span>
                            - 团队看板任务管理 <br>
                            - 会议计划 <br>
                            - 公告板 <br>
                            - 房间预订 <br>
                            - 支持更多学校 <br>
                        </span>
                    </div>
                </div>
            </div>

        </div>
        
    </div>
</template>


<script>


export default {
    name: "home",
    components:{

    },
    props:{
        
    },

    data(){
        return{
            nihao: "Welcome page",
            nav: "login"
        }
    },

    created(){

    },

    methods:{
        
    }
}
</script>

<style scoped>
    .main{
        padding: 30px;
    }

    .cont{
        margin-top: 40px;
        margin-left: 40px;
    }

    .cont-list-single{
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .cont-list-s-title{
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 5px;
    }
</style>