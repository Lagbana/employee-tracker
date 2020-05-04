// Import database connection dependency
const connection = require('./connectDB')

/*
    Department Class allows the adding and deleting of a department, as well as retrieval of department ids
    *@param constructor (departmentName), where departmentName = String 
*/
class Department {
    // Connection module is inherited by default
    constructor(departmentName) {
        this.connection = connection
        this.departmentName = departmentName
    }
    /*
     addDept method: 
     - creates connection to database: "human_Resources_DB"
     - executes create department query, with class @param: this.departmentName
     - catches any errors, and ends the connection.
    */
    async addDept() {
        try {
            const db = await this.connection("human_Resources_DB")
            const action = await db.query(`INSERT INTO departments (department_name) VALUES ("${this.departmentName}")`)
            console.log(`
                New department added to the database: ${this.departmentName}
            `)
        } catch (err) {
            console.log(err)
        } finally {
            const db = await this.connection("human_Resources_DB")
            db.end()
        }
    }
    /*
     deleteDept method: 
    - creates connection to database: "human_Resources_DB"
    - executes delete department query, with class @param: this.departmentName
    - catches any errors, and ends the connection.
    */
    async deleteDept() {
        try {
            let db = await this.connection("human_Resources_DB")
            let action = db.query(`DELETE FROM departments WHERE department_name = "${this.departmentName}"`)
            console.log(`
                Department: ${this.departmentName} has been deleted from the database!
            `)
        } catch (err) {
            console.log(err)
        } finally {
            const db = await this.connection("human_Resources_DB")
            db.end()
        }
    }
    /*
     getdeptIds method: 
    - creates connection to database: "human_Resources_DB"
    - executes SELECT query on the departments table
     *return = []
        # array of all department IDs, to be used for create role validation in index.js
    - catches any errors, and ends the connection.
    */
    async getDeptIds() {
        try {
            let result = []
            let db = await this.connection("human_Resources_DB")
            let [response] = await db.query(`SELECT id FROM departments`)
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
    getdeptNames method: 
    - creates connection to database: "human_Resources_DB"
    - executes SELECT query on the departments table
     *return = []
        # array of all department Names, to be used for user selection of department to delete
    - catches any errors, and ends the connection.
    */
    async getDeptNames() {
        try {
            let result = []
            let db = await this.connection("human_Resources_DB")
            let [response] = await db.query(`SELECT department_name FROM departments`)
            for (let row of response) {
                result.push(row.department_name)
            }
            return result

        } catch (err) {
            console.log(err)
        } finally {
            const db = await this.connection("human_Resources_DB")
            db.end()
        }
    }

}

module.exports = Department