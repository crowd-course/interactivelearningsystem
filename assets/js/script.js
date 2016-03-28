// @author  Asheesh Sharma
// @version 0.1
var loadContentBody = function(videoId, timerContent) {
    var time_update_interval = 0;

    $('.video.embed-responsive.embed-responsive-16by9').html('<div id="video-placeholder" class="embed-responsive-item"></div>');
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

    editor.setValue("");



    function initialize() {

        // Update the controls on load
        updateTimerDisplay('true');
        $('.btn-help').prop('disabled', true);
        // Clear any old interval.
        clearInterval(time_update_interval);

        // Start interval to update elapsed time display and
        // the elapsed part of the progress bar every second.
        time_update_interval = setInterval(function() {
            updateTimerDisplay();
        }, 1000);


        $('#volume-input').val(Math.round(player.getVolume()));
    }

    function sleepFor(sleepDuration) {
        var now = new Date().getTime();
        while (new Date().getTime() < now + sleepDuration) { /* do nothing */ }
    }

    var someData_notJSON = timerContent;
    // This function is called by initialize()
    //state = 'true';

    function updateTimerDisplay() {
        // Update current time text display.
        //if (state == 'true') {
        var a = formatTime(player.getCurrentTime());
        var b = formatTime(player.getDuration());
        var c = a.split(':');
        var d = b.split(':');
        var secondsa = (+c[0]) * 60 + (+c[1]);
        var secondsb = (+d[0]) * 60 + (+d[1]);
        $('#current-time').text(secondsa);
        $('#duration').text(secondsb);
        for (i = 0; i < someData_notJSON.length; i++) {
            if (secondsa > someData_notJSON[i].time && secondsa < someData_notJSON[i].end /* && state == 'true'*/ ) {
                image = '<img class="img-responsive" src="' + someData_notJSON[i].slidedata + '">'
                if (someData_notJSON[i].pause == "true") {
                    //console.log(state);
                    console.log(someData_notJSON[i].datafor);
                    if (someData_notJSON[i].quiz) {
                        loadQuiz(someData_notJSON[i].quiz);
                    }
                    //state = 'false';
                    setTimeout(function() {
                        player.pauseVideo();
                    }, 1000);
                }
                if (someData_notJSON[i].datafor) {
                    editor.setValue("");
                    say(someData_notJSON[i].datafor);
                    $('.fa-play').popover({placement: 'top'});
                    $('.fa-play').popover('show');
                }
            }
        }
        //}
    }
}


function loadQuiz(quizData) {

    function getOptions() {
        var optHtml = '<ul>';
        for (key in quizData.options) {
            var option = quizData.options[key]
            var correct = 'false'
            if (quizData.correct == key)
                correct = 'true'
            optHtml += '<li><label><input type="radio" correct="' + correct + '" name="quizradio">&nbsp;&nbsp;' + option + '</label></li>'
        }
        optHtml += '</ul>'
        return optHtml
    }
    $('.modal.quiz').remove();
    var html = ''; // local var
    html += '<div class="modal quiz fade" tabindex="-1" role="dialog">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
        '<h4 class="modal-title">Quiz</h4>' +
        '</div>' +
        '<div class="modal-body">' +
        '<p>' + quizData.question + '</p>' +
        getOptions() +
        '</div>' +
        '<div id="alerts"></div><div class="modal-footer">' +
        '<button type="button" class="btn btn-default" data-dismiss="modal">Skip</button>' +
        '<button type="button" class="quiz-submit btn btn-primary">Submit</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    $('body').append(html);
    $('.modal').modal();

    $('.quiz-submit').click(function(el) {
        $(".alert").fadeOut(400);
        var target = $(el.target);
        var correct = $('input[name=quizradio]:checked').attr('correct');
        if (correct == 'true') {
            document.getElementById("alerts").innerHTML = '<div class="alert alert-success" role="alert">Awesome! You are right.</div>';
            setTimeout(function() {
                $('.modal').modal('hide');
                player.playVideo();
            }, 1000)
        } else {
            document.getElementById("alerts").innerHTML = '<div class="alert alert-danger" role="alert">Oops! Try again.</div>';
        }
    });
}


// Helper Functions

function formatTime(time) {
    time = Math.round(time);

    var minutes = Math.floor(time / 60),
        seconds = time - minutes * 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds;
}


$('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
});
