var urlValue,
  re = /=(\w+)/,
  videoID = '',
  tag,
  firstScriptTag,
  player,
  rates,
  currentRate,
  rateIndex;

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
  rates = player.getAvailablePlaybackRates();
  currentRate = player.getPlaybackRate();
  rateIndex = rates.indexOf(currentRate);
  console.log(rates);
  console.log(currentRate);
  console.log(rateIndex);
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

function slowdownVideo() {
  if (rateIndex > 0) {
    player.setPlaybackRate(rates[rateIndex-1]);
    rateIndex -= 1;
  }
}

function speedupVideo() {
  if (rateIndex < rates.length -1) {
    player.setPlaybackRate(rates[rateIndex+1]);
    rateIndex += 1;
  }
}

Mousetrap.bind('ctrl+space', pauseVideo);
Mousetrap.bind('ctrl+-', slowdownVideo);
Mousetrap.bind('ctrl+=', speedupVideo);

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
    $('.shortcuts').fadeIn();
    tag.src = "https://www.youtube.com/iframe_api";
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  });
  
});
