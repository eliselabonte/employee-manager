class Department {
    
    constructor (id, deptName)   {
        this.id = id,
        this.deptName = deptName   
    };

    getId() {
        return this.Id
    };
    getDeptName() {
        return this.deptName
    };

    getNew()    {
        return 'department'
    }
};

module.exports = Department