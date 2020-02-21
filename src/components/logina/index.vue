<template>
    <div id="logina">

        <div id="login-img">
            <div id="login-img-img">
                <img src="../../assets/login-title-img.png" alt="">
            </div>
            
        </div>
        <div id="login-inner">

            <div id="login-input-cont">
                <div class="login-title">
                    <span>Login</span><br>
                </div>
    
                <div class="contactway">   
                    <el-input v-model="input" placeholder="Email"></el-input>    
                   
                </div>
                
                <div class="contactwaya">
                    <el-input v-model="input" placeholder="Password"></el-input>
                 </div>

                <div class="button">
                    <el-button type="success" style="background:rgba(149,149,149,1); border:none;width: 400px">LOGIN OR CREATE</el-button>

                </div>
            <div class="test">
               <span>By using this service, you agree to abide by the University's 
                     computing regulations and you understand how the University uses your personal information.</span>
   

        
            </div>
                
            </div>

            

       </div>

    </div>
</template>>



<script>
 export default {

  data() {
    return {
      input: ''
    }
 
}


   
   
   }
</script>



<style scoped>

    #logina{
        width: 100%;
        display: flex;
    }

    
    #login-img{
        width: 33%;
        text-align: center;
    }

    #login-img-img{
        margin-top: 220px;
        margin-left: 150px;
    }
       
    

    #login-inner{
        width: 66%;
    }

    #login-input-cont{
        width: 400px;
        margin-left: 50px;
    }


    .login-title{
        margin-top:80px;
        margin-bottom:40px;
        font-size: 30px;
        font-weight:bold;
    }
      .contactway{
        font-size: 30px;
        font-weight:bold;
        margin-top:100px;
      
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
    .test{
       font-size: 10px;
       color:rgba(0,0,0,0.5);
       margin-top: 10px;

    }



</style>



