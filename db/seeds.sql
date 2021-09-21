INSERT INTO department (department_name)
VALUES ("IT"),
        ("Sales"),
        ("Audio Enhancement");

INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 100000, 1),
        ("Wearer of Fancy Hats", 150000, 2),
        ("Evil Villain", 150000, 3);

INSERT INTO employee (employee_name, role_id, manager_id)
VALUES ("Beyonce", 1, NULL),
    ("Lady Gaga", 3, NULL),
    ("Elise LaBonte", 3, 2),
    ("Cardi B", 2, 1);
