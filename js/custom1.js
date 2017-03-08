;(function () {

  'use strict';

  var eventsAnimate = function() {
    var eventsBlock = $('#fh5co-events');
    if ( eventsBlock.length > 0 ) {

      eventsBlock.waypoint( function( direction ) {

        if( direction === 'down' && !$(this.element).hasClass('animated') ) {


          setTimeout(function() {
            eventsBlock.find('.to-animate').each(function( k ) {
              var el = $(this);

              setTimeout ( function () {
                el.addClass('fadeInUp animated');
              },  k * 200, 'easeInOutExpo' );

            });
          }, 200);



          $(this.element).addClass('animated');

        }
      } , { offset: '80%' } );

    }
  };

  $(function(){
    eventsAnimate();
  });
}());