function onYouTubeIframeAPIReady() {

    function loadModule(module) {
        $('#video-title').html(module.name);
        loadContentBody(module.videoId, module.timerData);
    }

    // function getNavigation(data) {
    //     var html = '<li><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
    //     for (key in data) {
    //         var mod = data[key];
    //         html += '<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + mod.name + '</a><ul class="dropdown-menu">';
    //         for (j in mod.children) {
    //             var ch = mod.children[j];
    //             html += '<li><a class="module" module="' + ch.module + '" href="#">' + ch.name + '</a></li>'
    //         }
    //         html += '</ul></li>'
    //     }
    //     html += '<li><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
    //     $('nav ul.pagination').html(html);
    // }

    function getNavigation(data) {
        var html = '<div class="panel-group" id="accordion-cat-1">';
        var i = 1;
        for (key in data) {
            var mod = data[key];
            html += '<div class="panel panel-default panel-faq"><div class="panel-heading"><a data-toggle="collapse" data-parent="#accordion-cat-1" href="#faq-cat-1-sub-' + i + '"> \
                        <h4 class="panel-title">Chapter ' + i + '<span class="pull-right"><i class="glyphicon glyphicon-plus"></i></span><h5>' + mod.name + '</h5></h4> \
                    </a></div><div id="faq-cat-1-sub-' + i + '" class="panel-collapse collapse"><div class="panel-body"><div class="list-group">';
            for (j in mod.children) {
                var ch = mod.children[j];
                //console.log(ch.module == "1");
                html += '<a href="#" class="list-group-item' + ((i == 1 && ch.module == "1") ? ' active' : '') + '"><h4 class="list-group-item-heading">' + ch.name + '</h4>';
                if (ch.desc !== undefined) {
                    html += '<p class="list-group-item-text">' + ch.desc  + '</p>';
                }
                html += '</a>';
            }
            html += '</div></div></div></div>';
            i += 1;
        }
        html += '</div>';
        $('.sidebarContent').html(html);
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
