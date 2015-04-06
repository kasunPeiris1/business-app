
$(document).ready(function(){
	//input validation message
	$("input,select,textarea").not("[type=submit]").jqBootstrapValidation({preventSubmit: false});
	
	var $container = $('.masonry-container');
    $container.imagesLoaded( function () {
        $container.masonry({
            columnWidth: '.item',
            itemSelector: '.item'
        });
    });
	
	//error page , erro message toggle
	$('.dev').click(function(e){
		e.preventDefault();
		$('.errorInfo').slideToggle();
		
	});
});

