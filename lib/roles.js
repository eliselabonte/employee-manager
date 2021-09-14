class Role extends Department {
    
    constructor (id, title, salary, deptId)   {
        super(deptId),
        this.id = id,
        this.title = title,
        this.salary = salary   
    };

    getId() {
        return this.Id
    };
    getTitle() {
        return this.title
    };
    getSalary() {
        return this.salary
    };

    getNew()    {
        return 'role'
    }
};

module.exports = Role