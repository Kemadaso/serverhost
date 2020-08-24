const fs = require('fs')
const path = require('path')


const basedir = path.join(global.__basedir, 'storage')


module.exports = function(req, res, next) {

  fs.readdir(basedir, function(err, files) {

    if(err) {
      return console.log.log(err)
    }

    files.forEach(function(file) {
       console.log(file, ' is file -> ',fs.lstatSync(path.join(basedir, file)).isFile())

    })

    next()

  })

}