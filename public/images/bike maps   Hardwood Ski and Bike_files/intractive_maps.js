/*Intractive Maps: Snow Shoe & Ski  
 *
 *  V.1 Developed By Kasun
 * Thanks: Tristan ,Suk
 * 
 * Resources :
 * https://github.com/ariutta/svg-pan-zoom
 * http://timmywil.github.io/jquery.panzoom/
 * 
 */

	/**** Function For Check The Pan Zoom file append to the body ****/
function check_append_pan_zoom(){
	
	if (jQuery('body > .svg-pan-zoom').length == 0) {

		var js = document.createElement("script");
		
		js.className = 'svg-pan-zoom';
		js.type = "text/javascript";
		js.src = '/wp-content/themes/salient/js/svg-pan-zoom.js';
	
		document.body.appendChild(js);
	}
}

/*
 *Function for External Scripts initiation on the Snow Shoe SVG
 * 
 * 1.Initiation SVG-PAN-ZOOM object
 * 2.Initiation SVG	ZOOM object
 * 
 */

//this variable for access SVG Pan Zoom outside svgInit_snowShoe() function
var snowShoe;

function svgInit_snowShoe() {
	snowShoe = svgPanZoom('#snowshoe', {
 		 panEnabled: true
		, controlIconsEnabled: false
		, zoomEnabled: true
		, dblClickZoomEnabled: true
		, zoomScaleSensitivity: 2
		, minZoom: 1
		, maxZoom: 3
		, fit: true
		, center: true
		, refreshRate: 'auto'
		, beforeZoom: function(){}
		, onZoom: function(){}
		, beforePan: function(){}
		, onPan: function(){}
	});
	
	/****SVG ZOOM initiation on both SVG'S ****/
	
	jQuery("#panzoom").panzoom({
		  $zoomIn: jQuery(".zoom-in1"),
		  $zoomOut: jQuery(".zoom-out1"),
		  $zoomRange: jQuery(".zoom-range"),
		  $reset: jQuery(".reset1")	 
	});
}

/*
 *Function Snow Shoe Trail
 * 
 * 1.check the svg is ready. 
 * 2.if its ready append the SVG zoom script. 
 * 3.SVG plugin Initiation.
 * 4.functions for button clicks(toggle classes)
 * 5.button clicks
 * 
 */
function checkReadySnowShoeTrails(){
	
	var svg1 = document.getElementById("snowshoe").getSVGDocument();
	
	if ( svg1 == null) {
		//time out function to load the SVG
	   	setTimeout("checkReadySnowShoeTrails", 300);
	   	console.log(svg1);
    } else {
    	
    	//append the svg pan zoom script
	    check_append_pan_zoom();
	    	 	
	    var timer=setTimeout(svgInit_snowShoe, 300);
	    // declaring variables for SVG SNOWShoe Map 					    			
		var snowShoeMap=jQuery('.snowshoe-Map').find('object')[0].contentDocument;
		var Main_title= snowShoeMap.getElementById('Main_Title');
		var Solid_Purple= snowShoeMap.getElementById('Solid_Purple');
		var Road= snowShoeMap.getElementById('Road');
		var Landmarks= snowShoeMap.getElementById('Landmarks');
		var Areas= snowShoeMap.getElementById('Areas');
		
		var Main_Track_Right= snowShoeMap.getElementById('Main_Track_Right');
		var Main_Track_LEft= snowShoeMap.getElementById('Main_Track_LEft');
		var Purple= snowShoeMap.getElementById('Purple');
		var Green= snowShoeMap.getElementById('Green');
		var Orange= snowShoeMap.getElementById('Orange');
		var Red= snowShoeMap.getElementById('Red');
		var Compass= snowShoeMap.getElementById('Compass');
		var Shortcuts= snowShoeMap.getElementById('Shortcuts');
		var Title_Backgrounds= snowShoeMap.getElementById('Title_Backgrounds');
		var Legend= snowShoeMap.getElementById('Legend');
		var Titles= snowShoeMap.getElementById('Titles');
		
	/****This Function will call before every button click to hide all the maps from the SVG****/	
	function removeclasses(){
		Red.setAttribute('class','');
		Green.setAttribute('class','');
		Purple.setAttribute('class','');
		Orange.setAttribute('class','');
		Shortcuts.setAttribute('class','');
		// One_Way.setAttribute('class','');
		Road.setAttribute('class','');
	 
    }
    
 	/****2 Functions for toggleing clsses to hide and show shortcuts****/
	 var functionindex=0;
	 
	 function fillWhite(){
	 	//console.log('inside fillWhite');
	 	Main_title.setAttribute('class','fill-no-color');
		Titles.setAttribute('class','fill-no-color');
		Title_Backgrounds.setAttribute('class','fill-no-color');
		Main_Track_LEft.setAttribute('class','fill-no-color');
		Main_Track_Right.setAttribute('class','fill-no-color');
		Solid_Purple.setAttribute('class','fill-no-color');
		Shortcuts.setAttribute('class','fill-no-color');
	 	functionindex=1;
	 }
	 
	 function fillNoen(){
	  	//console.log('inside fillnone');
	 	Main_title.setAttribute('class','');
		Titles.setAttribute('class','');
		Title_Backgrounds.setAttribute('class','');
		Main_Track_LEft.setAttribute('class','');
		Main_Track_Right.setAttribute('class','');
		Solid_Purple.setAttribute('class','');
		Shortcuts.setAttribute('class','');
	 	functionindex=0;
	 	
	 }
	 
	/****All the button clicks: Access the SVG using Native JS & add classes to SVG ****/ 
	jQuery('.map1').click(function(e) {
		e.preventDefault();
		 removeclasses();
		 Orange.setAttribute('class','orangeHover');
		 snowShoe.zoomOut(1);
		});
	jQuery('.map2').click(function(e) {
		
		e.preventDefault();
		removeclasses();
		Green.setAttribute('class','greenHover');
		snowShoe.zoomOut();
		
	});
	jQuery('.map3').click(function(e) {
		
		e.preventDefault();
		removeclasses();
		Purple.setAttribute('class','purpleHover');
		snowShoe.zoomOut();
		
	});
	jQuery('.map4').click(function(e) {
		
		e.preventDefault();
		removeclasses();	
		 Red.setAttribute('class','redHover');
		 snowShoe.zoomOut();	
	
	});
	
	jQuery('.map5').click(function(e) {
		e.preventDefault();
		removeclasses();	
		Shortcuts.setAttribute('class','shortcutHover');
		snowShoe.zoomOut();
	});
	
	
	jQuery('.road').click(function(e) {
		e.preventDefault();
		removeclasses();	
		Road.setAttribute('class','roadHover');
		snowShoe.zoomOut();
	});		
	
	jQuery('.titleHide').click(function(e) {
		e.preventDefault();
		//toggle functions for hide and show titles and ski maps
		 if(functionindex==1){
			fillNoen();
		}	
		else if(functionindex==0){
			fillWhite();
		}
	});
	
  }//end of else 
}//end of the Function

/*
 *Function for External Scripts initiation on the Ski Trail SVG 
 * 
 * 1.Initiation SVG-PAN-ZOOM object
 * 2.Initiation SVG	ZOOM object
 */

//this variable for access SVG Pan Zoom outside svgInit_skiTrail() function
var skiTrailPanZoom;

function svgInit_skiTrail() {
	
	 /****SVG PAN ZOOM initiation on both SVG'S ****/
	 skiTrailPanZoom = svgPanZoom('#skiTrail', {
	 	
 		 panEnabled: true
		, controlIconsEnabled: false
		, zoomEnabled: true
		, dblClickZoomEnabled: true
		, zoomScaleSensitivity: 2
		, minZoom: 1
		, maxZoom: 3
		, fit: true
		, center: true
		, refreshRate: 'auto'
		, beforeZoom: function(){}
		, onZoom: function(){}
		, beforePan: function(){}
		, onPan: function(){}
	});
	
	/****SVG ZOOM initiation on both SVG'S ****/
	jQuery("#panzoom1").panzoom({
		  $zoomIn: jQuery(".zoom-in"),
		  $zoomOut: jQuery(".zoom-out"),
		  $zoomRange: jQuery(".zoom-range"),
		  $reset: jQuery(".reset")	 
	});
}
/*
 *Function Snow Ski Trail
 * 
 * 1.check the svg is ready. 
 * 2.if its ready append the SVG zoom script. 
 * 3.SVG plugin Initiation.
 * 4.functions for button clicks(toggle classes)
 * 5.button clicks
 * 
 */
function checkReadySkiTrails() {
	  
	 var svg = document.getElementById("skiTrail").getSVGDocument();
	 
    if ( svg == null) {
    	//time out function to load the SVG
        setTimeout("checkReadySkiTrails", 300);
    } else {
    	
    	
   
   //append the svg pan zoom script
	check_append_pan_zoom();
	
    var timer=setTimeout(svgInit_skiTrail, 300);
   
	//declaring variables for SVG Ski Map
	var snowShoeMap=jQuery('.ski-Map').find('object')[0].contentDocument;
	var Ski_Trails=snowShoeMap.getElementById('Ski_Trails');
	var Salt_Lake_City=snowShoeMap.getElementById('Salt_Lake_City');
	var Vancouver=snowShoeMap.getElementById('Vancouver');
	var Seefeld=snowShoeMap.getElementById('Seefeld');
	var Torino=snowShoeMap.getElementById('Torino');
	var Sochi=snowShoeMap.getElementById('Sochi');
	var Nagano=snowShoeMap.getElementById('Nagano');
	var Lillehammer=snowShoeMap.getElementById('Lillehammer');
	var Shortcuts=snowShoeMap.getElementById('Shortcuts_1_');
	var One_Way= snowShoeMap.getElementById('One_Way_1_');
	
	
	/****Function: this function will call before every button click to hide all the maps from the SVG****/
	function removeAllMaps(){ 
		
		Salt_Lake_City.setAttribute('class','fill-no-color');
		Vancouver.setAttribute('class','fill-no-color');
	    Seefeld.setAttribute('class','fill-no-color');
 		Torino.setAttribute('class','fill-no-color');
        Sochi.setAttribute('class','fill-no-color');
        Nagano.setAttribute('class','fill-no-color');
		Lillehammer.setAttribute('class','fill-no-color');
		Shortcuts.setAttribute('class','fill-no-color');
		Ski_Trails.setAttribute('class','Ski_TrailsHover');
		One_Way.setAttribute('class','fill-no-color');
		One_Way.setAttribute('class','Ski_TrailsHover'); 
		 
	 }
	 
	/****2 Functions for toggleing clsses to hide and show shortcuts****/
	 
	 var functionshortcut=0;
	 
	 function shortcutshow(){
	 	//console.log('inside');
	 	Shortcuts.setAttribute('class','Shortcuts_1Hover');  
	 	functionshortcut=1;	
	 }
	 
	 function shortcuthide(){
	 	//console.log('inside fillWhite');
	 	Shortcuts.setAttribute('class','');  
	 	functionshortcut=0;
	 }
	 
	 /****2 Functions for toggleing clsses to hide and show all the tracks****/
	 
	 var functiontracks=0;
	 
	 function showTracks(){
	 	// console.log('inside');
	 	Salt_Lake_City.setAttribute('class','saltLakeCityHover'); 
	 	Vancouver.setAttribute('class','vancouverHover'); 
	 	Seefeld.setAttribute('class','seefeldHover');
	 	Torino.setAttribute('class','torinoHover'); 
	 	Lillehammer.setAttribute('class','lillehammerHover'); 
		Nagano.setAttribute('class','naganoHover');  
		Sochi.setAttribute('class','sochiHover'); 
	 	One_Way.setAttribute('class','One_WayHover');
	 	Shortcuts.setAttribute('class','Shortcuts_1Hover');  
	 	functiontracks=1;	
	 }
	 
	 function hideTracks(){
	 	// console.log('inside fillWhite');
	 	Salt_Lake_City.setAttribute('class','fill-no-color');
		Vancouver.setAttribute('class','fill-no-color');
	    Seefeld.setAttribute('class','fill-no-color');
 		Torino.setAttribute('class','fill-no-color');
        Sochi.setAttribute('class','fill-no-color');
        Nagano.setAttribute('class','fill-no-color');
		Lillehammer.setAttribute('class','fill-no-color');
		Shortcuts.setAttribute('class','fill-no-color');
		Ski_Trails.setAttribute('class','Ski_TrailsHover'); 
		One_Way.setAttribute('class','fill-no-color');
		One_Way.setAttribute('class','Ski_TrailsHover'); 
	 	functiontracks=0;
	 }
	 
	/****All the button clicks: Access the SVG using Native JS & add classes to SVG ****/
	  
	 jQuery('.skimap1').click(function(e) {
		e.preventDefault();
		removeAllMaps();
		Salt_Lake_City.setAttribute('class','saltLakeCityHover');
		skiTrailPanZoom.zoomOut(); 
 
		});
	 jQuery('.skimap2').click(function(e) {
		e.preventDefault();
		removeAllMaps();
		Vancouver.setAttribute('class','vancouverHover');  
		skiTrailPanZoom.zoomOut();
		 
		});
	jQuery('.skimap3').click(function(e) {
		e.preventDefault();
		removeAllMaps();
		Seefeld.setAttribute('class','seefeldHover');  
		skiTrailPanZoom.zoomOut();
		 
		});
	jQuery('.skimap4').click(function(e) {
		e.preventDefault();
		removeAllMaps();
		Torino.setAttribute('class','torinoHover'); 
		skiTrailPanZoom.zoomOut(); 
		 
		});
	jQuery('.skimap5').click(function(e) {
		e.preventDefault();
		// alert();
		removeAllMaps();
		Sochi.setAttribute('class','sochiHover');
		skiTrailPanZoom.zoomOut();  
		 
		});
	jQuery('.skimap6').click(function(e) {
		e.preventDefault();
		removeAllMaps();
		Nagano.setAttribute('class','naganoHover'); 
		skiTrailPanZoom.zoomOut(); 
		 
		});
	 jQuery('.skimap7').click(function(e) {
		e.preventDefault();
		removeAllMaps();
		Lillehammer.setAttribute('class','lillehammerHover');
		skiTrailPanZoom.zoomOut(); 
		 
		 
		});
	 jQuery('.skimap8').click(function(e) {
		e.preventDefault();
		skiTrailPanZoom.zoomOut();
		 if(functionshortcut==1){
			shortcuthide();
			jQuery('.skimap8').text("Shortcuts");
		}	
		else if(functionshortcut==0){
			shortcutshow();
			jQuery('.skimap8').text(" Hide Shortcuts");
		}  
		});
		jQuery('.oneway').click(function(e) {
		
		e.preventDefault();
		removeAllMaps();	
		One_Way.setAttribute('class','One_WayHover');
		skiTrailPanZoom.zoomOut();
	});
		
	 jQuery('.showallMaps').click(function(e) {
		e.preventDefault();
		skiTrailPanZoom.zoomOut();
		// alert(); 
		 if(functiontracks==1){
			hideTracks();
			jQuery('.showallMaps').text("Show all Maps");
		}	
		else if(functiontracks==0){
			showTracks();
			jQuery('.showallMaps').text(" Hide all Maps");
		}  
		 
		});
     	
    }//end of else 
 }//end of function


//this variable for access SVG Pan Zoom outside svgInit_bike_ride() function
var Bike_Ride;

function svgInit_bike_ride(){
	
	Bike_Ride=svgPanZoom('#bike-maps', {
 		 panEnabled: true
		, controlIconsEnabled: false
		, zoomEnabled: true
		, dblClickZoomEnabled: true
		, zoomScaleSensitivity: 2
		, minZoom: 1
		, maxZoom: 3
		, fit: true
		, center: true
		, refreshRate: 'auto'
		, beforeZoom: function(){}
		, onZoom: function(){}
		, beforePan: function(){}
		, onPan: function(){}
	}); 
	/****SVG ZOOM initiation on both SVG'S ****/
	jQuery("#panzoom1").panzoom({
		  $zoomIn: jQuery(".zoom-in"),
		  $zoomOut: jQuery(".zoom-out"),
		  $zoomRange: jQuery(".zoom-range"),
		  $reset: jQuery(".reset") 
	});	
}

/*
 *Function Bike Ride
 * 
 * 1.check the svg is ready. 
 * 2.if its ready append the SVG zoom script. 
 * 3.SVG plugin Initiation.
 * 4.functions for button clicks(toggle classes)
 * 5.button clicks
 * 
 */

function checkReadyBikeRide(){
	//get the svg document
	var svgDoc=document.getElementById("bike-maps").getSVGDocument();
	
	if(svgDoc == null){
		setTimeout("checkReadyBikeRide",300);
		console.log(svgDoc);
	}
	
}




jQuery(window).load(function($){
	checkReadyBikeRide()
	/****Only execute Main SVG function if in the right Page ****/
	
	var snowshoe = "/home-page-winter/trails/snowshoe-trail-maps/",
	snowshoe_hash = "/home-page-winter/trails/snowshoe-trail-maps/#snowshoe",
	skitrail = "/home-page-winter/trails/cross-country-ski-trail-maps/",
	skitrail_hash = "/home-page-winter/trails/cross-country-ski-trail-maps/#skiTrail";
  
	if (skitrail == window.location.pathname ||skitrail_hash == window.location.pathname ) {
	 
		checkReadySkiTrails();
	}
	if (snowshoe == window.location.pathname || snowshoe_hash == window.location.pathname) {
	 
		checkReadySnowShoeTrails();
	}


});

jQuery(document).ready(function($){
	
	$('.downlaod').text("");
	$('.downlaod').prepend('<i class="icon-file-text"></i>');
	
});
