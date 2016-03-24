// @author  Asheesh Sharma
// @version 0.1
var loadContentBody = function(videoId, timerContent){
  var player,
      time_update_interval = 0;


      player = new YT.Player('video-placeholder', {
          width: 600,
          height: 400,
          videoId: videoId,
          playerVars: {
              color: 'white',
              playlist: videoId
          },
          events: {
              onReady: initialize
          }
      });



  function initialize(){

      // Update the controls on load
      updateTimerDisplay('true');
      $('.btn-help').prop('disabled', true);
      // Clear any old interval.
      clearInterval(time_update_interval);

      // Start interval to update elapsed time display and
      // the elapsed part of the progress bar every second.
      time_update_interval = setInterval(function () {
          updateTimerDisplay();
      }, 1000);


      $('#volume-input').val(Math.round(player.getVolume()));
  }
  function sleepFor( sleepDuration ){
      var now = new Date().getTime();
      while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
  }

  var someData_notJSON = timerContent;
  // This function is called by initialize()
  state='true';
  function updateTimerDisplay(){
      // Update current time text display.
      if (state == 'true'){
        var a = formatTime(player.getCurrentTime());
        var b = formatTime(player.getDuration());
        var c = a.split(':');
        var d = b.split(':');
        var secondsa = (+c[0]) * 60 + (+c[1]);
        var secondsb = (+d[0]) * 60 + (+d[1]);
        $('#current-time').text(secondsa);
        $('#duration').text(secondsb);
        for (i = 0; i < someData_notJSON.length; i++) {
          if (secondsa > someData_notJSON[i].time && secondsa < someData_notJSON[i].end && state == 'true') {
            image='<img class="img-responsive" src="'+someData_notJSON[i].slidedata+'">'
            if (someData_notJSON[i].pause == "true") {
                console.log(state);
                editor.setValue("");
                say(someData_notJSON[i].datafor);
                state = 'false';
                player.pauseVideo();
            }
          }
        }
    }
  }
}



// Helper Functions

function formatTime(time){
    time = Math.round(time);

    var minutes = Math.floor(time / 60),
        seconds = time - minutes * 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds;
}


$('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
});


