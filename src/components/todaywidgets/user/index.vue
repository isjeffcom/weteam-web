<template>
    <div id="today-user">
        <div id="today-u-avatar">
            <img :src="avatar" alt="avatar">
        </div>

        <div id="today-u-info">
            <div style="opacity: 0.5;">{{ email }}</div>
            <div style="font-size: 26px; font-weight: bold;text-transform: uppercase;">{{ name }}</div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: "todayUser",
    props:{
        avatar: {
            type: String,
            default: "./assets/default_avatar.png"
        },

        email: {
            type: String,
            default: "s1888009@ed.ac.uk"
        },

        name: {
            type: String,
            default: "JIANFENG WU"
        }

    }
}
</script>


<style scoped>

#today-user{
    width: 100%;
    margin-top: 40px;
    text-align: center;
    color: #494E59;
}

#today-u-avatar{
    height: 140px;
    width: 140px;
    border-radius: 100px;
    overflow: hidden;
    object-fit: cover;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
}

#today-u-avatar img{
    width: 100%;
    height: 100%;
}

#today-u-info{
    margin-top: 10px;
    font-weight: normal;
    font-size: 16px;
    line-height: 28px;
}


</style>