var urlValue,
  re = /=(\w+)/,
  videoID = '',
  tag,
  firstScriptTag,
  player,
  done = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: videoID,
    playerVars: {'cc_load_policy': 1},
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
}

function pauseVideo() {
  if (player.getPlayerState() === 1) {
    player.pauseVideo();
  }
  else {
    player.playVideo();
  }
}

Mousetrap.bind('ctrl+space', alert('control is working'));

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
});
