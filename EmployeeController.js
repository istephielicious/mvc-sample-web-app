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
        switch(args.event.type){
            case 'puidatatablerowselect':
                console.log(args);
                _this.displayEmpSelected(args.personalInfo);
            break;
            case 'puidatatablerowunselect':
            _this.removeEmpUnselected();
        }        
    }); 
    this.view.addEmpButtonClicked.attach(function () {
        _this.addEmployee();
    });
    this.view.updateEmpButtonClicked.attach(function () {
        _this.updateEmployee();
    });
    this.view.searchEmpKeypressed.attach(function(sender, args) {
        console.log("here ",args.value);
        _this.searchEmployee(args.value);
    });

}

EmployeeController.prototype = {
    addEmployee: function () {
        console.log("Controller:addEmployee()");
        var fname, lname, email;
        fname = this.view.elements.txtFname.val();
        lname = this.view.elements.txtLname.val();
        email = this.view.elements.txtEmail.val();
        var result = this.validateInputs();
        if(result.isValid) {
            this.model.addEmployee(result.data);
        }
        else {
            alert("Please supply all empty fields");
        }
    },
    displayEmpSelected: function(personalInfo) {
        console.log("Controller:displayEmpSelected()");
        //Display Selected Employee info.
        this.view.elements.btnAddEmp.attr("disabled", true);
        this.view.elements.txtFname.val(personalInfo.fName);
        this.view.elements.txtLname.val(personalInfo.lName);
        this.view.elements.txtEmail.val(personalInfo.email);
    },
    removeEmpUnselected: function() {
        console.log("Controller:removeEmpUnselected()");
        this.resetFields();     
    },
    updateEmployee: function() {
        console.log("Controller:updateEmployee()");
        //Get Updated Employee info.
        var result = this.validateInputs();
        if(result.isValid)
            var isUpdated =this.model.editEmployee(result.data);
            if(isUpdated) {
                alert("Employee is updated");
                this.view.elements.btnAddEmp.attr("disabled", false);
                this.resetFields();
            }
        else
            alert("Please supply all empty fields");
    },
    searchEmployee: function(data) {
        this.model.searchEmployee(data.toLowerCase());
    },
    validateInputs: function() {
        var fname, lname, email, result=false;
        fname = this.view.elements.txtFname.val();
        lname = this.view.elements.txtLname.val();
        email = this.view.elements.txtEmail.val();
        var p = {};
        if(fname != "" && lname != "" && email != "") {
            p = new Person(fname, lname, email);   
            result = true;
        }
        return {isValid: result, data:p};
    },
    resetFields: function () {
        this.view.elements.txtFname.val("");
        this.view.elements.txtLname.val("");
        this.view.elements.txtEmail.val("");
    }

}
