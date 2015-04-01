

jQuery(document).ready(function($){


	var Hardwood = {};

	var config = {
		url_href: window.location.href,
		container: document.getElementsByClassName('container-wrap'),
		ptn: {
			home: /.com\/$/,
			anchor: /#.+$/,
			programs_lessons: /programs-lessons/,
			adult_courses: /ride-better|gear-up|corporate-groups|safety|coaching-course|cross-clinic|womens-clinic|intro-clinics|tuesday-tracks|family-lesson|ski-for-life|private-lesson|corporate-groups|ski-better-clinic/,
			resort: /plan-your-trip/,
			trails: /trails/,
			events: /event-directory/,
			passes: /season-passes/,
			services: /services/,
			rates: /rates/,
			bike: /fat-bike/
		},
		is_page: function(page_ptn) {
			return this.url_href.match(this.ptn[page_ptn]);
		},
		has_svg: document.getElementsByTagName('object').length,
		has_slider: document.getElementById("home-slider"),
		has_mh: document.getElementById('page-header-bg'),
		has_alert: (function(){
			var alertContent = document.getElementsByClassName('mtphr-dnt-tick-contents')[0].textContent,
				alertBox = $('#mtphr-dnt-2327');

			alertContent = alertContent.replace(/ /g, '');

			if (alertContent.length > 0) {
				return true;
			} else {
				alertBox.remove();
				return false;
			}
		}()),
		mobile_remove: ['#home-slider', '#page-header-bg','.mobile-remove'],
	}

	/*** section scroll method ***/
	Hardwood.scroll = function(e) {
			// e.preventDefault();

			var $this = $(this),
				 $body = $('body'),
				 $row = $body.find('.wpb_row').first(),
				  anchor = ($this.attr("data-target")) ? $this.attr("data-target") : $this.attr('href').match(/#.+/)[0],
				  $section = $(anchor),
				  offset = $section.offset().top,

				  /* offset's weird when IDs are on headings. use an increment to fix offset.
					  increase increment if alert is turned on
				  */
				  inc =  config.has_alert ? $row.width() * 0.23 : $row.width() * 0.23;


			offset = offset - inc;
			$body.stop().animate({scrollTop: offset}, 600);

			return false;
	}


	/*** sets section anchors ***/
	Hardwood.setScroll = function(page, scrollFunc) {
		var anchors = $("a[href*='" + config.ptn[page] + "#']"),
		    scrollFunc = typeof scrollFunc !== 'undefined' ? scrollFunc : Hardwood.scroll;
		$.makeArray(anchors).forEach(function(elem){
			elem.addEventListener("click", scrollFunc);
		})
	}

	/*** nudge header if alert is active ***/
	if (config.has_alert) {
		document.getElementById("header-outer").className += " alert-heading";

		if (config.has_slider) {
				document.getElementById("home-slider").className += " alert-slider";
		}
		if (config.has_mh) {
			document.getElementById("page-header-bg").className += " alert-slider";
		}
	}



	/*** if arriving at an anchor from external page, fix scroll distance ***/
	if (config.is_page('anchor')) {
		setTimeout(function(){
			var $body = $('body, html'),
				$section = $(config.is_page('anchor')[0]),
				$row = $body.find('.wpb_row').first(),
				offset = $section.offset().top
				inc =  config.has_alert ? $row.width() * 0.23 : $row.width() * 0.21;

			offset = offset - inc;


			$body.animate({scrollTop: offset}, 600);
		}, 1200);
	}


	/*** set up container background ***/
	$('.container-wrap').addClass('body-bg');


	/*** remove some elements on mobile ***/
	if (window.matchMedia("(max-width: 43.75em)").matches) {
		config.mobile_remove.forEach(function(elem, i) {
			$(elem).remove();
		})
	}

	/* properties for resizing nectar slider/masthead */
	Hardwood.resizeTimeout = '',
	Hardwood.resizer = function($header, proportion) {

		var curr_width = $header.width(),
			 new_height = parseFloat((curr_width * proportion).toFixed(2));

			 return function() {
				$header.css("max-height", new_height);
			 }
	};


	/*** homepage setup ***/
	if (config.is_page("home")) {

		/* display event description */
		$('.event_description').show();

		/* resize nectar slider */
		window.onresize = function() {
			clearTimeout(Hardwood.resizeTimeout);
			Hardwood.resizeTimeout = setTimeout(Hardwood.resizer($('.nectar-slider-wrap'),0.342), 100);
		}


	} else
	 if (config.has_mh) {

		/* resize masthead */
		Hardwood.setResize = function() {
			clearTimeout(Hardwood.resizeTimeout);
			Hardwood.resizeTimeout = setTimeout(Hardwood.resizer($('#page-header-bg'), 0.2075), 100);
		}

		window.onresize = function() {
			Hardwood.setResize();
		}

		/* have to call the function for mastheads, don't have to for
		   the nectar slider. Maybe the resize event is triggered by the nectar slider */
		Hardwood.setResize();
	}

	/*** events page setup ***/
	if (config.is_page("events")) {
		/* display event description */
		$('.event_description').show();
	}

	/*** svg icon setup ***/
	if (config.has_svg) {

		Hardwood.getDoc = function($btn) {
			return $btn.find('object')[0].contentDocument;
		}

		Hardwood.getSvg = function($btn) {
			var doc = Hardwood.getDoc($btn);
			return doc.getElementsByTagName('svg')[0];
		}

		Hardwood.svgMouseover = function(e) {
			var svg = Hardwood.getSvg($(this));
			svg.setAttribute('class', 'hovered');
		};

		Hardwood.svgMouseout = function(e) {
			var svg = Hardwood.getSvg($(this));
			svg.setAttribute('class', '');
		}

		// workaround for things to do icons
		Hardwood.svgMouseover2 = function(e) {
			var doc = $(this).find('object')[0].contentDocument,
				 animation = doc.getElementById('animate');
			animation.beginElement();
		};

		// trigger
		Hardwood.addSvgClick = function(svg, href) {
			svg.addEventListener("click", function(e) {
				window.location.href = href;
			})
		}

		// for section anchors
		Hardwood.addSvgClick2 = function(svg, btn) {
			svg.addEventListener("click", function(e) {
				// console.log(btn);
				btn.click();
			})
		}

		Hardwood.setSvgAnchor = function() {
			var $obj = $("object[data-target]"),
				 target = $obj.attr('data-target'),
				 $btn = $obj.closest(".things-to-do-btn"),
				 btn,
				 svg = Hardwood.getSvg($btn),
				 target = $obj.attr('data-target');

			$btn.attr('data-target', target);
			btn = document.querySelector('.things-to-do-btn[data-target]');

			$btn.click(Hardwood.scroll);
			Hardwood.addSvgClick2(svg, btn);
		}

		Hardwood.setSvgEvents = function() {
			var $btns1 = $('.to-color-container:has(object)'),
			$btns2 = $('.overlay-container-medium:has(object)'),
			$btns3 = $('.things-to-do-btn:has(object)');

			if ($btns1.length) {
				$btns1.hover(Hardwood.svgMouseover, Hardwood.svgMouseout);
			}

			if ($btns2.length) {
				$btns2.hover(Hardwood.svgMouseover, Hardwood.svgMouseout);
			}

			if ($btns3.length) {
				$btns3.hover(Hardwood.svgMouseover2);

				$btns3.each(function(){
					var $btn = $(this),
						  $anchor = $btn.children('.column-link'),
						  href, doc, svg;

					//add click event on column links only
					if ($anchor.length) {
						 href = $anchor.attr("href"),
						 svg = Hardwood.getSvg($btn);

						 Hardwood.addSvgClick(svg, href);
					} else {
					//if not a link it's an anchor
						Hardwood.setSvgAnchor();
					}
				})
			}
		}

		setTimeout(Hardwood.setSvgEvents, 500);
	}

	/*** setup anchors on resort page ***/
	if (config.is_page("trails")) {
		Hardwood.setScroll("trails");
	}
	/*** setup anchors on resort page ***/
	if (config.is_page("resort")) {
		Hardwood.setScroll("resort");
	}

	/*** setup anchors on services page ***/
	if (config.is_page("services")) {
		Hardwood.setScroll("services");
	}

	/*** setup anchors on season passes page ***/
	if (config.is_page("passes")) {
		Hardwood.setScroll("passes");
	}


	/*** setup rates page(s) ***/
	if (config.is_page("rates")) {
		var free = $("h4:contains('FREE')");
		free.children('.dollar-sign').hide();
	}


	/*** setup programs+lessons page buttons ***/
	if (config.is_page("programs_lessons")) {

		Hardwood.programsPageInit = (function(){

			var programBtns = $('.program-btn'),
				 youthBtn = $('.program-btn-youth'),
				 adultBtn = $('.program-btn-adult'),
				 youthRows = $('.youth-program'),
				 adultRows = $('.adult-program'),
				 inactive = (config.is_page("adult_courses")) ? "youth" : "adult";


			var activate = function($btn, $rows) {
									var $this = $btn,
										 $wrapper = $this.children('.wpb_wrapper'),
										 $btn_text  = $this.find('.program-btn-text');

									$wrapper.addClass('overlay-blue');
									$btn_text.addClass('text-white');
									$rows.slideDown();
								};

			var deactivate = function($btn, $rows) {
										var $this = $btn,
											 $wrapper = $this.children('.wpb_wrapper'),
											 $btn_text  = $this.find('.program-btn-text');

										$wrapper.removeClass('overlay-blue');
										$btn_text.removeClass('text-white');
										$rows.hide();
									};

			var showYouthPrograms = function() {
												activate(youthBtn, youthRows);
												deactivate(adultBtn, adultRows);
												inactive = "adult";
											};

			var showAdultPrograms = function() {
												activate(adultBtn, adultRows);
												deactivate(youthBtn, youthRows);
												inactive = "youth";
											};

			var scroll = function(e) {
								e.preventDefault();

								var $this = $(this),
								    anchor = $this.attr("href");

								//check if the target is an adult course
								if (anchor.match(config.ptn.adult_courses)) {
									showAdultPrograms();
								} else {
									showYouthPrograms();
								}

								Hardwood.scroll.call($this);
							};

			var toggleProgram = function(e) {
										var target = e.target,
											 text = e.target.textContent.toLowerCase();

										if (text === "youth" && text === inactive) {
												showYouthPrograms();

										} else if (text === "adult" && text === inactive) {
												showAdultPrograms();
										} else {
											return;
										}

										Hardwood.scroll.call($(target));
									}


			return function() {
				programBtns.click(toggleProgram);
				Hardwood.setScroll("programs_lessons", scroll);

				if (inactive === "adult") {
					showYouthPrograms();
				}
				else if (inactive === "youth") {
					showAdultPrograms();
				}


			}
		}())

		Hardwood.programsPageInit();
	}
})

jQuery(window).scroll(function(){
	// alert();
	if(jQuery("#header-outer").hasClass( "small-nav" )){
		jQuery("#header-outer").addClass('small-nav');
	}else {
	jQuery("#header-outer").addClass('small-nav');
	}
});
jQuery(document).bind('ready', function(){
	jQuery('.circle a, .circle span, .circle').unbind('click');
	});