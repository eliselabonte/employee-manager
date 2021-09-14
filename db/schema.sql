CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department    (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
)

CREATE TABLE roles   (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title: VARCHAR(30),
    salary: DECIMAL,
    department_id: INT
)

CREATE TABLE employee    (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL,
)

-- create table for each department?