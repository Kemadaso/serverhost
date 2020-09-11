const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
const path = require('path')


let connect = function() {
  return new Promise(async(resolve, reject) => {

    const db = await sqlite.open({
      filename: path.join(__dirname, `../database.db`),
      driver: sqlite3.Database
    })

    db.on('trace', (data) => {
      console.log(data)
    })

    await db.exec(`CREATE TABLE IF NOT EXISTS config (
        site varchar(50) UNIQUE,
        value text
      )`)

    await db.exec(`CREATE TABLE IF NOT EXISTS links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        site varchar(50),
        post_id INT,
        value text
      )`)

  
    resolve(db)

  
  })

}


module.exports = connect