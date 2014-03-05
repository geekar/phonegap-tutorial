function distanceToUser (currLat,currLon,latitudeP1,longitudeP1) {
    var R = 6371; // km
	var dLat = (latitudeP1-currLat).toRad();
	var dLon = (longitudeP1-currLon).toRad();
	var lat1 = currLat.toRad();
	var lat2 = currLon.toRad();
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      	Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
    return d;
};

function proyectPointOfInterest(a1,b1,a2,b2,d) {
	var R = 6371; // km
	var x = R * (a2-a1).toRad() * Math.cos(b1);
	var y = R * (b2-b1).toRad();
	if (d>0.0) {
		x = Math.ceil(160*x / (d+d*0.1));
		y = Math.ceil(160*y / (d+d*0.1));
	}
	x = 160-x;
	y = 160-y;
	return [x,y];
}

// convert degrees to radians
Number.prototype.toRad = function() 
{ 
    return this * Math.PI / 180;
}
  

var RadarView = function() {
	
  this.initialize = function() {
    
    // Define a div wrapper for the view. The div wrapper is used to attach events.
    this.el = $('<div/>');
    
  }
  
  this.render = function() {
	  this.el.html(RadarView.template());
	  return this;
  };
  
   
	   
  this.show = function() {    
      var $rad = $('#rad');
          var deg = 0;
      var rad = 160.5; //   = 321/2
      
		  
		  printLocation = function() {
			    console.log('getLocation');
			    navigator.geolocation.getCurrentPosition(
			        function(position) {
			        	latitude = position.coords.latitude;
			        	longitude = position.coords.longitude;
			        	loc = position.coords.latitude + ',' + position.coords.longitude;
			            $('.location', this.el).html(loc);
			            d = distanceToUser(latitude,longitude,latitude1,longitude1);
			            $('.distance', this.el).html(d);
			            
			            var point = proyectPointOfInterest(latitude,longitude,latitude1,longitude1,d);
			             var $radar = $('#radar');
	  
       $radar.append('<div class="obj" data-x="'+point[0]+'" data-y="'+point[1]+'" style="left:'+point[0]+'px; top: '+point[1]+'px; opacity:0.2;" />');
       
        var $obj = $('.obj');


	  
		  $obj.each(function(){
		    var data = $(this).data();
		    var pos = {X:data.x, Y:data.y};
		    var getAtan = Math.atan2(pos.X-rad, pos.Y-rad);
		    var getDeg = ~~(-getAtan/(Math.PI/180) + 180);
		    $(this).css({left:pos.X, top:pos.Y}).attr('data-atDeg', getDeg);
		  });
			           			         
			        },
			        function() {
			            alert('Error getting location');
			        });
			    return false;
		  };
			

		  
		
			
		   if (loc==null) printLocation();
		   
		   //if (loc!=null) console.log(distanceToUser(latitude1,longitude1));
		   
		  
		   (function rotate() {      
	      $rad.css({transform: 'rotate('+ deg +'deg)'});
	      $('[data-atDeg='+deg+']').stop().fadeTo(0,1).fadeTo(1700,0.2);
	     
	
	        // LOOP
	        setTimeout(function() {
	            deg = ++deg%360;
	            rotate();
	        }, 25);
	    })();
		
	};

	this.initialize(); 
}

var loc;
var latitude;
var longitude;

var latitude1 = 41.394325;
var longitude1 = 2.175179;
//var latitude1 = 42.33139169122773;
//var longitude1 = 2.625731;

RadarView.template = Handlebars.compile($("#radar-tpl").html());	
