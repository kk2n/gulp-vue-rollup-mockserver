if (window.app) {
    var _ar_temp = [], _ar_temp1 = [], _ar_temp2 = [];
    $.each(app, function (n, m) {
        if (n != "css" && n != "init" && n != "url" && n != "cdn" && n != "tag" && n != "v") {
            if (n.indexOf("tag_") < 0) {
                _ar_temp1.push(m + '.js?v=' + app.v);
                _ar_temp2.push(m);
                _ar_temp.push(n);
            }
        }
    });
    app.v?_ar_temp2 = _.object(_ar_temp, _ar_temp1):_ar_temp2 = _.object(_ar_temp, _ar_temp2);
    var _r = {
        paths: _ar_temp2,
        map: {'*': {css: '../../scripts/css.min'}},
        shim: {
            layout: app.css ? $.map(app.css, function (m) {
                return "css!" + m
            }) : ''
        }
    };
    app.cdn ? _r.baseUrl = cdn + app.url : _r.baseUrl = app.url;
    requirejs.config(_r);
    require(_ar_temp, app.init);
}