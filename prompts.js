const mysql = require('mysql2');

const environment = process.env;

const db = mysql.createConnection(
    {
    host: environment.DB_HOST,
    // MySQL username,
    user: environment.DB_USER,
    password: environment.DB_PASSWORD,
    database: 'company_db'
    }
);

let sql;

const getDepartments = () =>  {
    
    return new Promise((resolve)  =>  {
        // sql = `SELECT * FROM roles INNER JOIN department ON department.id=roles.department_id;`
        sql = `SELECT * FROM department`
        
        db.query(sql, (err, data) => {
            if (err) {
                throw err;
            };
            const formattedDepartments = data.map((department) => {
                return `${department.id}, ${department.department_name}`
            });

            resolve(formattedDepartments);
        })        
    })
};

const getEmployees = () =>  {
    
    return new Promise((resolve)  =>  {
        sql = `SELECT * FROM employee`
        db.query(sql, (err, data) => {
            if (err) {
                throw err;
            };
            const formattedEmployees = data.map((employee) => {
                return `${employee.employee_name}`
            });

            resolve(formattedEmployees);
        })        
    })
};

const getManagers = () =>  {
    
    return new Promise((resolve)  =>  {
        sql = `SELECT * FROM employee WHERE role_id = 1`
        db.query(sql, (err, data) => {
            if (err) {
                throw err;
            };
            const formattedEmployees = data.map((employee) => {
                return `${employee.id}, ${employee.employee_name}`
            });
        
            resolve(formattedEmployees);
        })        
    })
};

const getRoles = () =>  {
    return new Promise((resolve)  =>  {
        sql = `SELECT * FROM roles`
        db.query(sql, (err, data) => {
            if (err) {
                throw err;
            };
            const formattedRoles = data.map((roles) => {
                return `${roles.id}, ${roles.title}`
            });
        
            resolve(formattedRoles);
        })        
    })
};

const updateRolePrompts = [
    {
        name: 'employeeChoice',
        type: 'list',
        message: 'Which employee would you like to update?',
        choices: async () => {
            console.log('retrieving data');
            const employees = await getEmployees();
            return employees;
        }
    },
    {
        name: 'roleChoice',
        type: 'list',
        message: 'What is the new role for this employee?',
        choices: async () => {
            console.log('retrieving data');
            const roles = await getRoles();
            return roles;
        }
    }
];

const companyPrompt = [
    {
        type: 'list',
        name: 'actionSelect',
        message: 'what would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
    },];

const departmentPrompts = [
    {
        type: 'input',
        name: 'deptName',
        message: 'what is the name of the department?',
    }];

const rolePrompts = [
    {
        type: 'input',
        name: 'roleTitle',
        message: 'what is the title of the role?',
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'what is the salary for this role? (do not include symbols)',
    },
    {
        type: 'list',
        name: 'roleDept',
        message: 'what is the department is this role under?',
        choices: async () => {
            console.log('retrieving data');
            const departments = await getDepartments();
            return departments;
        }
    },
];

const employeePrompts = [
    {
        type: 'input',
        name: 'employeeName',
        message: 'what is the employee\'s name?',
    },
    {
        type: 'list',
        name: 'employeeManager',
        message: 'who is the employee\'s manager?',
        choices: async () => {
            console.log('retrieving data');
            const managers = await getManagers();
            return managers;
        }
    },
    {
        type: 'list',
        name: 'employeeRole',
        message: 'what is the employee\'s role id?',
        choices: async () => {
            console.log('retrieving data');
            const roles = await getRoles();
            return roles;
        }
    },
];

module.exports = {companyPrompt, departmentPrompts, rolePrompts, employeePrompts, updateRolePrompts}

// view departments: display departments.db
// view roles: display roles.db
// view employees: display employee.db