 AOS.init({
 	duration: 800,
 	easing: 'slide'
 });

$(document).ready(function($) {

	"use strict";

	$(window).stellar({
    responsive: false,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	var carousel = function() {
		$('.carousel').owlCarousel({
			loop: true,
			margin: 10,
			nav: true,
			stagePadding: 5,
			nav: false,
			navText: ['<span class="ion-md-arrow-back">', '<span class="ion-md-arrow-forward">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 2
				},
				1000:{
					items: 3
				}
			}
		});

		$('.nonloop-block-13').owlCarousel({
	    center: false,
	    items: 1,
	    loop: false,
			stagePadding: 0,
	    margin: 20,
	    nav: true,
			navText: ['<span class="ion-md-arrow-back">', '<span class="ion-md-arrow-forward">'],
	    responsive:{
        600:{
        	margin: 20,
          items: 2
        },
        1000:{
        	margin: 20,
          items: 2
        },
        1200:{
        	margin: 20,
          items: 3
        }
	    }
		});

		$('.loop-block-31').owlCarousel({
			loop: false,
			mouseDrag: false,
			touchDrag: false,
			margin: 0,
			nav: true,
			items: 1,
			autoplay: true,
			stagePadding: 0,
			nav: true,
			navText: ['<span class="ion-md-arrow-back">', '<span class="ion-md-arrow-forward">'],
			animateOut: 'fadeOut',
    	animateIn: 'fadeIn',
		});


		// Dynamic Blog Loading with LocalStorage Support
		var loadBlogPosts = function() {
			var $carousel = $('.nonloop-block-11');
			if ($carousel.length > 0) {
                // 1. Get Local Storage Blogs
                var localBlogs = JSON.parse(localStorage.getItem('gw_blogs') || '[]');
                
                // Helper to create HTML for a blog item
                var createCarouselItem = function(img, title, desc, date, link, isLocal=false) {
                    var finalLink = isLocal ? 'blog.html' : 'blog.html'; // Both go to blog.html now
                    // If local, we might want to pass an ID to open modal automatically, but for now simple link is fine.
                    
                    var html = '';
                    html += '<div class="card fundraise-item">';
                    html += '<a href="' + finalLink + '"><img class="card-img-top" src="' + img + '" alt="' + title + '"></a>';
                    html += '<div class="card-body">';
                    html += '<h3 class="card-title"><a href="' + finalLink + '">' + title + '</a></h3>';
                    html += '<p class="card-text">' + desc + '</p>';
                    html += '<span class="donation-time mb-3 d-block"><span class="icon-calendar"></span> ' + date + '</span>';
                    html += '<p class="mb-0"><a href="' + finalLink + '" class="btn btn-primary px-3 py-2">Read More</a></p>';
                    html += '</div></div>';
                    return html;
                };

                // 2. Add Local Blogs first
                localBlogs.forEach(function(blog) {
                    var itemHtml = createCarouselItem(blog.image, blog.title, blog.desc, blog.date, '#', true);
                    $carousel.append(itemHtml);
                });

                // 3. Fetch Static Blogs from blog.html
				$.get('blog.html', function(data) {
					var $blogContent = $(data);
					var $blogCards = $blogContent.find('.col-md-6.col-lg-4 .card');

					$blogCards.each(function() {
						var $originalCard = $(this);
						var imgHeight = $originalCard.find('img').attr('src');
						var title = $originalCard.find('.card-title a').text().trim();
						var date = $originalCard.find('.text-muted').text().trim();
						var desc = $originalCard.find('.card-text').text().trim();
                        
                        // Check if this static blog is already in local storage (basic duplicate check by title)
                        // This prevents showing same blog if user added it manually to HTML later
                        var isDuplicate = localBlogs.some(lb => lb.title === title);
                        if (!isDuplicate) {
                             var itemHtml = createCarouselItem(imgHeight, title, desc, date, 'blog.html');
						     $carousel.append(itemHtml);
                        }
					});

					// Initialize Owl Carousel
					$carousel.owlCarousel({
						center: true,
						items: 1,
						loop: false,
						stagePadding: 0,
						margin: 30,
						nav: false,
						navText: ['<span class="ion-md-arrow-back">', '<span class="ion-md-arrow-forward">'],
						responsive:{
							600:{
								stagePadding: 0,
								items:1
							},
							800:{
								stagePadding: 40,
								items:2
							},
							1000:{
								stagePadding: 80,
								items:3
							}
						}
					});

				}).fail(function() {
					console.error("Could not load blog.html");
				});
			}
		};
		loadBlogPosts();

        /* 
		$('.nonloop-block-11').owlCarousel({
	    center: true,
	    items: 1,
	    loop: false,
			stagePadding: 0,
	    margin: 30,
	    nav: true,
			navText: ['<span class="ion-md-arrow-back">', '<span class="ion-md-arrow-forward">'],
	    responsive:{
        600:{
        	stagePadding: 0,
          items:1
        },
        800:{
        	stagePadding: 40,
          items:2
        },
        1000:{
        	stagePadding: 80,
          items:3
        }
	    }
		}); 
        */

		$('.nonloop').owlCarousel({
	    center: true,
	    items:2,
	    loop:false,
	    margin:10,
	    nav: true,
			navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
	    responsive:{
        600:{
          items:2
        }
	    }
		});
	};
	carousel();

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	var counter = function() {
		
		$('.section-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$(this.element).find('.ftco-number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();
	
	

	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

	// navigation
	var OnePageNav = function() {
		$(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on('click', function(e) {
		 	e.preventDefault();

		 	var hash = this.hash,
		 			navToggler = $('.navbar-toggler');
		 	$('html, body').animate({
		    scrollTop: $(hash).offset().top
		  }, 700, 'easeInOutExpo', function(){
		    window.location.hash = hash;
		  });


		  if ( navToggler.is(':visible') ) {
		  	navToggler.click();
		  }
		});
		$('body').on('activate.bs.scrollspy', function () {
		  console.log('nice');
		})
	};
	OnePageNav();


	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });

  $('#checkin_date, #checkout_date').datepicker({
	  'format': 'd MM, yyyy',
	  'autoclose': true
	});



});

