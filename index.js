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
                const dept = 4;
            

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

                const firstName = answers.employeeFirstName;
                const lastName = answers.employeeLastName;
                const managerId = answers.employeeManager;
                const roleId = answers.employeeRole;

                sql = `INSERT INTO employee (first_name, last_name, manager_id, role_id)
                    VALUES ("${firstName}", "${lastName}", ${managerId}, ${roleId});`;

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

            const getRoles = () =>  {
                return new Promise((resolve)  =>  {
                    sql = `SELECT * FROM employee`
                    db.query(sql, (err, data) => {
                        if (err) {
                            throw err;
                        };
                        const formatted = data.map((employee) => {
                            return `${employee.first_name} ${employee.last_name}`
                        });
        
                        resolve(formatted);
                    })        
                })
            };

            inquirer.prompt([
                {
                    name: 'asyncChoice',
                    type: 'list',
                    message: 'choose one',
                    choices: async () => {
                        console.log('retrieving data');
                        const roles = await getRoles();
                        return roles;
                    }
                }
            ]);

            promptQuestions();
                
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
                    console.log('');
                    console.log('EMPLOYEE');
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
