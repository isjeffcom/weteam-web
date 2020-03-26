<template>
    <div id="roles" class="user-widget">
        <div id="roles-inner" class="user-widget-inner">

            <div class="user-widget-title">
                <span>NEXT DUE</span>
            </div>


            <div class="user-widget-more">
                <img src="../../../assets/more.svg" alt="more">
            </div>

            <div id="due-main">
                <div class="due-m-s" v-for="(item, index) in tasks" :key="index">
                    <div class="label" :style="'background:' + item.label + ';'"></div>
                    <div class="due-m-s-name">{{ item.name }}</div>
                    <div class="due-m-s-due">{{ item.due }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "roles",
    props:{
        tasks:{
            type: Array,
            default(){
                return [
                    {
                        name: "UX Designer",
                        due: "29/02/2020",
                        label: "#F93D02"
                    },
                    {
                        name: "Home Page",
                        due: "04/03/2020",
                        label: "#FFAA2C"
                    },
                    {
                        name: "Calendar View",
                        due: "12/03/2020",
                        label: "#0DD681"
                    }
                ]
            }
        }
    }
}
</script>

<style scoped>
#due-main{
    margin-top: 20px;
    margin-bottom: 30px;
}

.due-m-s{
    display: flex;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
}

.label{
    height: 20px;
    width: 6px;
}

.due-m-s-name{
    margin-left: 12px;
}

.due-m-s-due{
    position:absolute;
    margin-left: 206px;
    opacity: 0.5;
}
</style>