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


// General get data
export function get (api, param, callback) {
    
  axios.get(contParam(api, param)).then((response) => {

      if(typeof(response.data) == "string"){
          callback({status: false, error: response.data})
          return
      } else {
          callback({status: true, data: response.data})
          return
      }

  }).catch((err) => {

      callback({status: false, error: err})

  })
}

// Construct url with paramaters
function contParam (api, param) {
    
  // Assumble get url paramaters
  if(param.length > 0){
      api = api + "?"
      
      
      for(var i=0;i<param.length;i++){

          if(i == param.length - 1){
              
              api = api + param[i].name + "=" + param[i].val
          } else {
              api = api + param[i].name + "=" + param[i].val + "&"
          } 
      }    
  }

  return api
}
module.exports ={
    hello:hello,
    post: post,
    get: get
}