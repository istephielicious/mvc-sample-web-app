$(document).ready(function() {
    console.log("Document is Ready!");
    
});
$(window).on('load', function() {
    console.log("Window is loaded!");
    // var model = new ListModel(['Java', 'JavaScript', 'C', 'C++']),
    //         view = new ListView(model, {
    //             'list': document.getElementById('list'),
    //                 'addButton': document.getElementById('plusBtn'),
    //                 'delButton': document.getElementById('minusBtn')
    //         }),
    //         controller = new ListController(model, view);
    
    //     view.show();

    var p = new Person("Marie Stephanie", "Alesna", "steph@email.com");
    var personArr = [p];
    var model = new EmployeeModel(p),
        view = new EmployeeView(model, {
                    'empTbl': $('#displayEmp'),
                    'btnAddEmp': $('.btnSubmit'),
                    'btnEmpEdit': $('.btnEdit'),
                    'btnReset': $('.btnReset'),
                    'txtSearch': $('#search'),
                    'txtFname': $('#firstname'),
                    'txtLname': $('#lastname'),
                    'txtEmail': $('#email')}),
        controller = new EmployeeController(model, view);
    view.display();
});