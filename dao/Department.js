
// const cTable = require('console.table')
const connection = require('./connectDB')

class Department {
    constructor(departmentName) {
        this.connection = connection
        this.departmentName = departmentName
    }

    async addDept() {
        try {
            const db = await this.connection("human_Resources_DB")
            const action = await db.query(`INSERT INTO departments (department_name) VALUES ("${this.departmentName}")`)
            console.log(action)
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

    async deleteDept () {
        try{
            let db = await this.connection("human_Resources_DB")
            let action = db.query(`DELETE FROM departments WHERE department_name = ${this.departmentName}`)
            console.log(action)
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


}

const test = new Department("Test")

console.log(test.addDept())