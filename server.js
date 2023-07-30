const fs = require('fs');
const inquirer = require('inquirer');
const mySQL = require('mysql2');
const { title } = require('process');

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
    const query = "SELECT employee.id, employee.first_name, employee.last_name, roles.title, departments.names AS departments, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN roles on employee.role_id = roles.id LEFT JOIN departments on roles.department_id = departments.id LEFT JOIN employee manager on manager.id = employee.manager_id;";
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

//Inputting the new department name
function newDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: 'newDep',
            message: 'What is the new department you would like to add?'
        },
    ]).then(answer => {
        connection.query('INSERT INTO departments SET ?', {
            names: answer.newDep,
        })
    })
    start()
}

function newRole() {
    const query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        };
        let departmentIDs = res.map(emp => ({ name: emp.names, value: emp.id }))
        // console.log(departmentIDs)

        inquirer
            .prompt([
                {
                    type: "input",
                    name: "title",
                    message: "What is the new role you would like to add?",
                },
                {
                    type: "input",
                    name: "salary",
                    message: "What is the new roles salary? Do not add a comma.",
                },
                {
                    type: "list",
                    name: "department",
                    message: "What is the new role department ID?",
                    choices: departmentIDs,
                },
            ])
            .then((answers => {
                const query = "INSERT INTO roles SET ?";
                connection.query(query,
                    {
                        title: answers.title,
                        salary: answers.salary,
                        department_id: answers.department,
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log(
                            `Added role ${answers.title} with salary ${answers.salary} to the ${answers.department} department in the database!`
                        );
                        start();
                    }
                );
            }));
    })
}

function newEmployee() {
    //Getting all roles from database
    const query = "SELECT id, title FROM roles"
    connection.query(query, (err, res) => {
        if (err) {
            console.log(err);
        }
        const roles = res.map(({ id, title }) => ({
            name: title,
            value: id,
        }));
        //Getting all employees from database to use as managers
        connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee",
            (err, res) => {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                }
                const managers = res.map(({ id, name }) => ({
                    name: name,
                    value: id,
                }));
                inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "firstName",
                            message: "Enter the employee's first name.",
                        },
                        {
                            type: "input",
                            name: "lastName",
                            message: "Enter the employee's last name.",
                        },
                        {
                            type: "list",
                            name: "role",
                            message: "What is the employee's role?",
                            choices: roles,
                        },
                        {
                            type: "list",
                            name: "manager",
                            message: "Who is the employee's manager?",
                            //If user selects null
                            choices: [
                                { name: "None", value: null },
                                ...managers,
                            ],
                        },
                    ])
                    .then((answers) => {
                        const query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?)";
                        const values = [
                            answers.firstName,
                            answers.lastName,
                            answers.role,
                            answers.manager,
                        ];
                        connection.query(query, values, (err, res) => {
                            if (err) {
                                console.log(err);
                                res.status(400).send(err);
                            }
                            console.log("Employee has been added to the database!");
                            start();
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        );
    });
}

function updateEmployee() {
    const employees = "SELECT employee.id, employee.first_name, employee.last_name, roles.title FROM employee JOIN roles ON employee.role_id = roles.id;";
    const roles = "SELECT * FROM roles";
    connection.query(employees, (err, resEmployees) => {
        if (err) {
            console.log(err);
        }
        connection.query(roles, (err, resRoles) => {
            if (err) {
                console.log(err);
            }
        inquirer
        .prompt([
            {
                type: "list",
                name: "employee",
                message: "Select the employee you would like to update.",
                choices: resEmployees.map(
                    (employee) => `${employee.first_name} ${employee.last_name}`
                ),
            },
            {
                type: "list",
                name: "role",
                message: "Select the employee's new role.",
                choices: resRoles.map((role) => role.title),
            },
        ])
        .then((answers) => {
            const employee = resEmployees.find(
                (employee) => `${employee.first_name} ${employee.last_name}` === answers.employee
            );
            const role = resRoles.find(
                (role) => role.title === answers.role
            );
            const query = "UPDATE employee SET role_id = ? WHERE id = ?";
            connection.query(query, [role.id, employee.id], (err, res) => {
                if (err) {
                    console.log(err);
                };
                console.log(`Updated ${employee.first_name} ${employee.last_name}'s role to ${role.title} in the database!`);
                start();
            });
        });
    });
});
}
