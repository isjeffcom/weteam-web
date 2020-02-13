const axios = require('axios')
const qs = require('qs')

const base_url = "http://localhost"

function hello(txt, callback){
    setTimeout(()=>{
        callback(txt)
    }, 3000)
}

function post(api, data, callback){

    var postData = qs.stringify(data)

    axios.post(base_url + api, postData)
      .then(function (response) {
          if(response){

            callback({status: true, data: response.data}, false)
            return 
          }else{
            callback({status: false, data: response.data})
            return 
          }
      })
      .catch(function (error) {
        callback({status: false, data: null, err: error})
        return 
      })
}


function get(api, data, callback){
    axios.post(base_url + api)
      .then(function (response) {
        callback({status: true, data: response.data})
        return 
          
      })
      .catch(function (error) {
        callback({status: false, data: null, err: error})
        return 
      })
}
module.exports ={
    hello:hello,
    post: post,
    get: get
}