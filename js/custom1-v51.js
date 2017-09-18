;(function () {

  'use strict';

  var blockAnimate = function(selector) {
    var eventsBlock = $(selector);
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

  var infoBlock = $('.events-info-column');
  var MAX_INFOS = 3;
  var eventInfos = [];

  var fillEventInfo = function(block, id){
    var infoObj = eventInfos[id-1];
    var infoColumn = block.find('[role=event-item-'+id+']');
    if (infoObj) {
      $('[role=date]', infoColumn).text(infoObj.date);
      $('[role=title]', infoColumn).text(infoObj.title);
      infoColumn.data('id',id-1)
      if (id == 1) { selectEventInfo(infoColumn) }
    } else {
      infoColumn.remove()
    }
  }

  var selectEventInfo = function(column){
    column.addClass('active').siblings().removeClass('active');
    var infoObj = eventInfos[parseInt(column.data('id'))];
    var mainBlock = $('[role=main-event]', infoBlock);
    $('[role=date]', mainBlock).text(infoObj.date);
    $('[role=title]', mainBlock).text(infoObj.title);
    $('[role=description]', mainBlock).html(infoObj.description);
    var imageUrl = infoObj.image.length ? infoObj.image : 'images/events/some_pic_2.jpg'

    //$('[role=image]', mainBlock).css('background-image', 'url('+imageUrl+')');
    var img = $('[role=image]', mainBlock).attr('src', imageUrl);

    img.on('bestfit',function(){
      var css;
      var ratio=$(this).width() / $(this).height();
      var pratio=$(this).parent().width() / $(this).parent().height();
      if (ratio<pratio) css={width:'auto', height:'100%'};
      else css={width:'100%', height:'auto'};
      $(this).css(css);
    }).on('load', function(){
        $(this).trigger('bestfit');
    }).trigger('bestfit');

    //console.log(imageUrl);
    //console.log(infoObj);
    // TODO: fill form checkboxes

    var formBlock = $('#fh5co-events .events-group');
    var html = ''

    for(var i=0; i<infoObj.slugs.length; i++){

      var slug = infoObj.slugs[i];
      var parts = slug.split('; ');
      var slug_id = parts[0].trim();
      var slug_title = parts[1];
      if (slug_title){
        html += '<label><input type="checkbox" name="events" value="'+slug_id+'" checked>&nbsp;'
        html += slug_title + '</label><br/>'
      }
    }

    $('#thankyou_message').css('display', 'none')
    formBlock.html(html);
  }

  $('.event-small-block', infoBlock).on('click', function(e){
    var column = $(e.currentTarget)
    selectEventInfo(column);
  })

  var readEvents = function(){
    $.getJSON("https://spreadsheets.google.com/feeds/list/1UrYhCsQffzEEnfo03odvmlWWg9Goa7xd0-xAff6EJA8/od6/public/values?alt=json", function(data) {
      var entryList = data.feed.entry;
      var entry;
      for(var i=0; i < entryList.length; i++){
        entry = entryList[i];
        if (entry['gsx$actual']['$t'] == 'FALSE') continue;
        if (eventInfos.length > MAX_INFOS) break;
        eventInfos.push({
          date:        entry['gsx$date']['$t'],
          title:       entry['gsx$title']['$t'],
          description: entry['gsx$description']['$t'],
          image:       entry['gsx$image']['$t'],
          slugs:       entry['gsx$slug']['$t'].split('.')
        });
      }

      fillEventInfo(infoBlock, 1);
      fillEventInfo(infoBlock, 2);
      fillEventInfo(infoBlock, 3);
    });
  }

  $(function(){
    blockAnimate('#fh5co-events');
    blockAnimate('#fh5co-albums');

    readEvents();

    if ($(window).scrollTop() > 500){
      var header = $('#fh5co-header');
      header.addClass('navbar-fixed-top fh5co-animated slideInDown');
    }

  });

}());