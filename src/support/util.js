
function allToInt(arr) {
    var res = []
    for (var i = 0; i < arr.length; i++) {
      res[i] = parseInt(arr[i])
    }
  
    return res
  }

  module.exports = {
      allToInt: allToInt
  }