function onYouTubeIframeAPIReady() {

    function loadModule(module) {
        $('#video-title').html(module.name);
        loadContentBody(module.videoId, module.timerData);
    }

    $.getJSON("/assets/js/content.json", function(data) {
        console.log(data);
        var firstModule = data.modules[0];
        loadModule(firstModule);
    });
}
