var app = {
    
    showAlert: function (message, title) {
	    if (navigator.notification) {
	        navigator.notification.alert(message, null, title, 'OK');
	    } else {
	        alert(title ? (title + ": " + message) : message);
	    }
	},

    initialize: function() { 
    	var self = this;
        this.store = new LocalStorageStore(
        	function () {
        		//self.showAlert('Inicializacion Ok','Estado');
        	}
        );
        var homeView = new HomeView(self.store);
        $('body').html(homeView.render().el);
    }

};

app.initialize();