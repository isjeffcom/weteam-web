<template>
   <div id="created">

    <div id="icon">
       <div class="el-icon">
           <el-page-header @back="goBack" content="Group Created">
           </el-page-header>
       </div>
    </div>

       <div id="created-inner">

        <div class="created-img">
            <img src="../../assets/success 1.png" alt="success icon">
                    
       </div> 

        <div class="created-group-bigger">
            <span>Group Created</span>
        </div> 

        <div class="created-invite-way">
            <span>Invite your group member via PIN</span><br>
            <span>Link or QRCode</span>   
        </div> 

        <div class="invite-members">
            <span>invite members from link</span>

       
        </div>
        

    
        <div id="link">
            <div class="input-box">
                <el-input v-model="input" placeholder="https://we.group/join?c=367924"></el-input>
            </div>
             
        </div>        
        
        
        <div class="created-img-img">
            <img src="../../assets/qr-code 1.png" alt="success icon">


        </div>

        <div class="button">
            <el-button type="primary" style="font-size:20px;font-weight:bolder;background:#0277F9; border:none;width:230px;height:60px;">FINISH

            </el-button>

        </div>
     </div>





   </div>

</template>


<script>
    export default {
    methods: {
      goBack() {
        console.log('go back');
      }
    }
  }
</script>


<style scoped>
    
    #created-inner{
      
        text-align: center;
        margin-top:100px;
      
    }
       
    .el-icon{
       margin-top:30px;  
    }

    .created-group{
        margin-top:30px;
        font-size: 30px;
        font-weight:normal;
    }

    .created-group-bigger{
        margin-top:20px;
        font-size: 40px;
        font-weight:bolder;
    }
   
    .created-invite-way{
        font-size: 25px;
        margin-top:20px;
        margin-bottom:30px;
    }

    .invite-members{
        margin-top:30px;
        margin-bottom:20px;
        font-size: 20px;
        color:rgba(0,0,0,0.5);
    }
    #link{
        width: 100%;
       
        text-align: center;
    }
    .input-box{
        font-size: 20px;
        color:rgba(0,0,0,0.5);
        width: 20%;
        margin-left: auto;
        margin-right: auto;
    }
    
    
    .created-img{
         width: 100%;
         margin-top:30px;
    } 
    .created-img img{
        width: 150px;
        height: 150px;
    }
    .created-img-img{
         width: 100%;
    }
    .created-img-img img{
        width: 230px;
        height: 230px;
        margin-top: 50px; 
    }
 

    
    .button{
        margin-top: 30px;
        font-size:20px;
        font-weight: bolder;
    }





</style>






