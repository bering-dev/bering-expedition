/*
 * blueimp Gallery YouTube Video Factory JS
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

function onYouTubeIframeAPIReady() {
  var videos = [], curVideoInd = 1, videoTitles = [];
  var iframeObj = null;
  var player = null;

  gapi.load('client', function(){
    gapi.client.init({
      'apiKey': 'AIzaSyDESN2WM2b5RkB9kh6LpA0pgvhP34YNcM8',
      // Your API key will be automatically added to the Discovery Document URLs.
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
    }).then(function(){
      gapi.client.youtube.search.list({
        'part': 'snippet',
        'channelId': 'UCIj6aD8L5JBqnrCX-P174Mw',
        'type': 'video',
        'maxResults': 50
      }).then(function(response) {
        console.log(response.result);
        var items = response.result.items;
        for(var i=0; i<items.length;i++){
          var item = items[i];
          var videoId = item.id.videoId;
          videos.push({
            id: videoId,
            title: item.snippet.title
          });
        }

        videoTitle.text(videos[curVideoInd].title)
        player = new YT.Player('player', {
          height: '100%',
          width: '100%',
          showinfo: 0,

          videoId: videos[curVideoInd].id,
          playerVars: {
            showinfo: 0,
            rel: 0,
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });

      })
    })
  });

  //tv = new YT.Player('tv', {events: {'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange}, playerVars: playerDefaults});
  var overlay = $('.video-overlay');
  var videoTitle = $('.title', overlay);

  overlay.on('click', function(event){
    if (iframeObj){
      overlay.hide();
      iframeObj.playVideo();
    }
  })

  overlay.on('click', '.prev, .next', function(event){
    event.stopPropagation();
    if ($(event.target).hasClass('next')){
      curVideoInd += 1;
      if (curVideoInd >= videos.length) { curVideoInd = 0; }
    }else{
      curVideoInd -= 1;
      if (curVideoInd < 0) { curVideoInd = videos.length - 1; }
    }
    videoTitle.text(videos[curVideoInd].title)
    if (player){
      player.cueVideoById({
        'videoId': videos[curVideoInd].id,
        'autoplay': 0
      })
    }

    return false;
  })

  var onPlayerReady = function(event) {
    iframeObj = event.target;
  }
  var onPlayerStateChange = function(){
    var data = JSON.parse(event.data);
    if (data.info == YT.PlayerState.PAUSED || data.info == YT.PlayerState.ENDED){
      overlay.show();
    }

  }



  /*blueimp.Gallery(videos)

  gapi.client.youtube.videos.list({
    'part': 'snippet',
    'id': 'vW7HR8rvoq0'
  }).then(function(r){ console.log(r.result) })
  */
}

//videos = [...];
