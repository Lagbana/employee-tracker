const cTable = require('console.table')
// const mysql = require('mysql2/promise')
const connection = require('./connectDB')



const viewDB = async (tableName, value) => {
    
    try {
        const db = await connection("db_table")
        const [tbRows] = await db.query(`SELECT * FROM ${tableName} ORDER BY ${value} ASC`)
        const table = cTable.getTable(tbRows)
        console.log(`
${table}
            `)

    } catch (err) {
        console.log(err)
    } finally {
        const db = await connection("db_table")
        db.end()
    }
}

// ------------------------------------
//  Working Commands for single tables
// ------------------------------------

// viewDB('db_table', 'ID')
// viewDB('db_table', 'Title')
// viewDB('db_table', 'Manager')
// viewDB('db_table', 'Department')


// ------------------------------------
//  Working Commands for single tables
// ------------------------------------

// viewDB('employees', 'id')
// viewDB('roles', 'id')
// viewDB('departments', 'id')

module.exports = viewDB()
