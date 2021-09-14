// Import and require mysql2
const mysql = require('mysql2');
// Import inquirer
const inquirer = require('inquirer');
// import questions for inquirer
const prompts = require('./prompts');

// environmental variables
require('dotenv').config();
const environment = process.env;

const PORT = environment.PORT || 3001;

// const app = express();

// // I don't think I need express for this project
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
    host: environment.DB_HOST,
    // MySQL username,
    user: environment.DB_USER,
    // TODO: Add MySQL password here
    password: environment.DB_PASSWORD,
    database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

let sql;

// deconstruct exports from prompts
const { companyPrompt, departmentPrompts, rolePrompts, employeePrompts, updateRolePrompts } = prompts;

const Department = require('./lib/department');
const Role = require('./lib/roles');
const Employee = require('./lib/employee');

// default action is view departments
let action = 'view all departments';


// cycle through questions for each type of employee until user selects 'no more employees'
function newAction(action) {

    switch (action) {
        case 'add a department':
            inquirer.prompt(departmentPrompts).then((answers) => {
                const id = answers.deptId;
                const name = answers.deptName;

                const dept = new Department(
                    id,
                    name
                    );

                sql = `INSERT INTO department (id, department_name)
                        VALUES (${id}, "${name}");`;

                db.query(sql, (err, rows) => {
                    if (err) {
                        res.status(500).json({ error: err.message });
                        return;
                    }
                    res.json({
                        message: 'successfully added department',
                        data: rows
                    });
                });
            });
            break;

        case 'add a role':
            inquirer.prompt(rolePrompts).then((answers) => {
                const id = answers.roleId;
                const title = answers.roleTitle;
                const salary = answers.roleSalary;
                const dept = answers.roleDept;
            
                const role = new Role(
                    id,
                    title,
                    salary,
                    dept
                    );

                    sql = `INSERT INTO roles (id, title, salary, department_id)
                    VALUES (${id}, "${title}", ${salary}, ${dept});`;

                db.query(sql, (err, rows) => {
                    if (err) {
                        res.status(500).json({ error: err.message });
                        return;
                    }
                    res.json({
                        message: 'successfully added role',
                        data: rows
                    });
                });
            });
            break;

        case 'add an employee':
            inquirer.prompt(employeePrompts).then((answers) => {

                const id = answers.employeeId;
                const firstName = answers.employeeFirstName;
                const lastName = answers.employeeLastName;
                const managerId = answers.employeeManager;
                const roleId = answers.employeeRole;

                const employee = new Employee(
                    id,
                    firstName,
                    lastName,
                    managerId,
                    roleId
                    );

                sql = `INSERT INTO employee (id, first_name, last_name, manager_id, role_id)
                    VALUES (${id}, "${firstName}", "${lastName}", ${managerId}, ${roleId});`;

                db.query(sql, (err, rows) => {
                    if (err) {
                        res.status(500).json({ error: err.message });
                        return;
                    }
                    res.json({
                        message: 'successfully added role',
                        data: rows
                    });
                });
            });
            break;

        case 'update an employee role':
            inquirer.prompt(updateRolePrompts).then((answers) =>    {

            })
            break;

        case 'view all departments':
            sql = `DESCRIBE department`;

            db.query(sql, (err, rows) => {
                    if (err) {
                        res.status(500).json({ error: err.message });
                        return;
                    }
                    res.json({
                        data: rows
                    });
                });
            break;

        case 'view all roles':
            sql = `DESCRIBE roles`;

            db.query(sql, (err, rows) => {
                    if (err) {
                        res.status(500).json({ error: err.message });
                        return;
                    }
                    res.json({
                        data: rows
                    });
                });
            break;

        case 'view all employees':
            sql = `DESCRIBE employee`;

            db.query(sql, (err, rows) => {
                    if (err) {
                        res.status(500).json({ error: err.message });
                        return;
                    }
                    res.json({
                        data: rows
                    });
                });
            break;
    };

    inquirer.prompt(companyPrompt)
}

inquirer.prompt(companyPrompt).then(newAction(answer));