const path = require('path')
const fs = require('fs')
const {exec, execSync} = require('child_process')



module.exports = function(files = []) {

  return new Promise((resolve, reject) => {

    let results = []

    let uploadLink  = execSync(`curl -s --data "token=8c0190dddb263f12c2144" -X GET  https://uptobox.com/api/upload`)
    //console.log(uploadLink)
    
    try {
      uploadLink = JSON.parse(uploadLink.toString('utf8'))
      console.log(uploadLink)
      uploadLink  = uploadLink.data.uploadLink
    } catch (error) {
      uploadLink = 'srv-file6'
    }
  

    for(const f of files) {
      let command = `curl -s -X POST \
      https:${uploadLink} \
      -H 'content-type: multipart/form-data' \
      -F 'file=@${f}'`

      //let command = `curl -F file=@/mnt/e/nodeprojects/serverhost/storage/1922mp4/capture-video.png https://srv-file6.gofile.io/uploadFile`
      command  = execSync(command)
      try {
        let output = JSON.parse(command.toString('utf8'))
        console.log(output)
        
        
      } catch (error) { console.log(error)}

    }

    resolve(results)


  })

}
