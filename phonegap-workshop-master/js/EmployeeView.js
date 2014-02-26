var EmployeeView = function(employee) {

  this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('click', '.add-location-btn', this.addLocation);
        this.el.on('click', '.add-contact-btn', this.addToContacts);
        this.el.on('click', '.change-pic-btn', this.changePicture);
        this.el.on('click', '.radar-btn', this.showRadar);
        this.el.on('click', '.button', this.back);
  };
  
  this.render = function() {
	    this.el.html(EmployeeView.template(employee));
	    return this;
  };
  
   this.back = function(event) {
	    //event.preventDefault();
	   // homeView = new HomeView(app.store);
	    app.slidePage(homeView.render(),'left');
	    window.location.hash = "";
	    return false;
   }
  
  this.addLocation = function(event) {
	    event.preventDefault();
	    console.log('addLocation');
	    navigator.geolocation.getCurrentPosition(
	        function(position) {
	            $('.location', this.el).html(position.coords.latitude + ',' + position.coords.longitude);
	        },
	        function() {
	            alert('Error getting location');
	        });
	    return false;
	};
	
	this.addToContacts = function(event) {
	    event.preventDefault();
	    console.log('addToContacts');
	    if (!navigator.contacts) {
	        app.showAlert("Contacts API not supported", "Error");
	        return;
	    }
	    var contact = navigator.contacts.create();
	    var name = new ContactName();
		name.givenName = employee.firstName;
		name.familyName = employee.lastName;
		contact.name = name;
	    var phoneNumbers = [];
	    phoneNumbers[0] = new ContactField('work', employee.officePhone, false);
	    phoneNumbers[1] = new ContactField('mobile', employee.cellPhone, true); // preferred number
	    contact.phoneNumbers = phoneNumbers;
	    contact.save(function(contact) {alert("Save Success");},
	    			 function(contact) {alert("Error Saving");});
	    return false;
	};
	
	this.changePicture = function(event) {
	    event.preventDefault();
	    if (!navigator.camera) {
	        app.showAlert("Camera API not supported", "Error");
	        return;
	    }
	    var options =   {   quality: 50,
	                        destinationType: Camera.DestinationType.DATA_URL,
	                        sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
	                        encodingType: 0     // 0=JPG 1=PNG
	                    };
	 
	    navigator.camera.getPicture(
	        function(imageData) {
	            $('.employee-image', this.el).attr('src', "data:image/jpeg;base64," + imageData);
	        },
	        function() {
	            app.showAlert('Error taking picture', 'Error');
	        },
	        options);
	 
	    return false;
	};
	
  this.showRadar = function(event) {
  	event.preventDefault();
  	var radarView = new RadarView();
  	var homeView = new HomeView();
    //$('body').html(homeView.render().el);
  	app.slidePage(radarView.render(),'right');
  	//$('body').html(radarView.render().el);
  	$('body').css('background-color','#000');
  	for (;;) {
  		//app.slidePage(radarView.show().el,'left');
  		$('body').html(radarView.show().el);
  		//$page.html(radarView.show().el);
  		//$(radarView.show().el).attr('class', 'page stage-center transition');
  	}
  	return false;
  };
  
   
  this.initialize(); 
 
}

EmployeeView.template = Handlebars.compile($("#employee-tpl").html());
