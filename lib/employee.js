class Employee extends Role {
    
    constructor (id, firstName, lastName, managerId, roleId)   {
        super(roleId),
        this.id = id,
        this.firstName = firstName,
        this.lastName = lastName,
        this.managerId = managerId   
    };

    getId() {
        return this.Id
    };
    getFirstName() {
        return this.FirstName
    };
    getLastName() {
        return this.LastName
    };
    getManagerId() {
        return this.ManagerId
    }

    getNew()    {
        return 'employee'
    }
};

module.exports = Employee