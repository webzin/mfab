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

	//Video Page
	myApp.onPageInit('manual', function(page) {
		//alert('das');
			var mandata = {
    		"page": "manual"
			};
	$.getJSON('http://wordpress-guru.net/makaniroofing/app.php', mandata, function(data){ 
	var allcat =$("<li class='active' data-filter='all'>All</li>");
		$(".simplefilter").append(allcat);
		
		$.each(data, function(idx, obj){
				var box = $("<div class='col-100 tablet-100 text-center'><h5>"+obj.name+"</h5><a class='external' href="+obj.url+"><img src='images/icons/manual.png'></a>");
				$("#manudata").append(box);
		 });
	});
		
	});	

	/*Gallery shuffle*/
	myApp.onPageInit('video', function(page) {							   
		
		
		/*var viddata = {
		"page": "vidfilter"
	};
		$.getJSON('http://wordpress-guru.net/makaniroofing/app.php', viddata, function(data){ 
		var allcat =$("<li class='active' data-filter='all'>All</li>");
			$(".simplefilter").append(allcat);
			
			$.each(data, function(idx, obj){
					var catname=$("<li data-filter='"+obj.categoryid+"'>"+obj.category+"</li>");
					$(".simplefilter").append(catname);
			 });
		});*/
		var sentdata = {
		"page": "video"
	};
		$.getJSON('http://wordpress-guru.net/makaniroofing/app.php', sentdata, function(data){ 
			//alert(data);
			//console.log(data);	
			
			
		var groupedData = _.groupBy(data, function(d){return d.categoryid});
	var k=1;
	for(i=1; i <= Object.keys(groupedData).length; i++){
		/*console.log('i:'+i);
		console.log(Object.keys(groupedData).length);*/
		
		for(j=0; j < groupedData[i].length;j++){
			/*console.log('j:'+j);*/
			if(groupedData[i][j].type=="wistia"){
				if(k==1){
				var box = $("<div class='col-50 tablet-50'><h2>"+groupedData[i][j].category+"</h2><div class='video-frame'><iframe src='http://fast.wistia.net/embed/iframe/"+groupedData[i][j].url+"?videoFoam=true' allowtransparency='true' frameborder='0' scrolling='no' class='wistia_embed' name='wistia_embed' width='640' height='360'></iframe></div><div class='card-content'><div class='icon-title color-black'>"+groupedData[i][j].name+"..</div></div></div>");
					$("#vidrow").append(box);
				}
				else{
					var box = $("<div class='col-50 tablet-50'><div class='video-frame'><iframe src='http://fast.wistia.net/embed/iframe/"+groupedData[i][j].url+"?videoFoam=true' allowtransparency='true' frameborder='0' scrolling='no' class='wistia_embed' name='wistia_embed' width='640' height='360'></iframe></div><div class='card-content'><div class='icon-title color-black'>"+groupedData[i][j].name+"..</div></div></div>");
					$("#vidrow").append(box);
				}
				}
				else{
					if(k==1){
						var box = $("<div class='col-50 tablet-50'><h2>"+groupedData[i][j].category+"</h2><div class='video-frame'><iframe class='embed-responsive-item video' src='http://youtube.com/embed/"+groupedData[i][j].url+"?version=3&loop=1'></iframe></div><div class='card-content'><div class='icon-title color-black'>"+groupedData[i][j].name+"..</div></div></div>");
					$('#vidrow').append(box);
					}
					else{
					var box = $("<div class='col-50 tablet-50'><div class='video-frame'><iframe class='embed-responsive-item video' src='http://youtube.com/embed/"+groupedData[i][j].url+"?version=3&loop=1'></iframe></div><div class='card-content'><div class='icon-title color-black'>"+groupedData[i][j].name+"..</div></div></div>");
					$('#vidrow').append(box);
					}
				} 
			console.log(groupedData[i][j].type);
		/*for (var key in groupedData[i][j]) {
			if (groupedData[i][j].hasOwnProperty(key)) {
			console.log(key + " -> " + groupedData[i][j][key]);
		  }*/
		  k++;
		}
		k=1;
	}
	/*console.log(groupedData);
	for(i=0; i <= groupedData[k].length; i++){
		console.log(groupedData[k].length);
		$.each(groupedData[k], function(idx, obj){
			console.log(i);
			console.log(groupedData[k]);	
				 var str = obj.name
				 var res = str.substr(0,15);
	
	
			if(obj.type=="wistia"){
				var box = $("<div class='col-50 tablet-50'><div class='video-frame'><iframe src='http://fast.wistia.net/embed/iframe/"+obj.url+"?videoFoam=true' allowtransparency='true' frameborder='0' scrolling='no' class='wistia_embed' name='wistia_embed' width='640' height='360'></iframe></div><div class='card-content'><div class='icon-title color-black'>"+res+"..</div></div></div>");
					$("#vidrow").append(box);
				}
				else{
					var box = $("<div class='col-50 tablet-50'><div class='video-frame'><iframe class='embed-responsive-item video' src='http://youtube.com/embed/"+obj.url+"?version=3&loop=1'></iframe></div><div class='card-content'><div class='icon-title color-black'>"+res+"..</div></div></div>");
					$('#vidrow').append(box);
				} 
		//console.log(obj.name);
			$.each(obj, function(key, value){
				
				//console.log(key + ": " + value);
			});
			k=k+1;
		});
		
		//console.log(k);
		alert(i);
		}//for*/
	});
	/*$(document).ready(function(e) {*/
	$('body').on('click', '.simplefilter li', function (){
			//alert('click!');
			$('.simplefilter li').removeClass('active');
				$(this).addClass('active');
		});
	$(".swipebox").swipebox();
		var filtrContainer = $('.filtr-container');
		var simplefilter = $('.simplefilter li');
		
	
		if (filtrContainer.length) {
			console.log(page);
			
			filtrContainer.css('visibility', 'hidden');
			setTimeout(function() {
				$(".filtr-container").filterizr();
				filtrContainer.css('visibility', 'visible');
			}, 2500);
	
		}
	/*});*/
	});

	//QUOTE FORM VALIDATION	
	myApp.onPageInit('quote', function(page) {
	if (localStorage.getItem("user_data")) {		
	var das = JSON.parse( localStorage.getItem('user_data'));
	console.log('https://secure.gravatar.com/avatar/abbbaa82c614113aee480c0599edc2bc'+hex_md5(das.user_email).toLowerCase().trim()+'/?s=100');
	if(das.status){
			$('#conname').val(das.user_firstname+' '+das.user_lastname);
			$('#conemail').val(das.user_email);
		}
	}
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
							url:"http://www.wordpress-guru.net/makaniroofing/app.php?page=gf",
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
		
//for select onchange
$("#pi,#pp,#ps,#ppt,#ppp,#ppc").hide();	
$("select#mt").on('change', function() {						   
      if ( this.value == 'Piranha Ironworkers')
      {
        $("#pi").show();
      }
	  else
	  {
		  $("#pi").hide();	
	  }
	  if ( this.value == 'Piranha Press Brakes')
      {
        $("#pp").show();
      }
	  else
	  {
		  $("#pp").hide();	
	  }
	  if ( this.value == 'Piranha Shears')
      {
        $("#ps").show();
      }
	  else
	  {
		  $("#ps").hide();	
	  }
	  if ( this.value == 'Piranha Plasma Tables')
      {
        $("#ppt").show();
      }
	  else
	  {
		  $("#ppt").hide();	
	  }
	  if ( this.value == 'Piranha Portable Presses')
      {
        $("#ppp").show();
      }
	  else
	  {
		  $("#ppp").hide();	
	  }
	  if ( this.value == 'Whitney Punch Plasma Combination')
      {
        $("#ppc").show();
      }
	  else
	  {
		  $("#ppc").hide();	
	  }
	  
    });				
	});
	
	//LOGIN FORM VALIDATION	
	myApp.onPageInit('login', function(page) {
		$('#logout').on('click',function(e){
			localStorage.removeItem('user_data');
			location.reload();
		});
		
		if (localStorage.getItem("user_data")) {
		var sam = JSON.parse( localStorage.getItem('user_data'));
		if(sam.status){
			$('#loggedin').css('background','url(https://secure.gravatar.com/avatar/abbbaa82c614113aee480c0599edc2bc'+hex_md5(sam.user_email).toLowerCase().trim()+'/?s=200) center no-repeat')
			$('#dealerfname').html('Name: '+sam.user_firstname+' '+sam.user_lastname);
			$('#dealeremail').html('Email: '+sam.user_email);
			$('#nologin').css('display','none');
			$('#loggedin').css('display','block');
		}
		else{
			$('#nologin').css('display','block');
			$('#loggedin').css('display','none');
		}
		}
		if ($('#login-form').length) {
			$('#login-form').each(function(){					
				
				$(this).validate({				
					errorClass: 'error',
					submitHandler: function(form){
						$.ajax({
							type: "POST",
							url:"http://www.wordpress-guru.net/makaniroofing/app.php?page=log",
							dataType: 'json',
							data: $(form).serialize(),
							success: function(data) {	
							console.log(data.status);						
							   if(data.status){
								   console.log(data);
								   localStorage.setItem('user_data',JSON.stringify(data));
								   var arr = JSON.parse( localStorage.getItem('user_data'));							   
								   $('#sucessMessage').html('Logged in! Please Wait.....');
								   $('#sucessMessage').show();
								   location.reload();
								   /*$("#quote-form").trigger('reset'); 
								   $('#sucessMessage').show();
								   $('#sucessMessage').delay(15000).fadeOut();*/
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
	
	$('select').click(function(){
  if (/Android/.test(navigator.userAgent)){
    $(this).blur();
  }
	});
})();