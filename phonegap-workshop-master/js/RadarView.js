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
      var $obj = $('.obj');
      var deg = 0;
      var rad = 160.5; //   = 321/2
  
	  $obj.each(function(){
	    var data = $(this).data();
	    var pos = {X:data.x, Y:data.y};
	    var getAtan = Math.atan2(pos.X-rad, pos.Y-rad);
	    var getDeg = ~~(-getAtan/(Math.PI/180) + 180);
	    $(this).css({left:pos.X, top:pos.Y}).attr('data-atDeg', getDeg);
	  });
	  
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

RadarView.template = Handlebars.compile($("#radar-tpl").html());	
