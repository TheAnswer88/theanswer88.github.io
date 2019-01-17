$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    items:4,
    loop:true,
    margin:10,
    autoplay:true,
    autoplayTimeout:1800,
    autoplayHoverPause:true,
    smartSpeed: 1200
  });
$('.play').on('click',function(){
    owl.trigger('play.owl.autoplay',[1000])
})
$('.stop').on('click',function(){
    owl.trigger('stop.owl.autoplay')
})
});
new WOW().init();
$(window).on('load', function () {
    $preloader = $('.loaderArea'),
      $loader = $preloader.find('.loader');
    $loader.fadeOut();
    $preloader.delay(350).fadeOut('slow');
  });
$(document).ready(function() {
		$(".main_menu_button").click(function() {
		$(".menu li").slideToggle("slow");
	});
});
$(document).ready(function() {
		$(".menu__service").click(function() {
		$(".menu .menu__service-wrap li").slideToggle("slow");
	});
});

$(document).ready(function() {
		$(".main_menu_button_three").click(function() {
		$(".menu .menu__about-us-wrap li").slideToggle("slow");
	});
});


