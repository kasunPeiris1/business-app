
$(document).ready(function(){
	
	$("input,select,textarea").not("[type=submit]").jqBootstrapValidation({preventSubmit: false});
	
	var $container = $('.masonry-container');
    $container.imagesLoaded( function () {
        $container.masonry({
            columnWidth: '.item',
            itemSelector: '.item'
        });
    });
});

