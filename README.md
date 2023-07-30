# Employee Data Tracker

## User Story
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

## Acceptance Criteria
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

## Installation Process
- Run npm start on the terminal to be prompted into creating a package.json file.
- Add inquirer and mySQL as dev dependencies.
- Run npm i on the terminal to install all of your packages.
- Run npm start on the terminal to start your application.

## Video Link
Application walkthrough:

## Successes and Challenges
Majority of the success on this project was being able to set up my databases with no issues. I found myself really enjoying mySQL and getting the foundation of the project going. I did have to do some research on Google to figure out what aliases are and how to implement them when I'm trying to combine data into one table. Another success was getting the functions view Departments, Roles and Employees to work, creating these functions and seeing them work the way they are supposed to with little trouble was very rewarding. A challenge I faced was creating the add a new role function because there was more data to find and input, I was getting stuck on selecting a department for the new role because I was getting a lot of undefined messages and eventually fixed this issue. Something that I also learned was that you have to pay attention to the input values that you have initially set up and making sure that you're entering the right format for that value. 

## Setting up the database 
![](./images/data.jpg)
![](./images/data1.jpg)
![](./images/data2.jpg)


