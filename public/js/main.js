var urlValue,
  re = /=(\w+)/,
  videoID = '',
  tag,
  firstScriptTag,
  player,
  rates,
  currentRate,
  rateIndex,
  app,
  popcornVideo,
  subtitles,
  sub,
  subtitleChangeInterval;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: videoID,
    playerVars: {
      'cc_load_policy': 1,
      'controls': 0
    },
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
  event.target.playVideo();
  subtitleChangeInterval = setInterval(subtitleRefresh, 50);
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

function rewindVideo() {
  player.seekTo((player.getCurrentTime()-5), true);
  player.playVideo();
  console.log(player.getCurrentTime());
}

function forwardVideo() {
  player.seekTo((player.getCurrentTime()+5), true);
  player.playVideo();
  console.log(player.getCurrentTime());
}

Mousetrap.bind('ctrl+1', pauseVideo);
Mousetrap.bind('ctrl+4', slowdownVideo);
Mousetrap.bind('ctrl+5', speedupVideo);
Mousetrap.bind('ctrl+2', rewindVideo);
Mousetrap.bind('ctrl+3', forwardVideo);

function subtitleRefresh() {
  for (sub in subtitles) {
    var timeStart = subtitles[sub].start,
        timeEnd = subtitles[sub].start + subtitles[sub].dur;
    console.log(player.getCurrentTime());
    if (player.getCurrentTime() >= timeStart && player.getCurrentTime() <= timeEnd) {
      console.log(timeStart);
      console.log(timeEnd);
      console.log(subtitles[sub].value)
      $('textarea').val(subtitles[sub].value);
      return false;
    }
  }
}

$(document).ready(function() {

  $('#the-button').click(function() {
    urlValue = $('#link-value').val();
    tag = document.createElement('script');
    firstScriptTag = document.getElementsByTagName('script')[0];
    
    if (urlValue.length > 11) {
      videoID = urlValue.match(re)[1].trim();
    }
    else {
      videoID = urlValue.trim();
    }
    $.getJSON('/caption/youtube' + videoID, function(data) {
      subtitles = data;
      console.log(subtitles[0].start)
      for (sub in subtitles) {
        console.log(subtitles[sub].value);
      }
      $('.search-bar').hide();
      $('.main-button').hide();
      $('.shortcuts').fadeIn();
      $('.video-main').show();
      $('#player').show();
      $('#overlay').show();
      $('textarea').show();
      $('#subtitles').show();
      tag.src = "https://www.youtube.com/iframe_api";
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    });
  });

  //https://www.youtube.com/watch?v=MftOONlDQac
  //https://www.youtube.com/watch?v=fPloDzu_wcI
});