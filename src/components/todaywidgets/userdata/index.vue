<template>
    <div id="userdata" class="user-widget">
        <div id="userdata-inner">
            <div class="userdata-s" v-for="(item, index) in dataSeries" :key="index" :style="'width:calc(100%/' + dataTitles.length + ');'">
                <div class="userdata-num">{{ item }}</div>
                <div class="userdata-tit">{{ dataTitles[index] ? dataTitles[index] : "Data" }}</div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "userdata",
    props:{
        dataSeries: {
            type: Array,
            default(){ return [241, 135, 12] }
        },

        dataTitles: {
            type: Array,
            default(){ return ["Total", "Finished", "Project"] }
        }
    }
}
</script>

<style scoped>


#userdata-inner{
    text-align: center;
    display: flex;
}

.userdata-s{
    margin-top: 16px;
    margin-bottom: 16px;
}

.userdata-num{
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;
}

.userdata-tit{
    font-size: 12px;
    color: #6B717D;
    text-transform: uppercase;
}
</style>