/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */
function EmployeeController(model, view) {
    this.model = model;
    this.view = view;

    var _this = this;

    //Attach view listeners.
    this.view.empModified.attach(function (sender, args) {
        _this.setCurrentIndex(args.currIndx);
    }); 
    this.view.addEmpButtonClicked.attach(function (sender, args) {
        _this.addEmployee(args.newEmp);
    });
    this.view.updateEmpButtonClicked.attach(function (sender, args) {
        _this.updateEmployee(args.updatedEmp);
    });
    this.view.searchEmpKeypressed.attach(function (sender, args) {
        _this.searchEmployee(args.value);
    });
    this.view.resetButtonClicked.attach(function (sender, args) {
        _this.setCurrentIndex(args.index);
    });

}

EmployeeController.prototype = {
    addEmployee: function (newEmp) {
        console.log("Controller:addEmployee()");
        this.model.addEmployee(newEmp);
    },
    setCurrentIndex: function (index) {
        console.log("Controller:setCurrentIndex()");
        this.model.setEmpSelectedIndex(index);
    },
    updateEmployee: function(updatedEmp) {
        console.log("Controller:updateEmployee()");
        this.model.editEmployee(updatedEmp);
    },
    searchEmployee: function(data) {
        this.model.searchEmployee(data.toLowerCase());
    },
}
