/*-----------------------------------------------------------------------------------

 	Scripts
 
-----------------------------------------------------------------------------------*/
(function(){
'use strict';

// REORGANIZE ISOTOPE FUNCTION
function reorganizeIsotope() {
	jQuery('.masonry').each(function(){
		var $container = jQuery(this);
		var maxitemwidth = $container.data('maxitemwidth');
		if (!maxitemwidth) { maxitemwidth = 370; }
		var itemmargin = parseInt($container.children('div').css('marginRight')) + parseInt($container.children('div').css('marginLeft'), 10);
		var containerwidth = Math.ceil(($container.width() - itemmargin));
		var rows = Math.ceil(containerwidth/maxitemwidth);
		var marginperrow = (rows-1)*itemmargin;
		var newitemmargin = marginperrow / rows;
		var itemwidth = Math.floor((containerwidth/rows)-newitemmargin - 1);
		$container.children('div').css({ 'width': itemwidth+'px' });
		if ($container.children('div').hasClass('isotope-item')) { $container.isotope( 'reLayout' ); }
	});
}


// STICKY FOTTER OPTION
function stickyfooter() {
	var footerHeight = jQuery("footer").height();
	jQuery("#page-content").css({'minHeight': jQuery(window).height()+'px'});
	jQuery("footer").css({'position':'absolute','bottom':'0','left':'0'});
	jQuery("#page-content").append('<div id="footer-pseudo"></div>');
	jQuery("#footer-pseudo").css({'height': footerHeight+'px'});
}


// SMOOTH SHOW FUNCION FOR ELEMENTS THAT TAKE ACTION WHEN VISIBLE (animations & skills, etc)
function smoothShow() {

	/* -- A N I M A T I O N S -- */
	jQuery('.has-animation').each(function() {
		var thisItem = jQuery(this);
		if (jQuery(window).width() > 700) {
			var visible = thisItem.visible(true);
			var delay = thisItem.attr("data-delay");
			if (!delay) { delay = 0; }
			if (thisItem.hasClass( "animated" )) {} 
			else if (visible) {
				thisItem.delay(delay).queue(function(){thisItem.addClass('animated');});
			}
		} else {
			thisItem.addClass('animated');	
		}
	});
	
	/* -- S K I L L -- */
	jQuery('.skill').each(function() {
		var thisItem = jQuery(this);
		var visible = thisItem.visible(true);
		var percent = thisItem.find('.skill-bar .skill-active ').attr('data-perc');
		if (thisItem.hasClass( "anim" )) {} 
		else if (visible) {
			var randomval = Math.floor(Math.random() * (300 - 50 + 1)) + 50;
			thisItem.addClass("anim");
			thisItem.find('.skill-bar .skill-active ').animate({'width': percent+'%',}, 2000, 'easeInOutQuart', function(){
				jQuery(this).find('.tooltip').delay(randomval).animate({'opacity':1}, 500);	
			}).css('overflow', 'visible');
		}
	});
		
}


jQuery(window).load(function() {		
	

	
	/*---------------------------------------------- 
			Hide Page Loader + Smooth Show
	------------------------------------------------*/
	jQuery("#page-loader .page-loader-inner").delay(500).fadeIn(10, function(){
		jQuery(this).fadeOut(500,function() {
			jQuery("#page-loader").fadeOut(500);
		});
	});
		
	
	
	/*---------------------------------------------- 
				   	 Parallax
	------------------------------------------------*/
	if(jQuery().parallax) { 
		jQuery('.parallax-section').parallax();
	}
	
	
	
	
	if( jQuery().isotope ) {
		
		/*---------------------------------------------- 
					  Call Isotope   
		------------------------------------------------*/	
		jQuery('.masonry').each(function(){
			var $container = jQuery(this);
			
			$container.imagesLoaded( function(){
				$container.isotope({
					itemSelector : '.masonry-item',
					transformsEnabled: true			// Important for videos
				});	
			});
		});
		
		
		/*---------------------------------------------- 
					 Isotope : Filter
		------------------------------------------------*/
		jQuery('.masonry-filter').on("click", "li a", function() { 
			var thisItem = jQuery(this);
			var parentul = thisItem.parents('ul.filter').data('related-grid');
			thisItem.parents('ul.filter').find('li a').removeClass('active');
			thisItem.addClass('active');
			
			var selector = thisItem.attr('data-filter-value');
			jQuery('#'+parentul).isotope({ filter: selector }, function(){ });
			
			return false;
		});
		
		
		reorganizeIsotope();
			
		jQuery(window).resize(function() {
			reorganizeIsotope();
		});
		
		
	} /* END if isotope */
		
	
	
	
	/*---------------------------------------------- 
					 Open Nav 
	------------------------------------------------*/
	jQuery('header').on("click", ".open-nav", function() { 
		jQuery('header').toggleClass('nav-is-open'); 
		return false;
	});
	
	
	
	
	/*---------------------------------------------- 
				 Back Top Top
	------------------------------------------------*/
	jQuery('#backtotop').on("click", function() { 
		jQuery('html, body').animate({scrollTop: 0}, 1000, 'easeInOutQuart');
		return false;						   
	});
	
	
	
	
	/*---------------------------------------------- 
				 Scroll Down
	------------------------------------------------*/
	jQuery('#scroll-down').on("click", function() { 
		jQuery('html,body').animate({ scrollTop: jQuery("#page-body").offset().top}, 1000, 'easeInOutQuart');
		return false;						   
	});
	


	
	
	/*---------------------------------------------- 
			 Owl Carousel
	------------------------------------------------*/
	if(jQuery().owlCarousel) {
		
		jQuery(".owl-slider").owlCarousel({
			items:1,
			stopOnHover : true,
			nav: true,
			navText:false,
			dots: false,
			smartSpeed : 800,			
			singleItem : true,
			autoHeight : true,
			loop: false,
			autoplay: false,
			navRewind: false,
			onTranslated: function () {
				jQuery(".owl-slider .owl-slider-caption").removeClass("active");
				jQuery(".owl-slider .owl-item.active .owl-slider-caption").addClass("active");
				
				if (jQuery(".owl-slider.hero-slider .owl-item.active .slider-item").hasClass("text-light")) {
					jQuery("#logo").addClass("show-light-logo");	
					jQuery("#menu").addClass("menu-light");	
					jQuery(".owl-slider.hero-slider").addClass("nav-light");	
				} else {
					jQuery("#logo").removeClass("show-light-logo");	
					jQuery("#menu").removeClass("menu-light");	
					jQuery(".owl-slider.hero-slider").removeClass("nav-light");	
				}
			},
			onInitialized: function () {
				jQuery(".owl-slider .owl-item.active .owl-slider-caption").addClass("active");
			}
		});
				
	}
	
		

	
	/*---------------------------------------------- 
				Wolf Parallax
	------------------------------------------------*/
	if(jQuery().wolf) { 
		
		jQuery('.wolf-grid').wolf();
		
		
		/*---------------------------------------------- 
					 Wolf : Filter
		------------------------------------------------*/
		jQuery('.wolf-filter').on("click", "li a", function() { 
			var thisItem = jQuery(this);

			var parentul = thisItem.parents('ul.wolf-filter').data('related-grid');
			thisItem.parents('ul.filter').find('li a').removeClass('active');
			thisItem.addClass('active');
			
			jQuery('html,body').animate({ scrollTop: jQuery("#"+parentul).offset().top-parseInt(jQuery("#header-filter").height(), 10)-100}, 500, 'easeInOutQuart');
			
			var selector = thisItem.attr('data-filter-value');
			jQuery('#'+parentul).wolf({ filter: selector, filtertype: 'hide' });
			
			return false;
		});
		
	}
	
	
	/*---------------------------------------------- 
				   	 Video BG
	------------------------------------------------*/
	if(jQuery().bgVideo) { 
		setTimeout(function() {
			jQuery('.videobg-section').bgVideo();
		}, 1000);
	}
	
	
	
	/*---------------------------------------------- 
				   	Lightcase
	------------------------------------------------*/
	if(jQuery().lightcase) { 
		jQuery('a[data-rel^=lightcase]').lightcase({ 
			showSequenceInfo: false, 
			swipe: true, 
			showCaption:false,
			video: {
				width : 780,
				height : 420
				}
		});
	}
	
	
	/*---------------------------------------------- 
				Header Option 
				   (hide/show elements)
	------------------------------------------------*/
	/* add class to header if hero-invisible */
	jQuery(window).scroll(function() { 
		if (jQuery( window ).scrollTop() +50 > jQuery("#hero").height()) {
			jQuery('header').addClass("hero-invisible");
		} else {
			jQuery('header').removeClass("hero-invisible");
		}
	});
		
	
	
	/*---------------------------------------------- 
			Responsive Nav
	------------------------------------------------*/
	jQuery('#main-nav').on("click", "li > a", function() {
		var thisItem = jQuery(this); 
		if (thisItem.siblings('ul.submenu').length > 0 && thisItem.siblings('ul.submenu').css('display') === 'none') {
			thisItem.siblings('ul.submenu').slideDown(400);
			return false;	
		}
	});
	
	
	/*---------------------------------------------- 
			Open/Close Filter & Share
	------------------------------------------------*/
	jQuery('header').on("click", ".open-filter", function() { 
		jQuery('#header-filter').addClass('filter-is-open');
		jQuery('html,body').animate({ scrollTop: jQuery("#"+jQuery(this).data('related-grid')).offset().top-parseInt(jQuery("#header-filter").height(), 10)-100}, 1000, 'easeInOutQuart');
		return false;
	});
	jQuery('header').on("click", ".close-filter", function() {  jQuery('#header-filter').removeClass('filter-is-open'); return false; });
	
	/* share */
	jQuery('header').on("click", ".open-share", function() { jQuery('#header-share').addClass('share-is-open'); return false; });
	jQuery('header').on("click", ".close-share", function() {  jQuery('#header-share').removeClass('share-is-open'); return false; });
	
	
	
	
	/*---------------------------------------------- 
					 Pagination
	------------------------------------------------*/
	if (jQuery('.single-pagination').length >  0 && jQuery(window).width() > 780) { 
		var pHeight = jQuery('.single-pagination').height();
		var pPrevHeight = jQuery('.single-pagination li.prev a').height();
		var pNextHeight = jQuery('.single-pagination li.next a').height();
		if (pPrevHeight < pHeight-10 && jQuery('.single-pagination li.prev a img').length >  0) { 
			jQuery('.single-pagination li.prev ').css('marginTop',(pHeight-pPrevHeight)/2 + 'px'); }
		if (pNextHeight < pHeight-10 && jQuery('.single-pagination li.next a img').length >  0) { 
			jQuery('.single-pagination li.next ').css('marginTop',(pHeight-pNextHeight)/2 + 'px'); }
	}
	
	
	
	/*---------------------------------------------- 
				 Inline Video
	------------------------------------------------*/
	jQuery('body').on("click", ".inline-video", function() { 
		var el = jQuery(this);
		var type = el.data('type');
		var video = el.data('videoid');
				
		if (type === 'youtube') { 
		var iframe='<iframe src="http://www.youtube.com/embed/'+video+'?autoplay=1" width="100%" height="100%" frameborder="0" allowfullscreen ></iframe>';
		} else if (type === 'vimeo') {
		var iframe='<iframe src="https://player.vimeo.com/video/'+video+'?autoplay=1" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>';
		}
		
		el.append('<div class="inline-iframe-container"></div>');
		el.find(".inline-iframe-container").html(iframe+'<div class="close-inline-video"></div>');
		
		setTimeout(function() {
			el.addClass('active');
		}, 1000);
		
		return false;
	});
	
	jQuery('body').on("click", ".close-inline-video", function() { 
		var thisItem = jQuery(this); 
		thisItem.parents( ".inline-video" ).removeClass('active');
		thisItem.parent( ".inline-iframe-container" ).remove();
		return false;
	});
	
	
	
	/*---------------------------------------------- 
				        Tabs
	------------------------------------------------*/	
	jQuery(".tabs").each(function() {
		var thisItem = jQuery(this); 
		thisItem.find('.tab-content').removeClass('active');
		var rel = thisItem.find('.active').attr('href');
		thisItem.find('.'+rel).addClass('active');
	});
	
	jQuery(".tab-nav").on("click", "a", function() { 
		var thisItem = jQuery(this); 
		var parentdiv = thisItem.parents('li').parent('ul').parent('div');
		var rel = thisItem.attr('href');
		
		jQuery(parentdiv).find(".tab-nav a").removeClass("active");
		thisItem.addClass("active");
		
		jQuery(parentdiv).find(".tab-container .tab-content").hide().removeClass('active');
		jQuery(parentdiv).find(".tab-container ."+rel).fadeIn(500).addClass('active');
		
		return false;
		
	});
	
	
	
	/*---------------------------------------------- 
			Toggle & Accordion
	------------------------------------------------*/		
	jQuery(".toggle-item").each(function() {
		jQuery(this).find('.toggle-active').siblings('.toggle-inner').slideDown(300);							
	});
	
	jQuery(".toggle-item").on("click", ".toggle-title", function() { 
		var thisItem = jQuery(this); 
		var parentdiv = thisItem.parent('div').parent('div');
		var active = thisItem.parent('div').find('.toggle-inner').css('display');
		
		if (jQuery(parentdiv).attr('class') === 'accordion') {
			if (active !== 'none' ) { 
				jQuery(parentdiv).find('.toggle-item .toggle-inner').slideUp(300);
				thisItem.toggleClass('toggle-active');
			} else {
				jQuery(parentdiv).find('.toggle-item .toggle-inner').slideUp(300);
				jQuery(parentdiv).find('.toggle-item .toggle-title').removeClass('toggle-active');
				
				thisItem.toggleClass('toggle-active');
				thisItem.siblings('.toggle-inner').slideDown(300);
			}
		} else {
			thisItem.toggleClass('toggle-active');
			thisItem.siblings('.toggle-inner').slideToggle(300);
		}
		
		return false;
	});
	
	
	stickyfooter();	
		
});

jQuery(window).resize(function() { 
	stickyfooter(); 
});

jQuery( window ).scroll(function() {
	smoothShow();
});

})(jQuery);

/*---------------------------------------------- 
			CUSTOM - Frontend jQuery scripts
	------------------------------------------------*/		

/* Programmer Quote Scramble Binary Text */
TweenLite.to("#programquote", 5, {scrambleText:{text:"&ldquo;Programming is like writing a book. Except when you miss a comma, it makes no sense.&rdquo;", chars:"10", revealDelay:2, tweenLength:false, speed:0.2, ease:Linear.easeNone}});

/* VJane Beauty Commercial Video */
$(".commercial").fitVids();

/* InspiredMind.tv Intro Video */
$(".inspiredmind").fitVids();

/* Jim Promo Video */
$(".jimpromo").fitVids();
