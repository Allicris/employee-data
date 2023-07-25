const fs = require('fs');
const inquirer = require('inquirer');
const mySQL = require('mysql2');

// Making a connection with mySql credentials
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'Alicris051!',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

// Connecting to the database
connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database!");
    // starting the application
    start();
});

//How can this data be placed in our database?
const questions = [
    {
        type: "list",
        name: "promptStarter",
        message: "Hello, what would you like to see?",
        choices: ["All Departments", "All Roles", "All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update Employee Role"]
    },
    //Inputting the new department name
    {
        type: "input",
        name: "newDepartments",
        message: "What is the department name?"
    },
    //Inputting a new role
    {
        type: "input",
        name: "newRoles",
        message: "What is the role name?"
    },
    {
        type: "input",
        name: "newRoles",
        message: "What is the salary for this role?"
    },
    {
        type: "list",
        name: "newRoles",
        message: "What department does this role belong to?",
        choices: ["Accounting", "Sales", "Customer Service", "Technical Service"]
    },
    //Inputting a new employee
    {
        type: "input",
        name: "newEmployee",
        message: "First name?"
    },
    {
        type: "input",
        name: "newEmployee",
        message: "Last name?"
    },
    {
        type: "list",
        name: "newEmployee",
        message: "Role?",
        choices: ["Manager", "Assistant Manager", "Office Administrator", "Sales Associate", "Customer Service Clerk", "Software Developer"],
    },
    {
        type: "input",
        name: "newEmployee",
        //How can I connect to an id in this question?
        message: "Employee's Manager?"
    },
    {
        type: "list",
        name: "updateEmployee",
        message: "Update Employee",
        //How can I combine the first name and last name?
        choices: ["first name, last name??"]
    },
    {
        type: "list",
        name: "updateEmployee",
        message: "Select Role",
        choices: ["Manager", "Assistant Manager", "Office Administrator", "Sales Associate", "Customer Service Clerk", "Software Developer"]
    },
]

inquirer
    .prompt(questions).then(response)
//we want to trigger the data questions
//would it be res.body.then the next const?


