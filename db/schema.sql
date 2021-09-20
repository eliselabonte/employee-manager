DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department    (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles   (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title TEXT NOT NULL,
    salary DECIMAL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee    (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id INT, 
    role_id INT,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
);