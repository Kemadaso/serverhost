var express = require('express')
var router = express.Router()

var path = require('path')
const fs = require('fs')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/upload', function(req, res, next) {
  res.render('upload', { title: 'Express' })
})

router.post('/uploadfile', function(req, res, next) {
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

 let mifile = req.files.mifile
 //console.log(mifile)
 //return res.json(mifile.size)

 if(!mifile.truncated) {
    mifile.mv(path.join(global.__basedir,`/storage/${mifile.name}`), function(err) {
      if(err) {
        return res.status(500).send(err)
      }
    
      console.log('archivo subido')
      res.send('File Upload')
    
    })
 } else {
  try {
      fs.unlinkSync(mifile.tempFilePath)
      //file removed
    } catch(err) {
      console.error(err)
    }
    return res.status(500).send("size file was truncated")
 }



})



module.exports = router;
