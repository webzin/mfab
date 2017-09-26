/*========================================== MASTER JAVASCRIPT ===================================================================

	Project     :	PLUS - MOBILE TEMPLATE
	Version     :	1.0
	Last Change : 	05/05/2017
	Primary Use :   PLUS - MOBILE TEMPLATE

=================================================================================================================================*/
(function () {

// Initialize your app
var myApp = new Framework7({
    animateNavBackIcon: true,
    // Enable templates auto precompilation
    precompileTemplates: true,
    // Enabled pages rendering using Template7
    template7Pages: true,
    // Specify Template7 data for pages
    swipeBackPage: true,
    pushState: true,
    pushStateSeparator: '#',
    onAjaxStart: function(xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function(xhr) {
        myApp.hideIndicator();
    }
});

// Export selectors engine
var $$ = Dom7;

var mainView = myApp.addView('.view-main', {
    dynamicNavbar: false
});

$$(document).on('page:init', function(e) {

    document.addEventListener('touchmove', function(event) {
        if (event.target.parentNode.className.indexOf('navbarpages') != -1 || event.target.className.indexOf('navbarpages') != -1) {
            event.preventDefault();
        }
    }, false);

    // Add ScrollFix	
    var ScrollFix = function(elem) {
        // Variables to track inputs
        var startY, startTopScroll;
        elem = elem || document.querySelector(elem);

        // If there is no element, then do nothing	
        if (!elem)
            return;

        // Handle the start of interactions
        elem.addEventListener('touchstart', function(event) {
            startY = event.touches[0].pageY;
            startTopScroll = elem.scrollTop;

            if (startTopScroll <= 0)
                elem.scrollTop = 1;

            if (startTopScroll + elem.offsetHeight >= elem.scrollHeight)
                elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
        }, false);
    };

})

/*Gallery shuffle*/
myApp.onPageInit('gallery', function(page) {
    $(".swipebox").swipebox();
    var filtrContainer = $('.filtr-container');
    var simplefilter = $('.simplefilter li');
    if (simplefilter.length) {
        simplefilter.on('click', function() {
            simplefilter.removeClass('active');
            $(this).addClass('active');
        });
    }

    if (filtrContainer.length) {
        console.log(page);
        filtrContainer.css('visibility', 'hidden');
        setTimeout(function() {
            $(".filtr-container").filterizr();
            filtrContainer.css('visibility', 'visible');
        }, 2500);

    }
});


//QUOTE FORM VALIDATION	
	myApp.onPageInit('quote', function(page) {	
	$.getJSON("https://api.ipify.org/?format=json", function(e) {
    console.log(e.ip);
	$('#ip').val(e.ip);
});
$('#ua').val(navigator.userAgent);
		if ($('#quote-form').length) {
			$('#quote-form').each(function(){					
				
				$(this).validate({				
					errorClass: 'error',
					submitHandler: function(form){
						$.ajax({
							type: "POST",
							url:"http://www.wordpress-guru.net/makaniroofing/gf.php",
							dataType: 'json',
							data: $(form).serialize(),
							success: function(data) {	
							console.log(data.status);						
							   if(data.status<202){
								   console.log(data);
								   $('#sucessMessage').html('Your Quote has been sent successfully !');
								   $("#quote-form").trigger('reset'); 
								   $('#sucessMessage').show();
								   $('#sucessMessage').delay(15000).fadeOut();
							   }
							   else {
									$('#failMessage').html(data.response);
									$('#failMessage').show();
									$('#failMessage').delay(15000).fadeOut();
									}
							},
							error: function(XMLHttpRequest, textStatus, errorThrown) {
							   $('#failMessage').html(textStatus);
							   $('#failMessage').show();
							   $('#failMessage').delay(15000).fadeOut();
							 }
						});
					}				
				});
			});
		}
	});

//Video Page
	myApp.onPageInit('video', function(page) {
		//alert('das');
		$.getJSON('video.json', function(data){ 
		//alert(data);
    $.each(data, function(idx, obj){
			 var str = obj.name
             var res = str.substr(0,15);
		if(obj.type=="wistia"){
				$("#vidrow").append("<div class='col-50 tablet-50 card'><div class='video-frame'><iframe src='http://fast.wistia.net/embed/iframe/"+obj.url+"?videoFoam=true' allowtransparency='true' frameborder='0' scrolling='no' class='wistia_embed' name='wistia_embed' width='640' height='360'></iframe></div><div class='card-content'><div class='icon-title color-black'>"+res+"..</div></div></div>");
			}
			else{
				$('#vidrow').append("<div class='col-50 tablet-50 card'><div class='video-frame'><iframe class='embed-responsive-item video' src='http://youtube.com/embed/"+obj.url+"?version=3&loop=1'></iframe></div><div class='card-content'><div class='icon-title color-black'>"+res+"..</div></div></div>");
			} 
	console.log(obj.name);
        $.each(obj, function(key, value){
			
            console.log(key + ": " + value);
        });
    });
});
	});
	
		
	$('select').click(function(){
  if (/Android/.test(navigator.userAgent)){
    $(this).blur();
  }
});
})();