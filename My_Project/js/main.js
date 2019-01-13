$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    items:3,
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