
import ls from 'local-storage'

export function allToInt(arr) {
    var res = []
    for (var i = 0; i < arr.length; i++) {
      res[i] = parseInt(arr[i])
    }
  
    return res
}

export function whereInArr(target, arr){
  
  for(var i=0;i<arr.length;i++){
    if(target == arr[i]){
      return i
    }
  }
  return false
}

export function ifSingleAddZero (tar) {
  tar = String(tar)
  tar = tar.length == 1 ? "0" + tar : tar
  return tar
}

export function timeEvtMatcher (target, obj) {

  // Target is sth. like "2020-04-23"
  var arr = []
  for (var i = 0; i < obj.length; i++) {

    var date = obj[i].start
    date = date.split(",")[0]

    if (target == date) {
      obj[i].startTime = obj[i].start.split(",")[1]
      obj[i].endTime = obj[i].end.split(",")[1]
      arr.push(obj[i])
    }
  }

  return arr
}

export function logout(){
  ls.clear()
}

// Check all thing in object is filled, notice dont check !el as it could be false
export function checkFilled(obj, exception){
    
  // Allow exception
  exception = exception ? exception : []

  let res = true

  for (const prop in obj) {
      let el = obj[prop]

      if(exception.indexOf(prop) == -1){
          if(el == "" && el == null && el == undefined && typeof el == undefined){
              res = false
          }
      }
  }

  return true
}

