// Import database connection and CLI table dependencies
const mysql = require("mysql2/promise")

/*
Function: sets database connection parameters and establishes connection to requested database

*@param database {String} name of MySQL database the user connects to
*/
async function connect(database) {
    const connectionOptions = {
        host: 'localhost',
        port: 3306,
        user: "root",
        database,
        password: "Jameslives@2091",
        multipleStatements: true
    }
    return await mysql.createConnection(connectionOptions)
}
module.exports = connect