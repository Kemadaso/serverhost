var express = require('express')
var router = express.Router()

var path = require('path')
const fs = require('fs')
const helper = require('../src/helpers')


/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})*/

router.get('/upload', function(req, res, next) {
  res.render('upload', { title: 'Express' })
})

router.post('/uploadfile', function(req, res, next) {

  console.log(req.files)
  console.log(req.body)
  //return res.json(req.body)
  const namefolder = helper.string_to_slug(req.body.namefolder)
  let subfolder = path.join(global.__basedir,`/storage/${namefolder}`)

  /*
  {
    "name":"esa gente Huaycan Instituto.mp4",
    "data":{
      "type":"Buffer",
      "data":[]
    },
    "size":2840578,
    "encoding":"7bit",
    "tempFilePath":"/mnt/e/nodeprojects/serverhost/tmp/tmp-3-1598249347409",
    "truncated":false,
    "mimetype":"video/mp4",
    "md5":"8758f507dc60e5b39f8ea82e25d5850d"
  }
  */

 //let mifile = req.files.mifile
 let mifile = req.files.files
 //console.log(mifile)
 //return res.json(mifile.size)

  if (!fs.existsSync(subfolder)){
    fs.mkdirSync(subfolder)
  } else {
    subfolder = path.join(global.__basedir,`/storage/${namefolder}-${helper.makeid(5)}`)
    fs.mkdirSync(subfolder)
  }

  for(const file of req.files.files) {

    if(!file.truncated) {
      file.mv(path.join(subfolder,`${file.name}`), function(err) {
        console.log(err)
        if(err) {
          //return res.status(500).send(err)
        }
        //console.log('archivo subido')
      })
    } else {
      try {
          fs.unlinkSync(file.tempFilePath)
          //file removed
        } catch(err) {
          console.error(err)
        }
        //return res.status(500).send("size file was truncated")
    }

  }

  res.send('File Upload')

 



})



module.exports = router;
