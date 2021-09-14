INSERT INTO department (id, department_name)
VALUES (1, "IT");

INSERT INTO roles (id, title, department, salary, department_id)
VALUES (01, "manager", "IT", 50000, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Elise", "LaBonte", 01, 205);
