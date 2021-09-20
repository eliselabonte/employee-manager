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
        // type: 'list',
        // name: 'employeeManager',
        // message: 'who is the emplpoyee\'s manager?',
        // choices:,
    },
    {
        // type: 'list',
        // name: 'employeeRole',
        // message: 'what is the employee\'s role?',
        // choices:,
    },
];

const updateRolePrompts = [
    {
        type: 'list',
        name: 'updateEmployee',
        message: 'what employee would you like to update?',
        // need method to insert role titles
        choices: 'insert employees here',
    },
    {
        type: 'input',
        name: 'updateRole',
        message: 'what is the updated role id?'
    }
    // from here select proper question from rolePrompts
];

module.exports = {companyPrompt, departmentPrompts, rolePrompts, employeePrompts, updateRolePrompts}

// view departments: display departments.db
// view roles: display roles.db
// view employees: display employee.db