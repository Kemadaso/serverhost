var express = require('express')
var fs = require('fs')
var path = require('path')
const { request } = require('http')
var router = express.Router()

const basedir = path.join(global.__basedir, 'storage')

/* GET users listing. */
router.get('/root/:folder?', function(req, res, next) {

  let folder = req.params.folder ? path.join(basedir, req.params.folder) : basedir
  //console.log(fs.readdirSync(path.join(basedir, folder)))

  
  
  try {
    let files = fs.readdirSync(folder)
    
    files = files.map(item => {
      let type = fs.statSync(path.join(folder, item))
      let extension = ''
      let pathfile = req.params.folder

      if(type.isDirectory()) {
        type = 'directory'
        pathfile = item
      } else if(type.isFile()) {
        type = 'file'
        extension = path.extname(item).substr(1)
        //pathfile = `${pathfile}---------${item}`
        if(pathfile) {
          pathfile = `${pathfile}--dirseparator--${item}`
        }
      }

      return {
        item,
        type,
        extension,
        pathfile 
      }

    })

    //console.log(files)
    res.json(files)
  } catch(err) {
    // An error occurred
    //console.error(err)
    res.json([])
  }

  

})


router.get('/root/remove/:item', function(req, res, next) {
  console.log(req.params.item)
  if(req.params.item != '') { 

    let pathfile = req.params.item.split('--dirseparator--')
    let item = path.join(basedir, pathfile[0])
    if(pathfile[1]) {
      item = path.join(basedir, pathfile[0], pathfile[1])
    }

    
    if(fs.existsSync(item)) {
      let type = fs.statSync(item)
      if(type.isDirectory()) {
        fs.rmdirSync(item, { recursive: true })
      } else if(type.isFile()) {
        fs.unlinkSync(item)
      }
      return res.json({success: true})

    }

  }
  
  return res.json({success: false})


})

module.exports = router
