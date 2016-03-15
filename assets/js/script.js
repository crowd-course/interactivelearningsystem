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
function loadJSON(callback) {

   var xobj = new XMLHttpRequest();
       xobj.overrideMimeType("application/json");
   xobj.open('GET', 'my_data.json', true); // Replace 'my_data' with the path to your file
   xobj.onreadystatechange = function () {
         if (xobj.readyState == 4 && xobj.status == "200") {
           // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
           callback(xobj.responseText);
         }
   };
   xobj.send(null);
}
function initialize(){

    // Update the controls on load
    updateTimerDisplay('true');
    updateProgressBar();
    $('.btn-help').prop('disabled', true);
    // Clear any old interval.
    clearInterval(time_update_interval);

    // Start interval to update elapsed time display and
    // the elapsed part of the progress bar every second.
    time_update_interval = setInterval(function () {
        updateTimerDisplay('true');
        updateProgressBar();
    }, 1000);


    $('#volume-input').val(Math.round(player.getVolume()));
}
function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
}
// variable to check pausability
data = '[{"time" : "0", "end" : "14", "datafor" : "Intro to Python: Loops", "slidedata" :"images/1.jpg", "pause":"false"},{"time" : "14", "end" : "60", "datafor" : "What is a loop", "slidedata" :"images/2.jpg", "pause":"false"},{"time" : "60", "end" : "91", "datafor" : "While loops", "slidedata" :"images/3.jpg", "pause":"false"},{"time" : "104", "end" : "110","datafor" : "Now copy the example code from the slide in the box below and press run", "slidedata" :"images/4.jpg", "pause":"true"},{"time" : "107", "end" : "158", "datafor" : "Infinite loops", "slidedata" :"images/4.jpg", "pause":"false"},{"time" : "158", "end" : "242", "datafor" : "Iterables", "slidedata" :"images/5.jpg", "pause":"false"},{"time" : "242", "end" : "277", "datafor" : "For loops", "slidedata" :"images/6.jpg", "pause":"false"},{"time" : "277", "end" : "321", "datafor" : "Nesting", "slidedata" :"images/7.jpg", "pause":"false"}]';

var someData_notJSON = JSON.parse(data);
// This function is called by initialize()
function updateTimerDisplay(state){
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
      if (secondsa > someData_notJSON[i].time && secondsa < someData_notJSON[i].end) {
        $('#msg').text(someData_notJSON[i].datafor);
        // set slide images
        image='<img class="img-responsive" src="'+someData_notJSON[i].slidedata+'">'
        document.getElementById("slides").innerHTML = image;
        //check if video should be paused
        if (someData_notJSON[i].pause == "true") {
            someData_notJSON[i].pause = 'false';
            state = 'false';
            $('.btn-help').prop('disabled', false);
            player.pauseVideo();
        }
      }
    }
  }
}


// This function is called by initialize()
function updateProgressBar(){
    // Update the value of our progress bar accordingly.
    $('#progress-bar').val((player.getCurrentTime() / player.getDuration()) * 100);
}


// Progress bar

$('#progress-bar').on('mouseup touchend', function (e) {

    // Calculate the new time for the video.
    // new time in seconds = total duration in seconds * ( value of range input / 100 )
    var newTime = player.getDuration() * (e.target.value / 100);

    // Skip video to new time.
    player.seekTo(newTime);

});


// Playback

$('#play').on('click', function () {
    player.playVideo();
});


$('#pause').on('click', function () {
    player.pauseVideo();
});


// Sound volume


$('#mute-toggle').on('click', function() {
    var mute_toggle = $(this);

    if(player.isMuted()){
        player.unMute();
        mute_toggle.text('volume_up');
    }
    else{
        player.mute();
        mute_toggle.text('volume_off');
    }
});

$('#volume-input').on('change', function () {
    player.setVolume($(this).val());
});


// Other options


$('#speed').on('change', function () {
    player.setPlaybackRate($(this).val());
});

$('#quality').on('change', function () {
    player.setPlaybackQuality($(this).val());
});


// Playlist

$('#next').on('click', function () {
    player.nextVideo()
});

$('#prev').on('click', function () {
    player.previousVideo()
});


// Load video

$('.thumbnail').on('click', function () {

    var url = $(this).attr('data-video-id');

    player.cueVideoById(url);

});


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
