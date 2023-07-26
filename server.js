const fs = require('fs');
const inquirer = require('inquirer');
const mySQL = require('mysql2');

// Making a connection with mySql credentials
const connection = mySQL.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'Alicris051!',
        database: 'employees_db'
    },
    console.log(`Connected to mySQL and database!`)
);

// Connecting to the database
connection.connect((err) => {
if (err) {
    console.log(err);
    res.status(400).send(err);
    }
    // Officially start the application
    start();
});


//How can this data be placed in our database?
const questions = [
    {
        type: "list",
        name: "promptStarter",
        message: "Hello, what would you like to see?",
        choices: ["View Departments", "View Roles", "View Employees", "Add a Department", "Add a Role", "Add an Employee", "Update Employee Role", "Exit"]
    }];

function start() {
    inquirer
        .prompt(questions).then((answer) => {
            switch (answer.promptStarter) {
                case "View Departments": viewDepartments();
                    break;
                case "View Roles": viewRoles();
                    break;
                case "View Employees": viewEmployees();
                    break;
                case "Add a Department": newDepartment();
                    break;
                case "Add a Role": newRole();
                    break;
                case "Add an Employee": newEmployee();
                    break;
                case "Update Employee Role": updateEmployee();
                    break;
                case "Exit": connection.end();
                console.log("Have a nice day!")
                    break;
            }
        });
}
//Pulling all of the departments from the database
function viewDepartments() {
    const query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if (err) {
        console.log(err)
        res.status(400).send(err);
        }
        //returning the table to the client
        console.table(res);
        // restart the application
        start();
    });
}

//Pulling all of the departments from the database
function viewRoles() {
    const query = "SELECT * FROM roles";
    connection.query(query, (err, res) => {
        if (err) {
        console.log(err);
        res.status(400).send(err);
        }
        //returning the table to the client
        console.table(res);
        // restart the application
        start();
    });
}

// function to view all employees
function viewEmployees() {
    const query = "SELECT * FROM employee";
    connection.query(query, (err, res) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
            }
            //returning the table to the client
            console.table(res);
            // restart the application
            start();
        });
    }

// //Inputting the new department name
// function newDepartment() {
//     inquirer
//         .prompt({
//             type: "input",
//             name: "departmentName",
//             message: "What is the department name?"
// }).then((answer) => {
//     console.log(answer.departmentName)
//     const query = 'INSERT INTO departments (departments_names VALUES ("${answer.DepartmentName}")';
//     connection.query(query, (err, res) => {
//         if (err)
//         )
// });
// }
// //Inputting a new role
// {
//     type: "input",
//         name: "newRoles",
//             message: "What is the role name?"
// },
// {
//     type: "input",
//         name: "newRoles",
//             message: "What is the salary for this role?"
// },
// {
//     type: "list",
//         name: "newRoles",
//             message: "What department does this role belong to?",
//                 choices: ["Accounting", "Sales", "Customer Service", "Technical Service"]
// },
// //Inputting a new employee
// {
//     type: "input",
//         name: "newEmployee",
//             message: "First name?"
// },
// {
//     type: "input",
//         name: "newEmployee",
//             message: "Last name?"
// },
// {
//     type: "list",
//         name: "newEmployee",
//             message: "Role?",
//                 choices: ["Manager", "Assistant Manager", "Office Administrator", "Sales Associate", "Customer Service Clerk", "Software Developer"],
//     },
// {
//     type: "input",
//         name: "newEmployee",
//             //How can I connect to an id in this question?
//             message: "Employee's Manager?"
// },
// {
//     type: "list",
//         name: "updateEmployee",
//             message: "Update Employee",
//                 //How can I combine the first name and last name?
//                 choices: ["first name, last name??"]
// },
// {
//     type: "list",
//         name: "updateEmployee",
//             message: "Select Role",
//                 choices: ["Manager", "Assistant Manager", "Office Administrator", "Sales Associate", "Customer Service Clerk", "Software Developer"]
// },
// ]

// //we want to trigger the data questions
// //would it be res.body.then the next const?


