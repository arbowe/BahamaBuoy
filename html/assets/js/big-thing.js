/*	
*	############################################################################
*	
*	Big Thing Landing Page Scripts for General App
*	---------------------------------------------------------------------
*
*	Version		1.1
*	Author		The Develovers
*	Copyright	Copyright 2013 The Develovers
*	
*	############################################################################
*/

$(document).ready(function() {

	/* init testimonial fade slider */
	$('.flexslider').flexslider({
			directionNav: false,
			slideshowSpeed: 6000, /* adjust the speed in milliseconds */
			useCSS: true,
			touch: true,
			controlNav: false,
			pauseOnAction: true,
			pauseOnHover: false
			
	});

	// init scroll-to effect navigation, adjust the scroll speed in milliseconds
	$('#main-menu').localScroll(1000);
	$('.hero-text').localScroll(1000);	


	// init carousels
  	$('#hero-carousel').carousel();

  	// ajax call for newsletter function
	$('.newsletter .btn').click( function() {

		$btn = $(this);		

		$.ajax({
						
			url: 'mailchimp.php',
			type:  'POST',
			dataType: 'json',
			cache: false,
			data: {
				email: $('.newsletter input[name="email"]').val(),				
			},
			beforeSend: function(){
				$btn.addClass('loading');				
				$btn.attr('disabled', 'disabled');
			},
			success: function( data, textStatus, XMLHttpRequest ){
				
				var className = '';

				if( data.result == true ){
					className = 'alert-success';
				}else {
					className = 'alert-error';
				}

				$('.newsletter .alert p').html( data.message );
				$('.newsletter .alert').removeClass( 'alert-error alert-success' );
				$('.newsletter .alert').addClass( 'alert ' + className );
				$('.newsletter .alert').slideDown(300);

				$btn.removeClass('loading');
				$btn.removeAttr('disabled');
				
			},
			error: function( XMLHttpRequest, textStatus, errorThrown ){
				console.log("AJAX ERROR: \n" + XMLHttpRequest.responseText + "\n" + textStatus);				
			}
			
		});
	});

	$('.close').click( function(){

		$(this).parent().slideUp(300);
	});

	// feature detection and polyfill	
	var theForm = $('.ie8 form');
	
	theForm.find('input, textarea').each(function(){
		
		// if HTML5 input placeholder is not supported
		var placeholderText = $(this).attr('placeholder');
		
		if(placeholderText){
			
			$(this)
				.addClass('input-placeholder')
				.val(placeholderText)
				.bind('focus', function(){
				
					if($(this).val() == placeholderText ){
						
						$(this).val('').removeClass('input-placeholder');
					}
				
				})
				.bind('blur', function(){
					
					if($(this).val() == '' ){
					
						$(this).val(placeholderText).addClass('input-placeholder');
					}
				});
		}				
	});

	$('input#email').keypress(function(event){	
	
		if(event.keyCode == 13){
			event.preventDefault();
			$('#submit').click();
		}

	});

});