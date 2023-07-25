INSERT INTO departments (names)
VALUES ("Operations"),
       ("Sales"),
       ("Customer Service"),
       ("Technical Service");

INSERT INTO roles (title, salary, department_id)

VALUES ("Manager", 70000.00, 1),
       ("Assistant Manager", 60000.00, 1),
       ("Office Administrator", 50000.00, 1),
       ("Sales Associate", 45000.00, 2),
       ("Customer Service Clerk", 43000.00, 3),
       ("Software Developer", 90000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Allison", "Hartman", 1, 3),
       ("Marylin", "Serrano", 2, 2),
       ("Christian", "Pazos", 3, 1),
       ("Kristin", "Medina", 4, 4);

