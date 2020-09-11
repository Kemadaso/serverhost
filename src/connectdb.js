
const path = require('path')



module.exports = function () {
  
  return new Promise(async (resolve, rejects) => {

    const knex = require('knex')({
      client: 'sqlite3',
      connection: {
        filename: path.join(__dirname, '../database.db'),
      },
      useNullAsDefault: true
    })
 
    let exists = await knex.schema.hasTable('config')
    if(!exists) {
      await knex.schema.createTable('config', table => {
        table.string('site').unique()
        table.text('value')
      })
    }
  
    exists = await knex.schema.hasTable('links')
    if(!exists) {
      await knex.schema.createTable('links', table => {
        table.increments('id').primary()
        table.string('site', 50)
        table.integer('post_id')
        table.text('value')
      })
    }
  
    resolve(knex) 
  
  })

}



