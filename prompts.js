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
    },
    {
        type: 'input',
        name: 'deptId',
        message: 'what is the department id?',
    },];

const rolePrompts = [
    {
        type: 'input',
        name: 'roIdid',
        message: 'what is the role id?',
    },
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
        type: 'input',
        name: 'roleDept',
        message: 'what is the id of the department that this role is under?',
    },];

const employeePrompts = [
    {
        type: 'input',
        name: 'employeeFirstName',
        message: 'what is the employee\'s first name?',
    },
    {
        type: 'input',
        name: 'employeeLastName',
        message: 'what is the employee\'s last name?',
    },
    {
        type: 'input',
        name: 'employeeId',
        message: 'what is the employee\'s id?',
    },
    {
        type: 'input',
        name: 'employeeManager',
        message: 'what is the id of the employee\'s manager?',
    },
];

const updateRolePrompts = [
    {
        type: 'list',
        name: 'selectRole',
        message: 'what role would you like to change?',
        choices: 'insert role titles here',
    },
    {
        type: 'list',
        name: 'selectUpdateInfo',
        message: 'what information would you like to change?',
        choices: ['role title', 'role id', 'role salary', 'department']
    }
    // from here select proper question from rolePrompts
]

// view departments: display departments.db
// view roles: display roles.db
// view employees: display employee.db