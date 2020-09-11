const path = require('path')
const fs = require('fs')
const {exec, execSync} = require('child_process')



module.exports = function(files = []) {

  return new Promise((resolve, reject) => {

    let results = []

    let server  = execSync(`curl -s https://apiv2.gofile.io/getServer`)
    try {
      server = JSON.parse(server.toString('utf8'))
      server  = server.data.server
    } catch (error) {
      server = 'srv-file6'
    }
  

    for(const f of files) {
      let command = `curl -s -X POST \
      https://${server}.gofile.io/uploadFile \
      -H 'content-type: multipart/form-data' \
      -F 'file=@${f}'`

      //let command = `curl -F file=@/mnt/e/nodeprojects/serverhost/storage/1922mp4/capture-video.png https://srv-file6.gofile.io/uploadFile`
      command  = execSync(command)
      try {
        let output = JSON.parse(command.toString('utf8'))
        //console.log(data)
        if(output.data.code) {
          results.push(`https://gofile.io/d/${output.data.code}`)
        }
        
      } catch (error) { console.log(error)}

    }

    resolve(results)


  })

}
