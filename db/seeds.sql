INSERT INTO department (department_name)
VALUES ("IT");

INSERT INTO roles (title, salary, department_id)
VALUES ("manager", 50000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 1, NULL),
    ("Elise", "LaBonte", 1, 1);
