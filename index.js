// Import and require mysql2
const mysql = require('mysql2');
// Import inquirer
const inquirer = require('inquirer');

const ctable = require('console.table');

// environmental variables
require('dotenv').config();
const environment = process.env;

// deconstruct exports from prompts
const { companyPrompt, departmentPrompts, rolePrompts, employeePrompts, updateRolePrompts } = require('./prompts');

// Connect to database
const db = mysql.createConnection(
    {
    host: environment.DB_HOST,
    // MySQL username,
    user: environment.DB_USER,
    password: environment.DB_PASSWORD,
    database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

let sql;

// default action is view departments
let action = 'view all departments';

// response to action selected by user
function newAction(action) {
    console.log('action', action);
    switch (action) {
        case 'add a department':
            inquirer.prompt(departmentPrompts).then((answers) => {
                const name = answers.deptName;

                sql = `INSERT INTO department (department_name)
                        VALUES ("${name}");`;

                db.query(sql, (err, rows) => {
                    if (err) {
                        throw err;
                    }
                    console.log('successfully added dept')

                    promptQuestions();
                });
            });
            break;

        case 'add a role':
            inquirer.prompt(rolePrompts).then((answers) => {
                const title = answers.roleTitle;
                const salary = answers.roleSalary;
                const dept = answers.roleDept[0];
                // console.log(dept)
            

                sql = `INSERT INTO roles (title, salary, department_id)
                VALUES ("${title}", ${salary}, ${dept});`;

                db.query(sql, (err) => {
                    if (err) {
                        throw err;
                    };
                    console.log('successfully added role');

                    promptQuestions();
                });
            });
            break;

        case 'add an employee':
            inquirer.prompt(employeePrompts).then((answers) => {

                const name = answers.employeeName;
                const managerId = answers.employeeManager[0];
                const roleId = answers.employeeRole[0];
                // console.log(manager)

                sql = `INSERT INTO employee (employee_name, manager_id, role_id)
                    VALUES ("${name}", ${managerId}, ${roleId});`;

                db.query(sql, (err, rows) => {
                    if (err) {
                        throw err
                    };
                    console.log('successfully added employee');

                    promptQuestions();
                    
                });
            });
            break;

        case 'update an employee role':        
            inquirer.prompt(updateRolePrompts).then((answers) => {

                const employeeName= answers.employeeChoice;
                const roleId = answers.roleChoice[0];

                console.log(employeeName);
                console.log(roleId);

                sql = `UPDATE employee SET role_id=${roleId} WHERE employee_name='${employeeName}';`;

                db.query(sql, (err, data) => {
                    if (err) {
                        throw err
                    };
                    console.log('successfully updated employee role');

                    promptQuestions();
                    
                });
            });
                
            break;

        case 'view all departments':
            sql = `SELECT * FROM department`;
            db.query(sql, (err, data) => {
                    if (err) {
                        throw err;
                    };
                    console.log('DEPARTMENT');
                    console.table(data);
                    promptQuestions();
                });
            break;

        case 'view all roles':
            sql = `SELECT * FROM roles`;

            db.query(sql, (err, data) => {
                    if (err) {
                        throw err;
                    }
                    console.log('');
                    console.log('ROLES');
                    console.table(data);
                    promptQuestions()
                });
            break;

        case 'view all employees':
            sql = `SELECT * FROM employee`;

            db.query(sql, (err, data) => {
                    if (err) {
                        throw err
                    }
                    console.table(data);
                    promptQuestions()
                });
            break;
    };

};

function promptQuestions()  {
// ask the first question, then use that answer to execute the 
inquirer
    .prompt(companyPrompt)
    .then((answer) => {
        // console.log(answer.actionSelect);
        newAction(answer.actionSelect)})
    .catch((err) => console.error(err));
};


promptQuestions();
