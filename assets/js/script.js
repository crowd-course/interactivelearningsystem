// @author  Asheesh Sharma
// @version 0.1

var player,
    time_update_interval = 0;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-placeholder', {
        width: 600,
        height: 400,
        videoId: 'LNk3gdXkxFg',
        playerVars: {
            color: 'white',
            playlist: 'LNk3gdXkxFg'
        },
        events: {
            onReady: initialize
        }
    });
}

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

// variable to check pausability
data = '[{"time" : "0", "end" : "14", "datafor" : "Intro to Python: Loops", "slidedata" :"images/1.jpg", "pause":"false"},{"time" : "14", "end" : "60", "datafor" : "What is a loop", "slidedata" :"images/2.jpg", "pause":"false"},{"time" : "60", "end" : "91", "datafor" : "While loops", "slidedata" :"images/3.jpg", "pause":"false"},{"time" : "104", "end" : "106","datafor" : "#Hello friends, This is ashukat. Today, we are going to write\\n#a simple while loop\\ncount = 0\\nwhile (count < 9):\\n\\tprint count\\n\\tcount = count + 1\\n#now execute the code", "slidedata" :"images/4.jpg", "pause":"true"},{"time" : "107", "end" : "158", "datafor" : "Infinite loops", "slidedata" :"images/4.jpg", "pause":"false"},{"time" : "158", "end" : "242", "datafor" : "Iterables", "slidedata" :"images/5.jpg", "pause":"false"},{"time" : "242", "end" : "277", "datafor" : "For loops", "slidedata" :"images/6.jpg", "pause":"false"},{"time" : "277", "end" : "321", "datafor" : "Nesting", "slidedata" :"images/7.jpg", "pause":"false"}]';

var someData_notJSON = JSON.parse(data);
// This function is called by initialize()
state='true'
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
