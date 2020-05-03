const mysql = require("mysql2/promise")


async function connect(database) {
    const connectionOptions = {
        host: 'localhost',
        port: 3306,
        user: "root",
        database,
        password: "Jameslives@2091"
    }

    return await mysql.createConnection(connectionOptions)
    // .then(connection => {
    //     console.log(`connected to DB as id: ${connection.threadId}`)
    // })
    // .catch(err => {
    //     console.log('error connecting to DB: ' + err.stack)
    //     process.exit(1) // Quit node if there is no DB connection
    // })

}


module.exports = connect