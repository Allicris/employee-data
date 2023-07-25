DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    names VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
     salary DECIMAL(9, 2),
     department_id INT,
    FOREIGN KEY (department_id) 
    REFERENCES departments(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      role_id INT NOT NULL,
      manager_id INT NOT NULL
);