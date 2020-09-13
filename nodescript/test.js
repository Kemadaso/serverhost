const path = require('path')
const fs = require('fs')
const {exec, execSync} = require('child_process')


let command = `python /mnt/e/nodeprojects/serverhost/python/vidoo.py`

//let command = `curl -F file=@/mnt/e/nodeprojects/serverhost/storage/1922mp4/capture-video.png https://srv-file6.gofile.io/uploadFile`
command  = execSync(command)

let output = command.toString('utf8')

console.log(output)
