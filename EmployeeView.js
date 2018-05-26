/**
 * The View. View presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interraction.
 */
function EmployeeView(model, elements) {
    this.model = model;
    this.elements = elements;
    //User performed events.
    this.empModified = new Event(this);
    this.addEmpButtonClicked = new Event(this);
    this.updateEmpButtonClicked = new Event(this);
    this.searchEmpKeypressed = new Event(this);
    this.resetButtonClicked = new Event(this);

    var _this = this;

    //Attach model listeners.
    this.model.newEmpAdded.attach(function() {
        console.log("Model:newEmpAdded.attach()");
        _this.updateEmpTable();
    });
    this.model.empEdited.attach(function (sender, updated) {
        console.log("Model:empEdited.attach()")
        if(updated.result)
            _this.resetFields();
        _this.updateEmpTable();
    });
    this.model.empSearched.attach(function (sender, searchResult) {
        console.log("Model:empSearched.attach()")        
        _this.displaySearchResult(searchResult);
    });

    //Attach Event Listeners.
    this.elements.empTbl.puidatatable({
        caption: "Employee List",
        columns: [
            {field: 'fName', headerText: 'First Name'},
            {field: 'lName', headerText: 'Last Name'},
            {field: 'email', headerText: 'Email'}
        ],
        selectionMode: 'single',
        datasource: _this.model.getEmployees(),
        rowSelect: 
        function(event, personalInfo) {
            var currIndx = personalInfo.empIndex;
            if(currIndx == undefined) {
                currIndx = -1;
                _this.empModified.notify({event, currIndx});
            }
            else{
                _this.displayEmpSelected(personalInfo);
                _this.empModified.notify({event, currIndx});
            } 
            
        },
        rowUnselect:
        function(event, personalInfo) {
            var currIndx = -1;
            _this.removeEmpUnselected();
            _this.empModified.notify({event, currIndx});
        }
    });
    this.elements.btnAddEmp.click(function () {
        var result = _this.validateInputs();
        if(result.isValid) {
            _this.addEmpButtonClicked.notify({newEmp: result.data});
        }
    });
    this.elements.btnEmpEdit.click(function () {
        var result = _this.validateInputs();
        if(result.isValid) {
            _this.updateEmpButtonClicked.notify({updatedEmp: result.data});
        }
    });
    this.elements.txtSearch.keypress(function (event) {
        if(event.which == 13)
            _this.searchEmpKeypressed.notify({event:"Search", 
                value: _this.elements.txtSearch.val()});
    });
    this.elements.btnReset.click(function () {
        _this.elements.empTbl.puidatatable('reload');
        _this.resetFields();
        _this.resetButtonClicked.notify({index: -1});
    });
}

EmployeeView.prototype = {
    display: function () {
        console.log("View:display()");
        this.updateEmpTable();
    },

    updateEmpTable: function () {
        console.log("View:updateEmpTable()");
        var table = this.elements.empTbl;
        table.puidatatable('option','datasource', this.model.getEmployees());
        table.puidatatable('reload');
    },
    displaySearchResult: function(empSrchResult) {
        console.log("View:displaySearchResult()");

        var table = this.elements.empTbl;
        table.puidatatable('option','datasource', empSrchResult);
        table.puidatatable('reload');
    },
    displayEmpSelected: function(personalInfo) {
        console.log("View:displayEmpSelected()");
        //Display Selected Employee info.
        this.elements.btnEmpEdit.attr("disabled", false);
        this.elements.btnAddEmp.attr("disabled", true); 
        this.elements.txtFname.val(personalInfo.fName);
        this.elements.txtLname.val(personalInfo.lName);
        this.elements.txtEmail.val(personalInfo.email);
    },
    removeEmpUnselected: function() {
        console.log("View:removeEmpUnselected()");
        this.resetFields();     
    },
    validateInputs: function() {
        var fname, lname, email, result=false;
        fname = this.elements.txtFname.val();
        lname = this.elements.txtLname.val();
        email = this.elements.txtEmail.val();
        var p = {};
        if(fname != "" && lname != "" && email != "") {
            p = new Person(fname, lname, email);   
            result = true;
        } else
            alert("Please supply all empty fields");
        return {isValid: result, data:p};
    },
    resetFields: function () {
        this.elements.btnEmpEdit.attr("disabled", true);
        this.elements.btnAddEmp.attr("disabled", false); 
        this.elements.txtFname.val("");
        this.elements.txtLname.val("");
        this.elements.txtEmail.val("");
    }
}