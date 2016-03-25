function onYouTubeIframeAPIReady() {

    function loadModule(module) {
        $('#video-title').html(module.name);
        loadContentBody(module.videoId, module.timerData);
    }

    function getNavigation(data) {
        var html = '<li><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
        for (key in data) {
            var mod = data[key];
            html += '<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + mod.name + '</a><ul class="dropdown-menu">';
            for (j in mod.children) {
                var ch = mod.children[j];
                html += '<li><a class="module" module="' + ch.module + '" href="#">' + ch.name + '</a></li>'
            }
            html += '</ul></li>'
        }
        html += '<li><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
        $('nav ul.pagination').html(html);
    }

    $.getJSON("/assets/js/content.json", function(data) {
        console.log(data);

        //Get the navigation
        getNavigation(data.navigation);

        var firstModule = data.modules["1"];
        loadModule(firstModule);

        $('nav ul.pagination li a.module').click(function(elem) {
            var module = $(elem.target).attr('module');
            if (!(module in data.modules)){
            	alert('Module Not Implemented yet.');
            	return
            }
            loadModule(data.modules[module])
        });

    });
}
