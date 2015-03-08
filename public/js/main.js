var urlValue,
  re = /=(.+)/,
  videoID = '',
  tag,
  firstScriptTag,
  player,
  rates,
  currentRate,
  rateIndex,
  popcornVideo,
  subtitles,
  sub,
  subtitleChangeInterval,
  timeStart,
  timeEnd,
  prevSub,
  nextSub,
  editSub,
  videoData,
  currentSubIndex;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '340',
    width: '560',
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
  subtitleChangeInterval = setInterval(subtitleRefresh, 100);
  
  $('.sub-edit').focus(function() {
    player.pauseVideo();
    clearInterval(subtitleChangeInterval);
  });
  $('.sub-edit').focusout(function() {
    player.playVideo();
    subtitleChangeInterval = setInterval(subtitleRefresh, 100);
  });
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
Mousetrap.bind('ctrl+shift+s', saveCaption);
Mousetrap.bind('ctrl+shift+q', startCaptionTime);

function subtitleRefresh() {
  if (player.getPlayerState() === 1) {
    for (sub in subtitles) {
      timeStart = subtitles[sub].start,
      timeEnd = subtitles[sub].start + subtitles[sub].dur;
      if (player.getCurrentTime() < subtitles[0].start) {
        currentSubIndex = sub;
        editSub = subtitles[0];
        nextSub = subtitles[1];
        $('.sub-edit').val(editSub.value);
        $('.sub-next').val(nextSub.value);
        $('.sub-prev').val('');
        return false;
      }

      if (player.getCurrentTime() >= timeStart && player.getCurrentTime() <= timeEnd) {
        currentSubIndex = sub;
        editSub = subtitles[sub];
        prevSub = subtitles[parseInt(sub)-1];
        nextSub = subtitles[parseInt(sub)+1];
        $('#subtitles h3').text(editSub.value);
        $('.sub-edit').val(editSub.value);
        $('.sub-next').val(nextSub.value);
        $('.sub-prev').val(prevSub.value);
        return false;
      }
    }
  }
}

function saveCaption() {
  console.log(currentSubIndex);
  videoData.captions[currentSubIndex].value = $('.sub-edit').val();
  $.ajax({
    url: '/video/' + videoID,
    type: 'POST',
    data: JSON.stringify(videoData),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json'
  });
  // console.log(videoData);
  $(document).focusout();  
  player.playVideo();
  subtitleChangeInterval = setInterval(subtitleRefresh, 100);

}

function startCaptionTime() {
  console.log(player.getCurrentTime());
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
    $.getJSON('/video/youtube' + videoID, function(data) {
      videoData = data;
      subtitles = videoData.captions;
      $('.search-bar').hide();
      $('.main-button').hide();
      $('.shortcuts').fadeIn();
      $('.video-main').show();
      $('#player').show();
      $('#overlay').show();
      $('.sub-prev').show();
      $('.sub-edit').show();
      $('.sub-next').show();
      $('#subtitles').show();
      $('.prev-head').show();
      $('.edit-head').show();
      $('.next-head').show();      
      tag.src = "https://www.youtube.com/iframe_api";
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    });
  });

  //https://www.youtube.com/watch?v=MftOONlDQac
  //https://www.youtube.com/watch?v=fPloDzu_wcI
  //https://www.youtube.com/watch?v=poL7l-Uk3I8
});