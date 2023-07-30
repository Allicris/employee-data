SELECT *
FROM roles
JOIN departments ON roles.department_id = departments.id;

SELECT *
FROM employee
JOIN roles ON role_id = roles.id;

SELECT 
employee.id, 
employee.first_name, 
employee.last_name, 
roles.title, 
departments.names 
AS 
departments, roles.salary, 
CONCAT(manager.first_name, ' ', manager.last_name) 
AS 
manager 
FROM 
employee 
LEFT JOIN roles on employee.role_id = roles.id 
LEFT JOIN departments on roles.department_id = departments.id 
LEFT JOIN employee manager on manager.id = employee.manager_id;

SELECT 
employee.id, 
employee.first_name, 
employee.last_name, 
CONCAT(manager.first_name, ' ', manager.last_name) 
AS manager 
FROM employee 
LEFT JOIN employee manager on manager.id = employee.manager_id;