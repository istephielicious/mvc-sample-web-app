function Person(fname, lname, email) {
    this.fName = fname;
    this.lName = lname;
    this.email = email;
    this.empIndex = 0;
}

Person.prototype = {
    setEmpIndex: function(index) {
        this.empIndex = index;
        
    } 
}