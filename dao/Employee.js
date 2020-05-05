// Import database connection dependency
const connection = require('./connectDB')

/*
Employee Class allows the adding and deleting of employee roles, and the remaking of the joined employees table

*@param constructor (options), where options = {} 
*@param option properties: firstName = String, lastName = String, roleID = Integer, managerID = Integer
*/
class Employee {
    constructor(options = {}) {
        this.connection = connection
        this.firstName = options.firstName
        this.lastName = options.lastName
        this.roleID = options.roleID
        if (options.managerID === undefined) {
            this.managerID = null
        } else {
            this.managerID = options.managerID
        }
        this.managerName = options.managerName
        this.employeeID = options.employeeID
    }
    /*
     *joinTable method: 
        - updates join_table after employee table has been modified
    */

    async joinTable() {
        try {
            let db = await this.connection("human_Resources_DB")
            let result = await db.query(`
        DROP TABLE IF EXISTS joined_table; 
        
        CREATE TABLE joined_table 
        SELECT employees.id AS ID, employees.first_name AS First_Name, employees.last_name AS Last_Name, 
        employees.manager_ID AS Manager_ID, roles.title AS Title, roles.salary AS Salary, departments.department_name AS Department
        FROM ((departments
        LEFT JOIN roles ON departments.id = roles.department_ID)
        LEFT JOIN employees ON roles.id = employees.role_ID )
        WHERE employees.id IS NOT NULL AND roles.title IS NOT NULL AND departments.department_name IS NOT NULL
        ORDER BY ID ASC;

        ALTER TABLE joined_table 
        ADD Manager VARCHAR (30) NULL;

        UPDATE joined_table, 
        (
            SELECT ID, First_Name, Last_Name
            FROM joined_table 
            WHERE title LIKE '%Manager'
        ) as temp
        SET Manager = CONCAT(temp.First_Name, " ", temp.Last_Name) WHERE joined_table.Manager_ID = temp.ID AND Manager_ID is not NULL;
        `)
        } catch (err) {
            console.log(err)
        } finally {
            let db = await this.connection("human_Resources_DB")
            db.end()
        }

    }
    /*
     *addEmployee method: 
        - executes create employee query, with class @param: this.firstName, this.lastName, this.roleID, and this.managerID
    */
    async addEmployee() {
        try {
            let db = await this.connection("human_Resources_DB")
            let result = await db.query(`INSERT INTO employees (first_name, last_name, role_ID, manager_ID) 
                                         VALUES ("${this.firstName}", "${this.lastName}", "${this.roleID}", ${this.managerID});`)
            await this.joinTable()
        } catch (err) {
            console.log(err)
        } finally {
            console.log(`
            New employee added to the database: ${this.firstName} ${this.lastName} 
        `)
            let db = await this.connection("human_Resources_DB")
            db.end()
        }

    }
    /*
     *updateEmployeeRole method: 
        - executes update role query, with class @param: this.role, this.managerID, and this.employeeID
    */
    async updateEmployeeRole() {
        try {
            let db = await this.connection("human_Resources_DB")
            let action = await db.query(`UPDATE employees SET role_ID = "${this.roleID}", manager_ID = ${this.managerID} WHERE id = ${this.employeeID};`)
            await this.joinTable()
        } catch (err) {
            console.log(err)
        } finally {
            const db = await this.connection("human_Resources_DB")
            db.end()
        }
    }
    /*
     *updateEmployeeManager method: 
        - executes update manager query, with class @param: this.managerID and this.employeeID
    */
    async updateEmployeeManager() {
        try {
            let db = await this.connection("human_Resources_DB")
            let action = await db.query(`UPDATE employees SET manager_ID = ${this.managerID} WHERE id = ${this.employeeID};`)
            await this.joinTable()
        } catch (err) {
            console.log(err)
        } finally {
            const db = await this.connection("human_Resources_DB")
            db.end()
        }
    }
    /*
     *deleteEmployee method: 
        - executes delete employee query, with class @param: this.firstName, this.lastName AND this.employee
    */
    async deleteEmployee() {
        try {
            let db = await this.connection("human_Resources_DB")
            let action = await db.query(`DELETE FROM employees WHERE first_name = "${this.firstName}" AND last_name = "${this.lastName}" AND id = "${this.employeeID}";`)
            await this.joinTable()
        } catch (err) {
            console.log(err)
        } finally {
            console.log(`
            Deleted employee: " ${this.firstName} ${this.lastName} " from the database!
        `)
            const db = await this.connection("human_Resources_DB")
            db.end()
        }
    }
    /*
     *getManager method: 
        - executes get manager name query, with class @param: this.managerID
    */
    async getManagerID() {
        try {
            let db = await this.connection("human_Resources_DB")
            let [[action]] = await db.query(`SELECT DISTINCT Manager_ID FROM joined_table WHERE Manager = "${this.managerName}";`)
            return action.Manager_ID
        } catch (err) {
            console.log(err)
        } finally {
            const db = await this.connection("human_Resources_DB")
            db.end()
        }
    }
    /*
    *getManagerNames method: 
    - executes SELECT query on the joined table
     *return = []
        # an array of all manager Names
    */
    async getManagerNames() {
        try {
            let results = []
            let db = await this.connection("human_Resources_DB")
            let [response] = await db.query(`SELECT DISTINCT concat(First_Name, " ", Last_Name) AS "manager" FROM joined_table WHERE title LIKE '%Manager';`)
            for (let row of response) {
                results.push(row.manager)
            }
            return results
        } catch (err) {
            console.log(err)
        } finally {
            const db = await this.connection("human_Resources_DB")
            db.end()
        }
    }
    // select first_name, last_name from employees where id = 5;
    /*
    *getEmployeeNames method: 
    - executes SELECT query on the joined table
     *return = { [], [], [] }
        # an object of arrays containing full names, first names, last names
    */
   async getEmployeeNames() {
    try {
        let names = [], firstNames = [], lastNames = []
        let db = await this.connection("human_Resources_DB")
        let [response] = await db.query(`SELECT CONCAT(first_name, " ", last_name) AS name, first_name, last_name FROM employees;`)
        for (let row of response) {
            names.push(row.name)
            firstNames.push(row.first_name)
            lastNames.push(row.last_name)
        }
        let results = {names: names, firstNames: firstNames, lastNames: lastNames}
        return results
    } catch (err) {
        console.log(err)
    } finally {
        const db = await this.connection("human_Resources_DB")
        db.end()
    }
}
    /*
    *getEmployeeID method: 
    - executes SELECT query on the employees table
     *return = Integer, employee ID
    */
   async getEmployeeID() {
    try {
        let db = await this.connection("human_Resources_DB")
        let [[response]] = await db.query(`SELECT id from employees WHERE first_name = "${this.firstName}" AND last_name = "${this.lastName}";`)
        return response.id
    } catch (err) {
        console.log(err)
    } finally {
        const db = await this.connection("human_Resources_DB")
        db.end()
    }
}
}
module.exports = Employee

