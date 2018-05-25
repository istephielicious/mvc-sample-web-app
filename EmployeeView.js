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

    var _this = this;

    //Attach model listeners.
    this.model.newEmpAdded.attach(function() {
        console.log("Model:newEmpAdded.attach()");
        _this.updateEmpTable();
    });
    this.model.empEdited.attach(function () {
        console.log("Model:empEdited.attach()")
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
            if(personalInfo.empIndex == undefined) {
                _this.model.setEmpSelectedIndex(-1);
            }
            else{
                _this.model.setEmpSelectedIndex(personalInfo.empIndex);

                _this.elements.btnEmpEdit.attr("disabled", false);
                _this.elements.btnAddEmp.attr("disabled", true); 

                _this.empModified.notify({event, personalInfo});
            } 
            
        },
        rowUnselect:
        function(event, personalInfo) {
            _this.model.setEmpSelectedIndex(-1);
            _this.elements.btnEmpEdit.attr("disabled", true);
            _this.elements.btnAddEmp.attr("disabled", false); 

            _this.empModified.notify({event, personalInfo});
        }
    });
    this.elements.btnAddEmp.click(function () {
        _this.addEmpButtonClicked.notify();
    });
    this.elements.btnEmpEdit.click(function () {
        _this.updateEmpButtonClicked.notify();
    });
    this.elements.txtSearch.keypress(function (event) {
        if(event.which == 13)
            _this.searchEmpKeypressed.notify({event:"Search", 
                value: _this.elements.txtSearch.val()});
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
        this.model.setEmpSelectedIndex(-1);
    },
    displaySearchResult: function(empSrchResult) {
        console.log("View:displaySearchResult()");

        var table = this.elements.empTbl;
        this.model.setEmpSelectedIndex(-1);
        table.puidatatable('option','datasource', empSrchResult);
        table.puidatatable('reload');
    },
}