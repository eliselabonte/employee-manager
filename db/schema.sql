CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department    (
    id INT NOT NULL PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL,
);

CREATE TABLE roles   (
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    FOREIGN KEY department_id
    REFERENCES department(id)
    ON DELETE SET NULL,
);

CREATE TABLE employee    (
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    manager_id INT, 
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL,
);
