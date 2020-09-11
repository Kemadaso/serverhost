



exports.string_to_slug = function (str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaaaeeeeiiiioooouuuunc------";

  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
	  .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
	  .replace(/\s+/g, "-") // collapse whitespace and replace by -
	  .replace(/-+/g, "-") // collapse dashes
	  .replace(/^-+/, "") // trim - from start of text
	  .replace(/-+$/, ""); // trim - from end of text

	return str

}


exports.makeid = function(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

exports.namerar = function(str = '') {
  
  const obj = {
    i: '1',
    a: '4',
    o: '0',
    e: '3'
  }

  let name = ''

  str = exports.string_to_slug(str)

  for(const s of str) {
    if(obj.hasOwnProperty(s)) {
      name += obj[s]
    } else {
      if(Math.floor(Math.random() * 100) > 50) {
        name += s.toUpperCase()
      } else {
        name += s
      }
    }
  }

  return name.substring(0, 20)

}