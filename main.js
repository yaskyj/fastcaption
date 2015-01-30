var urlValue,
  re = /=(\w+)/,
  videoID = '',
  tag,
  firstScriptTag,
  player,
  done = false,
  pause = {};

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: videoID,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  // if (event.data == YT.PlayerState.PLAYING && !done) {
  //   setTimeout(stopVideo, 6000);
  //   done = true;
  // }
}

function stopVideo() {
  player.stopVideo();
}

function pauseVideo() {
  player.pauseVideo();
}

Mousetrap.bind('shift+space', function(e) {
  alert('Mousetrap is working!');
});

$(document).ready(function() {
  $('#the-button').click(function() {
    urlValue = $('#link-value').val();
    re = /=(\w+)/;
    videoID;
    tag = document.createElement('script');
    firstScriptTag = document.getElementsByTagName('script')[0];
    
    if (urlValue.length > 11) {
      videoID = urlValue.match(re)[1].trim(); 
    }
    else {
      videoID = urlValue.trim();
    }
    $('.search-bar').hide();
    $('.main-button').hide();
    tag.src = "https://www.youtube.com/iframe_api";
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  });

  if (true) {

  }
});
