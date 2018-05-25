/**
 * The Model. Model stores items and notifies
 * observers about changes.
 */
function EmployeeModel(personalInfo){
    this.Employees=[];
    this.Employees.push(personalInfo);
    this.selectedEmpIndex = -1;

    this.newEmpAdded = new Event(this);
    this.empEdited = new Event(this);
    this.empSearched = new Event(this);
    this.selectedEmpIndexChange = new Event(this);

}

EmployeeModel.prototype = {
    getEmployees: function () {
        console.log("Model:getEmployees()");
        return this.Employees;
    },

    addEmployee: function (personalInfo) {
        console.log("Model:addEmployee()");
        personalInfo.empIndex = this.Employees.length;
        this.Employees.push(personalInfo);

        //Notify event.
        this.newEmpAdded.notify({personalInfo});
    },

    setEmpSelectedIndex: function (currentEmpIndex) {
        var previousEmpIndex;

        previousEmpIndex = this.getEmpSelectedIndex();
        this.selectedEmpIndex = currentEmpIndex;

        //Notify event.
        this.selectedEmpIndexChange.notify({previous: previousEmpIndex,
            current: this.selectedEmpIndex});
    },
    getEmpSelectedIndex: function () {
        return this.selectedEmpIndex;
    },

    editEmployee: function (personalInfo) {
        console.log("Model:editEmployee()");
        var index = this.getEmpSelectedIndex();
        console.log(index);
        this.Employees[index].fName = personalInfo.fName;
        this.Employees[index].lName = personalInfo.lName;
        this.Employees[index].email = personalInfo.email;

        //Notify event.
        this.empEdited.notify({empIndex: index, empInfo: personalInfo});
        return true;

    },

    searchEmployee: function (searchText) {
        console.log("Model:searchEmployee()");
        var srchEmployee = [];
        for(var itr=0; itr<this.Employees.length; itr++) {
            var fName = this.Employees[itr].fName;
            var lName = this.Employees[itr].lName;
            var email = this.Employees[itr].email;
            if(fName.toLowerCase().indexOf(searchText) >= 0 ||
              lName.toLowerCase().indexOf(searchText) >= 0 ||
              email.toLowerCase().indexOf(searchText) >= 0) {
                var p = new Person(fName, lName, email);
                p.setEmpIndex(this.Employees[itr].empIndex);
                srchEmployee.push(p);
            }   
        }
        this.empSearched.notify(srchEmployee);
    }
}