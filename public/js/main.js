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
  currentSubIndex,
  startCaption;

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
  player.seekTo((player.getCurrentTime()-2), true);
  player.playVideo();
  console.log(player.getCurrentTime());
}

function forwardVideo() {
  player.seekTo((player.getCurrentTime()+2), true);
  player.playVideo();
  console.log(player.getCurrentTime());
}

Mousetrap.bind('ctrl+1', pauseVideo);
Mousetrap.bind('ctrl+4', slowdownVideo);
Mousetrap.bind('ctrl+5', speedupVideo);
Mousetrap.bind('ctrl+2', rewindVideo);
Mousetrap.bind('ctrl+3', forwardVideo);
Mousetrap.bind('ctrl+shift+s', saveCaption);
Mousetrap.bind('ctrl+shift+q', addCaption);
Mousetrap.bind('ctrl+shift+d', deleteCaption);


function subtitleRefresh() {
  console.log(player.getCurrentTime());
  if (player.getPlayerState() === 1) {
    for (sub in subtitles) {
      timeStart = subtitles[sub].start,
      timeEnd = subtitles[sub].start + subtitles[sub].dur;
      // if (player.getCurrentTime() < subtitles[0].start) {
      //   currentSubIndex = sub;
      //   editSub = subtitles[0];
      //   nextSub = subtitles[1];
      //   $('.sub-edit').val('');
      //   $('.edit-start').val('');
      //   $('.edit-end').val('');
      //   $('.sub-next').val('');
      //   $('.next-start').val('');
      //   $('.next-end').val('');
      //   $('.sub-prev').val('');
      //   $('.prev-start').val('');
      //   $('.prev-end').val('');
      //   return false;
      // }

      if (player.getCurrentTime() >= timeStart && player.getCurrentTime() <= timeEnd) {
        currentSubIndex = sub;
        editSub = subtitles[sub];
        prevSub = subtitles[parseInt(sub)-1];
        nextSub = subtitles[parseInt(sub)+1];
        console.log(currentSubIndex);
        $('#subtitles h3').text(editSub.value);
        $('.sub-edit').val(editSub.value);
        $('.edit-start').val(editSub.start);
        $('.edit-end').val(editSub.start + editSub.dur);
        $('.sub-next').val(nextSub.value);
        $('.next-start').val(nextSub.start);
        $('.next-end').val(nextSub.start + nextSub.dur);
        $('.sub-prev').val(prevSub.value);
        $('.prev-start').val(prevSub.start);
        $('.prev-end').val(prevSub.start + prevSub.dur);
        return false;
      }

      if (sub === subtitles[subtitles.length-1]) {
        console.log(sub);
        $('.sub-edit').val('');
        $('.edit-start').val('');
        $('.edit-end').val('');
        $('.sub-next').val('');
        $('.next-start').val('');
        $('.next-end').val('');
        $('.sub-prev').val(subtitles[subtitles.length-1].value);
        $('.prev-start').val(subtitles[subtitles.length-1].start);
        $('.prev-end').val(subtitles[subtitles.length-1].start + subtitles[subtitles.length-1].dur);
        return false;        
      }
    }
  }
}

function deleteCaption() {
  videoData.captions.splice(currentSubIndex, 1);
  $.ajax({
    url: '/video/' + videoID,
    type: 'POST',
    data: JSON.stringify(videoData),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json'
  });
  subtitles = videoData.captions;
  $('.sub-edit').focusout();
  rewindVideo();
  player.playVideo();
  // console.log(videoData);
  // subtitleChangeInterval = setInterval(subtitleRefresh, 100);
}

function addCaption() {
  console.log(videoData);
  if (currentSubIndex) {
    startCaption = 
    {
      'start': player.getCurrentTime(),
      'dur': 5.0,
      'value': 'Add caption text and change beginning and ending times',
      'extra_data': []
    };
    videoData.captions.splice(currentSubIndex, 0, startCaption);
    subtitles = videoData.captions;
    editSub = subtitles[currentSubIndex];
    prevSub = subtitles[parseInt(currentSubIndex)-1];
    nextSub = subtitles[parseInt(currentSubIndex)+1];
    $('#subtitles h3').text(editSub.value);
    $('.sub-edit').val(editSub.value);
    $('.edit-start').val(editSub.start);
    $('.edit-end').val(editSub.start + editSub.dur);
    $('.sub-next').val(nextSub.value);
    $('.next-start').val(nextSub.start);
    $('.next-end').val(nextSub.start + nextSub.dur);
    $('.sub-prev').val(prevSub.value);
    $('.prev-start').val(prevSub.start);
    $('.prev-end').val(prevSub.start + prevSub.dur);
    saveCaption();
  }
  else {
    currentSubIndex = 0;
    startCaption = 
    {
      'start': player.getCurrentTime(),
      'dur': 5.0,
      'value': 'Add caption text and change beginning and ending times', 
      'extra_data': []
    };
    videoData.captions.push(startCaption);
    subtitles = videoData.captions;
    console.log(subtitles);
    editSub = subtitles[currentSubIndex];
    console.log(editSub);
    console.log(editSub.value)
    $('#subtitles h3').text(editSub.value);
    $('.sub-edit').val(editSub.value);
    $('.edit-start').val(editSub.start);
    $('.edit-end').val(editSub.start + editSub.dur);
    saveCaption();
  }
}

function saveCaption() {
  console.log(currentSubIndex);
  videoData.captions[currentSubIndex].value = $('.sub-edit').val();
  videoData.captions[currentSubIndex].start = parseFloat($('.edit-start').val());
  videoData.captions[currentSubIndex].dur = parseFloat($('.edit-end').val()) - parseFloat($('.edit-start').val());
  if (currentSubIndex > 0) {
    videoData.captions[parseInt(currentSubIndex)-1].start = parseFloat($('.prev-start').val());
    videoData.captions[parseInt(currentSubIndex)-1].dur = parseFloat($('.prev-end').val()) - parseFloat($('.prev-start').val());    
  }
  if (currentSubIndex < videoData.captions.length-1) {
    videoData.captions[parseInt(currentSubIndex)+1].start = parseFloat($('.next-start').val());
    videoData.captions[parseInt(currentSubIndex)+1].dur = parseFloat($('.next-end').val()) - parseFloat($('.next-start').val());    
  }
  subtitles = videoData.captions;
  if (!(videoData.captions[currentSubIndex].dur)) {
    console.log("No duration")
    return false;
  }
  $.ajax({
    url: '/video/' + videoID,
    type: 'POST',
    data: JSON.stringify(videoData),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json'
  });
  $('.sub-edit').focusout();
  rewindVideo();
  player.playVideo();
  // console.log(videoData);
  subtitleChangeInterval = setInterval(subtitleRefresh, 100);
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