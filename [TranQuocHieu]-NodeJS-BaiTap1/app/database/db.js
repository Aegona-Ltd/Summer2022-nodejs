const mysql = require('mysql')
const { createTable } = require('./createTable')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'contact_db'
})

createTable(db);

module.exports = db;
