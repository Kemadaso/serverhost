exports.isObjectNoEmpty = function(obj) {
  for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
          return true
  }

  return false
}

exports.isArrayNoEmpty = function(arr) {
  if (Array.isArray(arr) && arr.length) {
      return true
  } else {
      return false
  }
}