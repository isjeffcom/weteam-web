
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

module.exports = {
    allToInt: allToInt,
    whereInArr: whereInArr
}