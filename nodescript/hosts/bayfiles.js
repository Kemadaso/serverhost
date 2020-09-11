const path = require('path')
const fs = require('fs')
const {exec, execSync} = require('child_process')



module.exports = function(files = []) {

  return new Promise((resolve, reject) => {

    let results = []


    for(const f of files) {
      let command = `curl -s \
      https://api.bayfiles.com/upload?token=3920895f095f5e82 \
      -F 'file=@${f}'`

      //let command = `curl -F file=@/mnt/e/nodeprojects/serverhost/storage/1922mp4/capture-video.png https://srv-file6.gofile.io/uploadFile`
      command  = execSync(command)
      try {
        let output = JSON.parse(command.toString('utf8'))
        console.log(output.data.file.url.full)
        results.push(output.data.file.url.full)
      } catch (error) { console.log(error)}

    }

    resolve(results)


  })

}
