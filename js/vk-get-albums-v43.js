;(function () {

  var albums = {};
  var jssor_1_slider;
  var albumThumbs;
  var infoBlock = $('#fh5co-albums .blue-form');
  var jssorEl = $('#jssor_1');

  function gotAlbums(data){
    if( !data || !data.response) {
      console.log('VK error:', data); return;
    }
    var as = data.response;
    for(var i=0; (i<as.length) && (i < 3); i++){
      albums[as[i].aid] = as[i]
      getAlbumImages(as[i], i == 0)
    }
  }

  function getAlbumImages(album, doSelect){
    var id = album.aid
    vkApi('photos.get', { album_id: id }, function(data){
      if( !data || !data.response) {
        console.log('VK error:', data); return;
      }
      albums[id].images = data.response;
      //console.log(data.response)
      var img = data.response[0];

      if (img){
        var html = '<div class="col-md-4 col-xs-4"><img data-id="'+id+'" src="'+img.src_big + '" ';
        if (doSelect){ html += ' class="active"' }
        albumThumbs.append(html+'/></div>')

        if (doSelect){ selectAlbum(id) }
      }
    })

  }

  function selectAlbum(albumId){
    var album = albums[albumId]

    $('h3', infoBlock).text(album.title)
    $('p', infoBlock).text(album.description)
    var html = '';
    var images = album.images
    for(var i = 0; i<images.length; i++){
      html += '<div><img data-u="image" src2="'+(images[i].src_xbig || images[i].src_big)+'"/></div>'
    }
    var firstSlidesRow = $('#fh5co-albums [data-u=slides]:first');
    if (jssor_1_slider) {
      jssor_1_slider.$Pause();
      $('#fh5co-albums [data-u=slides]').html('')
      firstSlidesRow.next().remove();
    }
    $('#fh5co-albums [data-u=slides]:first').html(html);

    jssor_1_slider_init();
  }

  function vkApi( method, params, callback) {
      params.owner_id = -133762819;
      $.ajax({
          url: 'https://api.vk.com/method/'+method,
          data: params,
          dataType: "jsonp",
          callback: 'cb_vkapi',
          success: callback
      });
  }

  $(function(){
    albumThumbs = $('#fh5co-albums [role=album-selector]');

    vkApi('photos.getAlbums', {}, gotAlbums)

    $(albumThumbs).on('click', 'img', function(event){
      var img = $(event.target);
      if (!img.hasClass('active')){
        $('img', albumThumbs).removeClass('active');
        selectAlbum(img.data('id'))
        img.addClass('active')
      }
    })

  })

  var jssor_1_slider_init = function() {

    var jssor_1_SlideshowTransitions = [
      {$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:1200,x:-0.3,$SlideOut:true,$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:1200,x:-0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:1200,x:0.3,$SlideOut:true,$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:1200,y:0.3,$During:{$Top:[0.3,0.7]},$Easing:{$Top:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:1200,y:-0.3,$SlideOut:true,$Easing:{$Top:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:1200,y:-0.3,$During:{$Top:[0.3,0.7]},$Easing:{$Top:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:1200,y:0.3,$SlideOut:true,$Easing:{$Top:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:1200,x:0.3,$Cols:2,$During:{$Left:[0.3,0.7]},$ChessMode:{$Column:3},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:1200,x:0.3,$Cols:2,$SlideOut:true,$ChessMode:{$Column:3},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:1200,y:0.3,$Rows:2,$During:{$Top:[0.3,0.7]},$ChessMode:{$Row:12},$Easing:{$Top:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:1200,y:0.3,$Rows:2,$SlideOut:true,$ChessMode:{$Row:12},$Easing:{$Top:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:1200,y:0.3,$Cols:2,$During:{$Top:[0.3,0.7]},$ChessMode:{$Column:12},$Easing:{$Top:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:1200,y:-0.3,$Cols:2,$SlideOut:true,$ChessMode:{$Column:12},$Easing:{$Top:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:1200,x:0.3,$Rows:2,$During:{$Left:[0.3,0.7]},$ChessMode:{$Row:3},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:1200,x:-0.3,$Rows:2,$SlideOut:true,$ChessMode:{$Row:3},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:1200,x:0.3,y:0.3,$Cols:2,$Rows:2,$During:{$Left:[0.3,0.7],$Top:[0.3,0.7]},$ChessMode:{$Column:3,$Row:12},$Easing:{$Left:$Jease$.$InCubic,$Top:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:1200,x:0.3,y:0.3,$Cols:2,$Rows:2,$During:{$Left:[0.3,0.7],$Top:[0.3,0.7]},$SlideOut:true,$ChessMode:{$Column:3,$Row:12},$Easing:{$Left:$Jease$.$InCubic,$Top:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:1200,$Delay:20,$Clip:3,$Assembly:260,$Easing:{$Clip:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:1200,$Delay:20,$Clip:3,$SlideOut:true,$Assembly:260,$Easing:{$Clip:$Jease$.$OutCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:1200,$Delay:20,$Clip:12,$Assembly:260,$Easing:{$Clip:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:1200,$Delay:20,$Clip:12,$SlideOut:true,$Assembly:260,$Easing:{$Clip:$Jease$.$OutCubic,$Opacity:$Jease$.$Linear},$Opacity:2}
    ];

    var jssor_1_options = {
      $AutoPlay: 4,
      $FillMode: 1,
      $SlideshowOptions: {
        $Class: $JssorSlideshowRunner$,
        $Transitions: jssor_1_SlideshowTransitions,
        $TransitionsOrder: 1
      },
      $ArrowNavigatorOptions: {
        $Class: $JssorArrowNavigator$
      }
    };

    jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);

    function ScaleSlider() {
      var parentWidth = jssorEl.parent().width();
      if (parentWidth) {
        jssor_1_slider.$ScaleWidth(parentWidth);
        infoBlock.css('height', infoBlock.parent().width() == jssorEl.width() ? 'auto' : jssorEl.height());
      }
      else window.setTimeout(ScaleSlider, 300);
    }
    //Scale slider after document ready
    ScaleSlider();

    //Scale slider while window load/resize/orientationchange.
    $(window).bind("load", ScaleSlider);
    $(window).bind("resize", ScaleSlider);
    $(window).bind("orientationchange", ScaleSlider);
    //responsive code end
  };
}());