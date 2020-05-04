// Import database connection dependency
const connection = require('./connectDB')

/*
    Role Class allows the adding or deleting of employee roles

    *@param constructor (options), where options = {} 
    *@param option properties: title = String, salary = Float, deparmentID = Integer
*/
class Role {
    // Connection module is inherited by default
    constructor(options = {}) {
        this.connection = connection
        this.title = options.title
        this.salary = options.salary
        this.departmentID = options.departmentID
    }
        /*
     addDept method: 
     - creates connection to database: "human_Resources_DB"
     - executes create department query, with class @param: this.departmentName
     - catches any errors, and ends the connection.
    */
   async addRole() {
    try {
        const db = await this.connection("human_Resources_DB")
        const action = await db.query(`INSERT INTO roles (title, salary, department_ID) VALUES ("${this.title}", "${this.salary}", "${this.departmentID}");`)
        console.log(`
            New role added to the database: ${this.title}
        `)
    } catch (err) {
        console.log(err)
    } finally {
        const db = await this.connection("human_Resources_DB")
        db.end()
    }
}
    /*
     getRolesIds method: 
    - creates connection to database: "human_Resources_DB"
    - executes SELECT query on the roles table
     *return = []
        # array of all roles IDs, to be used for create employee validation in index.js
    - catches any errors, and ends the connection.
    */
   async getRolesIds() {
    try {
        let result = []
        let db = await this.connection("human_Resources_DB")
        let [response] = await db.query(`SELECT id FROM roles`)
        for (let row of response) {
            result.push(row.id)
        }
        return result
    } catch (err) {
        console.log(err)
    } finally {
        const db = await this.connection("human_Resources_DB")
        db.end()
    }
}
/*
    getRoleNames method: 
    - creates connection to database: "human_Resources_DB"
    - executes SELECT query on the roles table
     *return = []
        # array of all role Names, to be used for user selection of roles to delete
    - catches any errors, and ends the connection.
    */
//    async getRoleNames() {
//     try {
//         let result = []
//         let db = await this.connection("human_Resources_DB")
//         let [response] = await db.query(`SELECT department_name FROM role`)
//         for (let row of response) {
//             result.push(row.department_name)
//         }
//         return result

//     } catch (err) {
//         console.log(err)
//     } finally {
//         const db = await this.connection("human_Resources_DB")
//         db.end()
//     }
// }
}

const test = new Role({title: "Test Engineer", salary: 100000, departmentID: 2})
test.addRole()


