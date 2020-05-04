// const mysql = require("mysql2/promise")
const inquirer = require("inquirer")
// var cTable = require('console.table');
const viewDB = require("./dao/viewDB")

let options = [
    {
        type: 'list',
        message: 'what do you want to do?',
        name: 'action',
        choices: ["View all employees", "View all employees by department", "View all employees by manager", "View all employees by job title", "Add employee",
            "Remove employee", "Update role", "Update employee", "Update manager", "Exit"]
    }
]

async function viewData(tableName, property) {
    const result = await viewDB(tableName, property)
    console.log(result)
}

async function start() {
    const userChoice = await inquirer.prompt(options)
    return userChoice.action
}

async function app() {
    let exit = false
    let choice

    while (!exit){
        choice = await start()

        switch (choice) {
            case "View all employees":
                viewData ('joined_table', 'ID')
                break;
            case "View all employees by department":
                viewData ('joined_table', 'Department')
                break;
            case "View all employees by manager":
                viewData ('joined_table', 'Manager')
                break;
            case "View all employees by job title":
                viewData ('joined_table', 'Title')
                break;
            case "Exit":
                console.log(`
                Session Over!
                `)
                exit = true
                return process.exit(0);
                // break;

        }

    }

}

app ()

// const userChoices = {
//     "View all employees": viewData('joined_table', 'ID'),
//     "View all employees by department": viewData('joined_table', 'Department'),
//     "View all employees by manager": viewData('joined_table', 'Manager'),
//     "View all employees by job title": viewData('joined_table', 'Title'),
//     "Exit": "Session Over!"
// }
// : process.exit(22)
// console.log("I got here!")

// async function app() {
 
//     for (let choice in userChoices) {
//         let response = await start()
//         if (choice === response) {
//             return await userChoices.choice
//         }
//     }
// }

// app()