const ls = require('local-storage');

function allToInt(arr) {
    var res = []
    for (var i = 0; i < arr.length; i++) {
      res[i] = parseInt(arr[i])
    }
  
    return res
}

function whereInArr(target, arr){
  
  for(var i=0;i<arr.length;i++){
    if(target == arr[i]){
      return i
    }
  }
  return false
}

function ifSingleAddZero (tar) {
  tar = String(tar)
  tar = tar.length == 1 ? "0" + tar : tar
  return tar
}

function timeEvtMatcher (target, obj) {

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

function logout(){
  ls.clear()
}

module.exports = {
    allToInt: allToInt,
    whereInArr: whereInArr,
    ifSingleAddZero: ifSingleAddZero,
    timeEvtMatcher: timeEvtMatcher,
    logout: logout
}