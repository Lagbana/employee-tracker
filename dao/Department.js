// Import database connection dependency
const connection = require('./connectDB')

/*
    Department Class allows the adding and deleting of a department, as well as retrieval of department ids
    *@param constructor (departmentName), where departmentName = String 
*/
class Department {
    // Connection module is inherited by default
    constructor(options={}) {
        this.connection = connection
        this.departmentName = options.departmentName
    }
    /*
     *addDept method: 
        - executes create department query, with class @param: this.departmentName
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
     *deleteDept method: 
        - executes delete department query, with class @param: this.departmentName
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
     *getdeptIds method: 
        - executes SELECT query on the departments table by ordered IDS
        *return = []
            # array of all department IDs, to be used for create role validation in index.js
    */
    async getDeptIds() {
        try {
            let result = []
            let db = await this.connection("human_Resources_DB")
            let [response] = await db.query(`SELECT id FROM departments ORDER BY id ASC`)
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
     *getdeptNames method: 
        - executes SELECT query on the departments table
         *return = []
            # array of all department Names, to be used for user selection of department to delete
    */
    async getDeptNames() {
        try {
            let result = []
            let db = await this.connection("human_Resources_DB")
            let [response] = await db.query(`SELECT department_name FROM departments ORDER BY department_name ASC`)
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
    /*
     *getDeptBudget method: 
        - executes SUM query on the salary column of joined_table
         *return = Float
            # budget for a queried department
    */
    async getDeptBudget() {
        try {
            let db = await this.connection("human_Resources_DB")
            let [[result]] = await db.query(`SELECT SUM(Salary) FROM joined_table WHERE Department = "${this.departmentName}";`)
            let budget = result["SUM(Salary)"]
            return budget

        } catch (err) {
            console.log(err)
        } finally {
            const db = await this.connection("human_Resources_DB")
            db.end()
        }
    }
}
module.exports = Department