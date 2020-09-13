
(async() => {
  const argv = require('minimist')(process.argv.slice(2))
  const http = require('axios')
  const path = require('path')
  const fs = require('fs')

  const gofile = require('./hosts/gofile')
  const uptobox = require('./hosts/uptobox')
  const bayfiles = require('./hosts/bayfiles')


  let proccess = []

  if(Array.isArray(argv.f)) {
    for (const f of argv.f) {
      proccess.push(path.join(__dirname, `../storage/`, f))
    }
  } else {
    proccess.push(path.join(__dirname, `../storage/`, argv.f))
  }

  //console.log(proccess)

  proccess = await bayfiles(proccess)


  return console.log(proccess)

})()
//tove-lo-habitsmp4/T0V3-l0-h4b1TsmP4.rar












