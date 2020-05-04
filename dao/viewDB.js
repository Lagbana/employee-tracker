// Import database connection and CLI table dependencies
const connection = require('./connectDB')
const cTable = require('console.table')

/*
viewDB returns a CLI table from the human_Resources_DB database

*@param tableName {String} is the name of the table the user wants to view
*@param property {String} is the column name the user wants to order the table by
*/
const viewDB = async (tableName, property) => {
    try {
        const db = await connection("human_Resources_DB")
        const [tbRows] = await db.query(`SELECT * FROM ${tableName} ORDER BY ${property} ASC`)
        const table = await cTable.getTable(tbRows)
        return (`

${table}

            `)

    } catch (err) {
        console.log(err)
    } finally {
        const db = await connection("human_Resources_DB")
        db.end()
    }
}

module.exports = viewDB
