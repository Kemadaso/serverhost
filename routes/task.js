let express = require('express')
let fs = require('fs')
let path = require('path')
let router = express.Router()
let helper = require('../src/helpers')

const {exec, execSync} = require('child_process')

const basedir = path.join(global.__basedir, 'storage')

/* GET users listing. */
router.get('/:folder', function(req, res, next) {

  let folder = path.join(basedir, req.params.folder)
  console.log(req.params.folder)
  

  if(fs.existsSync(folder)) {

    let files = fs.readdirSync(folder)
    let pathfile = ''
    for(const f of files) {
      let ext = path.extname(f).substr(1)
      if(['mp4', 'avi', 'mkv'].includes(ext)) {
        pathfile = path.join(folder, f)
        break
      }
    }

    const capture = path.join(folder, `capture-video.png`)


    let command_generatethumbnailvideo = `
        vcsi "${pathfile}" \
        -t \
        -w 980 \
        -g 2x3 \
        --end-delay-percent 20 \
        --metadata-font /mnt/c/Windows/Fonts/arialbd.ttf \
        --timestamp-font /mnt/c/Windows/Fonts/arialbd.ttf \
        -o  "${capture}"`

    const exec_generatethumbnailvideo  = execSync(command_generatethumbnailvideo)
    console.log(exec_generatethumbnailvideo.toString('utf8'))
    if(exec_generatethumbnailvideo) {
      //console.log('exec_generatethumbnailvideo')
      //let exec_generatezip = `zip -r -D "${path.join(folder, 'compress.zip')}" "${folder}" `
      //let exec_generatezip = `zip -r -D "compress.zip" "${folder}" `
      //let exec_generatezip = `zip -r -s 1000m "compressorfile.zip" ./ `
      const megabyte = `1000M`
      const password = `pelisfull.tv`

      let exec_generatezip = `rar a -p${password} -v${megabyte} "${helper.namerar(req.params.folder)}.rar" ./`

      exec(exec_generatezip, {cwd: folder}, function(err, stdout, stderr) {

      })
      //console.log(exec_generatezip.toString('utf8'))
      res.json({ok: true})

    }


  }
    


})




module.exports = router
