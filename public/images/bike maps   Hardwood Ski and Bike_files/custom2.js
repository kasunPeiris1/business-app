
jQuery(document).ready(function($){


	$('.50-row').parent().parent().css({"margin-left":"0","width":"51.25%"});

	if (window.matchMedia('(max-width : 1000px)').matches) {
		$('#webcam').click(function(e){

			var $url='http://www.hardwoodskiandbike.ca/webcam/netcam.jpg';
			window.location=$url;

		});
		$('#webcam').removeClass('eModal-3');

	}

	$('#menu-item-2547 > a').addClass('eModal-3');
	$('.centred-Icon-set .col.span_12 .vc_span2:last-child').remove();


	//fixing the issue with the champion icon click on fat biking page
	$('.things-to-do-btn.champion').append('<div class="champion-box">');
	$('.champion-box').click(function(){
		$('.eModal-4').click();

	});

	// $('#champion').click(function(){
		// alert();
	// });

	$('.circle').click(function(e){ e.preventDefault();});
	$('.tooltips').click(function(e){
		e.preventDefault();
		return;
	});



var fb = $('#cff'),
		 end = 1000,
		 scroller,
		 scrolling = false;

	function setScroll() {
		if (!scrolling) {
			scrolling = true;
			scroller = setInterval(function(){
				var pos = fb.scrollTop();

				if (pos > end) {
					fb.scrollTop(0);
				} else {
					fb.scrollTop(++pos);
				}
			}, 20);
		}
	}

	function clearScroll() {
		scrolling = false;
		clearInterval(scroller);
	}

	//stop scroll on hover
	$('#cff a').on('mouseenter', function() {
		clearScroll();
	})

	$('#cff').on('mouseleave', function() {
		setTimeout(setScroll, 1000);
	})

	setScroll();
	if (window.location.hash == '#adult') {

	  		jQuery("#adult").click();

		} else if (window.location.hash == '#youth') {
 			 jQuery("#youth").click();
		}

		if (window.matchMedia('(max-width : 1024px)').matches) {
			$('.nectar-slider-wrap ').css('height','330px');

		}


		jQuery('.icon-container').click(function(e){
		var link=jQuery(this).closest('a').attr('href');
		window.location=link;
	});

	jQuery(".hideonload").removeClass("hideonload");
	jQuery(".add-target .column-link").attr('target','_blank');


	if (window.location.hash == '#adult') {

	  		jQuery("#adult").click();

		}
	 if (window.location.hash == '#youth') {
 			 jQuery("#youth").click();
		}

	jQuery("#menu-item-2186 a").click(function(){
		jQuery("#youth").click();

	});
	jQuery("#menu-item-4466 a").click(function(){
		jQuery("#adult").click();
	});
	
	jQuery("#menu-item-4465 a").click(function(){
		jQuery("#youth").click();

	});
	jQuery("#menu-item-2185 a").click(function(){
		jQuery("#adult").click();
	});
	

	jQuery('.home-slide-shop').click(function(){

		window.location.href = "/home-page-winter/shop/";
	})

	jQuery('#wpc-weather').click(function(){
		window.location.href="/home-page-winter/trails/trail-conditions/";
	});
	
	jQuery('#summer_header #wpc-weather').click(function(){
		window.location.href="/summer-homepage/weather/";
	});

	//events page tweak

	//run the event only if its in the event directory
	if(window.location.pathname=="/event-directory/"){

	  jQuery(document).mouseover(function(event){

	  	var event= jQuery('.evcal_desc');
	  	//loop throught each event and get the anchor, redirect the location to the single event page.
		event.each(function(i){

			var $link=jQuery(this).find('a').attr('href'),
			 $container=jQuery(this).parent().parent().find('.evo_metarow_time_location'),
			 $mobileContainer=jQuery(this).parent().parent();
			 $mobileContainer.css('cursor','pointer');
			 //console.log($mobileContainer);

			 $container.click(function(){
			 	window.location=$link;
			 });
			if (window.matchMedia('(max-width : 690px)').matches) {

				  $mobileContainer.click(function(){
			 		window.location=$link;
			 	});
			}

		});//end of the loop

	  });//end of mouse over function

	}// end of the location check
});



