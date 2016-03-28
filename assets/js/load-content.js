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

    function getNavigation(data, activeModule) {
        var html = '<div class="panel-group" id="accordion-cat-1">';
        var i = 1;
        for (key in data) {
            var mod = data[key];
            html += '<div class="panel panel-default panel-faq"><div class="panel-heading"><a data-toggle="collapse" data-parent="#accordion-cat-1" href="#faq-cat-1-sub-' + i + '"> \
                        <h4 class="panel-title">Chapter ' + i + '<span class="pull-right"><i class="glyphicon glyphicon-plus"></i></span><h5>' + mod.name + '</h5></h4> \
                    </a></div><div id="faq-cat-1-sub-' + i + '" class="panel-collapse collapse"><div class="panel-body"><div class="list-group">';
            for (j in mod.children) {
                var ch = mod.children[j];
                html += '<a href="#" class="list-group-item' + ((ch.module == activeModule) ? ' active' : '') + '"><h4 module="' + ch.module + '" class="list-group-item-heading">' + ch.name + '</h4>';
                if (ch.desc) {
                    html += '<p class="list-group-item-text">' + ch.desc + '</p>';
                }
                html += '</a>';
            }
            html += '</div></div></div></div>';
            i += 1;
        }
        html += '</div>';
        $('.sidebarContent').html(html);
    }

    $.getJSON("assets/js/content.json", function(data) {
        console.log(data);

        var activeModule = '1';

        if (window.location.hash) {
            var hash = window.location.hash.substring(1);
            // hash found so load that module
            var module = data.modules[hash];
            loadModule(module);
            activeModule = hash;
        } else {
            // No hash found load first module
            var firstModule = data.modules["1"];
            loadModule(firstModule);
        }

        //Get the navigation
        getNavigation(data.navigation, activeModule);


        $("#accordion-cat-1 h4.list-group-item-heading").click(function(elem) {
            var module = $(elem.target).attr('module');
            if (!(module in data.modules)) {
                alert('Module Not Implemented yet.');
                return
            }
            loadModule(data.modules[module])
            $('.list-group-item.active').removeClass('active');
            $(elem.target).parent().addClass('active');
        });

    });
}
