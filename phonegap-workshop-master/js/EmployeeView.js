var EmployeeView = function(employee) {

  this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
  };
  
  this.render = function() {
	    this.el.html(EmployeeView.template(employee));
	    return this;
  };
  
   
  this.initialize(); 
 
}

EmployeeView.template = Handlebars.compile($("#employee-tpl").html());
