// Import Dependencies
const inquirer = require("inquirer")
const validate = require("./inputValidation")
const viewDB = require("./dao/viewDB")  // * module import from dao directory
const Department = require("./dao/Department")   // * Class import from dao directory
const Role = require("./dao/Role")  // * Class import from dao directory
const Employee = require("./dao/Employee")  // * Class import from dao directory

// Create re-usable Class instances, for Department, Role, and Employee
const getDepartment = new Department()
const getRole = new Role()
const getEmployee = new Employee()

/*
    Function, console log requested table
    *@param tableName => database table | property => column name in the table to order table by
*/
async function viewData(tableName, property) {
    const result = await viewDB(tableName, property)
    console.log(result)
}
//  *Function => displays employees by queried manager
async function viewByManager(){
        // Get list of all managers
        let managerList = await getEmployee.getManagerNames()

            let question = [
            {
                type: 'list',
                message: 'View employees by manager',
                name: 'manager',
                choices: managerList
            }
        ]
        try {
            const response = await inquirer.prompt(question)

            // Get employees table using Employee class method: getManagerEmployees and manager choice
            let employees = new Employee({ managerName: response.manager})
            let table = await employees.getManagerEmployees()
            console.log(table)
        } catch (err) {
            console.log(err)
        }
}
//  *Function => displays employees by queried manager
async function viewByDepartment(){
        // Get list of all departments
        let departmentList = await getDepartment.getDeptNames()

            let question = [
            {
                type: 'list',
                message: 'View employees by department',
                name: 'department',
                choices: departmentList
            }
        ]
        try {
            const response = await inquirer.prompt(question)

            // Get employees table using Employee class method: getDepartmentEmployees and department choice
            let employees = new Employee({ department: response.department})
            let table = await employees.getDepartmentEmployees()
            console.log(table)
        } catch (err) {
            console.log(err)
        }
}
//  *Function => adds department to the database departments table
async function createDepartment() {
    let question = [
        {
            type: 'input',
            message: 'Enter the new department name',
            name: 'newDept',
            validate: validate.validateDepartmentName
        }
    ]
    try {
        const response = await inquirer.prompt(question)
        // Add department using user input and executing addDept Class method
        let newDepartment = new Department({ departmentName: response.newDept })
        return newDepartment.addDept()
    } catch (err) {
        console.log(err)
    }
}
//  *Function => creates a new Role to the database roles table
async function createRole() {
    let departmentList = await getDepartment.getDeptNames()
    let question = [
        {
            type: 'input',
            message: 'Enter the new role name',
            name: 'newRole',
            validate: validate.validateRoleName
        },
        {
            type: 'input',
            message: 'Enter the new role salary',
            name: 'salary',
            validate: validate.validateSalary
        },
        {
            type: 'list',
            message: 'Choose the department for the new role',
            name: 'department',
            choices: departmentList
        }
    ]
    try {
        const response = await inquirer.prompt(question)
        const department = new Department({ departmentName: response.department })

        // Get department id using the department name and use it create a new role using the addRole Class method
        const id = await department.getDepartmentID()
        let newRole = new Role({ title: response.newRole, salary: response.salary, departmentID: id })
        return await newRole.addRole()
    } catch (err) {
        console.log(err)
    }
}
//  *Function => creates a new Employee to the database employee table
async function createEmployee() {
    let roleList = await getRole.getRoleNames()
    let managerList = await getEmployee.getManagerNames()
    managerList.push("N/A")

    let question = [
        {
            type: 'input',
            message: `Enter the new employee's first name`,
            name: `firstName`,
            validate: validate.validateFirstName
        },
        {
            type: 'input',
            message: `Enter the new employee's last name`,
            name: `lastName`,
            validate: validate.validateLastName
        },
        {
            type: 'list',
            message: 'Choose the role for the new employee',
            name: 'role',
            choices: roleList
        },
        {
            type: 'list',
            message: 'Assign a manager to the new employee',
            name: 'manager',
            choices: managerList
        }
    ]
    try {
        const response = await inquirer.prompt(question)
        // Getting role id using the role name from the inquirer option
        const role = new Role({ title: response.role })
        const id = await role.getRoleID()

        // Getting manager id using the manager name from the inquirer option
        const manager = new Employee({ managerName: response.manager })
        const manager_ID = await manager.getManagerID()
        // Add new employee using Employee class method: addEmployee
        let newEmployee = new Employee({ firstName: response.firstName, lastName: response.lastName, roleID: id, managerID: manager_ID })
        return await newEmployee.addEmployee()
    } catch (err) {
        console.log(err)
    }
}
//  *Function => updates the employee role and updates the joined table
async function updateEmployeeRole() {
    let roleList = await getRole.getRoleNames()
    let managerList = await getEmployee.getManagerNames()
    // Insert N/A into the manager options, in case an employee has no manager
    managerList.push("N/A")
    // get an object of three arrays of CONCAT names, first names, and last names
    let employeeObj = await getEmployee.getEmployeeNames()

    let question = [
        {
            type: 'list',
            message: `Choose the employee's name`,
            name: `fullName`,
            choices: employeeObj.names
        },
        {
            type: 'list',
            message: `Enter the employee's new role`,
            name: `role`,
            choices: roleList
        },
        {
            type: 'list',
            message: 'Assign a manager to the employee',
            name: 'manager',
            choices: managerList
        }
    ]
    try {
        const response = await inquirer.prompt(question)
        // Get selected name index and use index to get first name and last name
        let nameIndex = employeeObj.names.indexOf(response.fullName)
        let firstname = employeeObj.firstNames[nameIndex]
        let lastname = employeeObj.lastNames[nameIndex]
        // Get employee ID using *@params firstname and lastname
        let employee_ID = await new Employee({ firstName: firstname, lastName: lastname }).getEmployeeID()

        // Getting role id using the role name from the inquirer option
        const role = new Role({ title: response.role })
        const id = await role.getRoleID()

        // Getting manager id using the manager name from the inquirer option
        const manager = new Employee({ managerName: response.manager })
        const manager_ID = await manager.getManagerID()

        // Update employee role using Employee class method: updateEmployeeRole
        let employee = new Employee({ employeeID: employee_ID, roleID: id, managerID: manager_ID })
        return await employee.updateEmployeeRole()
    } catch (err) {
        console.log(err)
    }
}
//  *Function => updates the employee manager and updates the joined table
async function updateEmployeeManager() {
    // Insert N/A into the manager options, in case an employee has no manager
    let managerList = await getEmployee.getManagerNames()
    managerList.push("N/A")
    // get an object of three arrays of CONCAT names, first names, and last names
    let employeeObj = await getEmployee.getEmployeeNames()

    let question = [
        {
            type: 'list',
            message: `Choose the employee's name`,
            name: `fullName`,
            choices: employeeObj.names
        },
        {
            type: 'list',
            message: 'Assign a new manager to the employee',
            name: 'manager',
            choices: managerList
        }
    ]
    try {
        const response = await inquirer.prompt(question)
        // Get selected name index and use index to get first name and last name
        let nameIndex = employeeObj.names.indexOf(response.fullName)
        // Get employee ID using *@params firstname and lastname
        let firstname = employeeObj.firstNames[nameIndex]
        let lastname = employeeObj.lastNames[nameIndex]
        let employee_ID = await new Employee({ firstName: firstname, lastName: lastname }).getEmployeeID()

        // Getting manager id using the manager name from the inquirer option
        const manager = new Employee({ managerName: response.manager })
        const manager_ID = await manager.getManagerID()

        // Update employee using Employee class method: updateEmployeeManager
        let employee = new Employee({ employeeID: employee_ID, managerID: manager_ID })
        return await employee.updateEmployeeManager()
    } catch (err) {
        console.log(err)
    }
}
//  *Function => removes an employee from the employees table and updates the joined table
async function removeEmployee() {
    let employeeObj = await getEmployee.getEmployeeNames()
    let question = [
        {
            type: 'list',
            message: `Choose the employee to remove from the database`,
            name: `fullName`,
            choices: employeeObj.names
        }
    ]
    try {
        const response = await inquirer.prompt(question)

        // Getting employee id using the employee first and last namea from the inquirer choices
        let nameIndex = employeeObj.names.indexOf(response.fullName)
        let firstname = employeeObj.firstNames[nameIndex]
        let lastname = employeeObj.lastNames[nameIndex]
        let employee_ID = await new Employee({ firstName: firstname, lastName: lastname }).getEmployeeID()


        // Add new employee using Employee class method: addEmployee
        let employee = new Employee({ firstName: firstname, lastName: lastname, employeeID: employee_ID })
        return await employee.deleteEmployee()
    } catch (err) {
        console.log(err)
    }
}
//  *Function => removes a role from the roles table
async function removeRole() {
    let departmentList = await getDepartment.getDeptNames()
    let roleList = await getRole.getRoleNames()
    let question = [
        {
            type: 'list',
            message: 'Choose the role to remove',
            name: 'role',
            choices: roleList
        },
        {
            type: 'list',
            message: 'Choose the department of the role to remove',
            name: 'department',
            choices: departmentList
        }
    ]
    try {
        const response = await inquirer.prompt(question)
        // Use input database name and use it to get the department ID
        const department = new Department({ departmentName: response.department })
        const id = await department.getDepartmentID()
        // Remove role using @param role and department ID and deleteRole method
        let role = new Role({ title: response.role, departmentID: id })
        return await role.deleteRole()
    } catch (err) {
        console.log(err)
    }
}
//  *Function => removes a department from the departments table
async function removeDepartment() {
    // get an array of department names
    let departmentList = await getDepartment.getDeptNames()
    let question = [
        {
            type: 'list',
            message: 'Choose the department to remove',
            name: 'department',
            choices: departmentList
        }
    ]
    try {
        const response = await inquirer.prompt(question)
        // Use department as @param to delete the department and deleteDept method
        const department = new Department({ departmentName: response.department })
        return await department.deleteDept()
    } catch (err) {
        console.log(err)
    }
}
//  *Function => calculates and returns a department's budget
async function departmentBudget() {
    // get an array of department names
    const departmentList = await getDepartment.getDeptNames()
    let budgtQuestion = [
        {
            type: 'list',
            message: `What department's budget do you need to calculate?`,
            name: 'budgetDepartment',
            choices: departmentList
        }
    ]
    try {
        const response = await inquirer.prompt(budgtQuestion)
        // Get the department budget using the @param department and applying the getDeptBudget Class method
        const budgetDepartment = new Department({ departmentName: response.budgetDepartment })
        let budget = await budgetDepartment.getDeptBudget()

        console.log(`
        The budget for the ${response.budgetDepartment} department is: $ ${budget}`)
    } catch (err) {
        console.log(err)
    }
}
// Main menu options for application
let mainMenu = [
    {
        type: 'list',
        message: 'what do you want to do?',
        name: 'action',
        choices: ["Exit", "View all employees", "View all departments", "View all roles", "View employees by department", "View employees by manager", "Add Department", "Add Role",
            "Add employee", "Update employee role", "Update employee manager", "Remove Department", "Remove Role", "Remove employee", "Department budget"]
    }
]
// *Function => executes the main menu
async function start() {
    const userChoice = await inquirer.prompt(mainMenu)
    return userChoice.action
}
// *Object of Main menu keys and functions to be executed in the application
const userChoices = {
    "Exit": () => process.exit(),
    "View all employees": () => viewData('joined_table', 'ID'),
    "View all departments": () => viewData('departments', 'id'),
    "View all roles": () => viewData('roles', 'id'),
    "View employees by department": () => viewByDepartment(),
    "View employees by manager": () => viewByManager(),
    "Add Department": () => createDepartment(),
    "Add Role": () => createRole(),
    "Add employee": () => createEmployee(),
    "Update employee role": () => updateEmployeeRole(),
    "Update employee manager": () => updateEmployeeManager(),
    "Remove Department": () => removeDepartment(),
    "Remove Role": () => removeRole(),
    "Remove employee": () => removeEmployee(),
    "Get department budget": () => departmentBudget()
}
// Application executing function
async function app() {
    console.log(`
    +==================================================================+
    |                    HUMAN RESOURCES MANAGER                       |
    |                           Version 1.0                            |
    +==================================================================+
    `)
    let response = null
    // Looping of Main menu options, program terminates on user choice "Exit"
    while (!response || response !== "Exit") {
        console.log(`
        Enter new action or enter "Exit" to end session.
       `)

        let response = await start()
        if (response) await userChoices[response]()
        
        console.log(`
      `)
    }
}
app()