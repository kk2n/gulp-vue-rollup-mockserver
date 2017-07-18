/**
 * Created by likuan on 9/12 0012.
 */
// tag原型
var tag = function (nameval) {
    var val = nameval.data || '';
    var pt = nameval.pt || '';
    var el = nameval.el || '';
    var fn = nameval.fn || function () {
        };
    var beforefn = nameval.beforefn || function () {
        };
    var endfn = nameval.endfn || function () {
        };
    var _t = this;
    _t.opts = riot.observable({
        data: val,
        beforefn: beforefn,
        fn: fn,
        endfn: endfn,
        up: function (dfn) {
            _t.opts.trigger("up", dfn)
        },
        mount: function (dfn) {
            _t.opts.trigger("mount", dfn)
        },
        unmount: function (dfn) {
            _t.opts.trigger("unmount", dfn)
        }
    });
    _t.init = function (arg) {
        if (arg) {
            return riot.mount(arg, _t.opts)[0]
        } else {
            if (pt) {
                var html = $(el).clone(true);
                $(el).after(html).remove();
                return riot.mount(el, _t.opts)[0]
            } else {
                return riot.mount(el, _t.opts)[0]
            }
        }
    };
};
var TAG = function (nameval) {
    var data = nameval.data || '';
    var pt = nameval.pt || '';
    var el = nameval.el || '';
    var _t = this;
    _t.opts = riot.observable({
        data: data
    });
    _t.init = function (arg) {
        if (arg) {
            return riot.mount(arg, _t.opts)
        } else {
            if (pt) {
                var html = $(el).clone(true);
                $(el).after(html).remove();
                return riot.mount(el, _t.opts)[0]
            } else {
                return riot.mount(el, _t.opts)[0]
            }
        }
    };
};
//页面初始配置
var configs = function () {
    // this.larer='../../scripts/layer/layer';
};
//定义全局CDN地址
var cdn = 'http://s.yishengya.cn';

// load显示与隐藏
var layer_index;
function load(_is, arg) {
    if (_is == undefined || _is == "show" || _is == "start" || _is == "go" || _is == 1 || _is == true) {
        $('html').spin(arg);
        layer_index = layer.load(3);
    } else {
        $('html').spin(false);
        layer.close(layer_index)
    }
}


// JS扩展方法
var FRL = {};
FRL.strings = {};
FRL.strings.whiteSpaceChars = [
    "\u0009" /*Horizontal tab*/,
    "\u000A" /*Line feed or New line*/,
    "\u000B" /*Vertical tab*/,
    "\u000C" /*Formfeed*/,
    "\u000D" /*Carriage return*/,
    "\u0020" /*Space*/,
    "\u00A0" /*Non-breaking space*/,
    "\u1680" /*Ogham space mark*/,
    "\u180E" /*Mongolian vowel separator*/,
    "\u2000" /*En quad*/,
    "\u2001" /*Em quad*/,
    "\u2002" /*En space*/,
    "\u2003" /*Em space*/,
    "\u2004" /*Three-per-em space*/,
    "\u2005" /*Four-per-em space*/,
    "\u2006" /*Six-per-em space*/,
    "\u2007" /*Figure space*/,
    "\u2008" /*Punctuation space*/,
    "\u2009" /*Thin space*/,
    "\u200A" /*Hair space*/,
    "\u200B" /*Zero width space*/,
    "\u2028" /*Line separator*/,
    "\u2029" /*Paragraph separator*/,
    "\u202F" /*Narrow no-break space*/,
    "\u205F" /*Medium mathematical space*/,
    "\u3000" /*Ideographic space*/
];
/**
 * 移除字符串中结尾所有的指定字符或字符串
 * <p><b>例题 :</b></p>
 * <pre class="prettyprint">
 * var str ='---hello world---';
 * str = str.trimEnd('-');//---hello world
 * </pre>
 * @param 需要移除的字符或字符串，其类型可以说字符、字符串、数组。如果参数为null则会使用<code class="prettyprint">whiteSpaceChars</code>数组中的值.
 * @return 移除后的字符串.
 */
String.prototype.trimEnd = function (chars) {
    if (chars == null) {
        chars = FRL.strings.whiteSpaceChars;
    }
    if (this == null || this == "") {
        return "";
    }
    var i;
    var l = this.length;
    for (i = this.length - 1; (i >= 0) && (chars.indexOf(this.charAt(i)) > -1); i--) {
    }
    return this.substring(0, i + 1);
};
/**
 * 移除字符串中开始所有的指定字符或字符串
 * <p><b>例题 :</b></p>
 * <pre class="prettyprint">
 * var str ='---hello world---';
 * str = str.trimStart('-');//hello world---
 * </pre>
 * @param 需要移除的字符或字符串，其类型可以说字符、字符串、数组。如果参数为null则会使用 <code class="prettyprint">whiteSpaceChars</code>数组中的值.
 * @return 移除后的字符串.
 */
String.prototype.trimStart = function (chars) {
    if (chars == null) {
        chars = FRL.strings.whiteSpaceChars;
    }
    if (this == null || this == "") {
        return "";
    }
    var i /*int*/;
    var l /*int*/ = this.length;
    for (i = 0; (i < l) && (chars.indexOf(this.charAt(i)) > -1); i++) {
    }
    return this.substring(i);
};
/**
 * 移除字符串中开始和结尾所有的指定字符或字符串
 * <p><b>例题 :</b></p>
 * <pre class="prettyprint">
 * var str ='---hello world---';
 * str = str.trim('-');//hello world
 * </pre>
 * @param 需要移除的字符或字符串，其类型可以说字符、字符串、数组。如果参数为null则会使用 <code class="prettyprint">whiteSpaceChars</code>数组中的值.
 * @return 移除后的字符串.
 */
String.prototype.trim = function (chars) {
    if (chars == null) {
        chars = FRL.strings.whiteSpaceChars;
    }
    var source = this;
    if (source == null || source == "") {
        return "";
    }
    var i;
    var l;
    l = source.length;
    for (i = 0; (i < l) && (chars.indexOf(source.charAt(i)) > -1); i++) {
    }
    source = source.substring(i);
    l = source.length;
    for (i = source.length - 1; (i >= 0) && (chars.indexOf(source.charAt(i)) > -1); i--) {
    }
    source = source.substring(0, i + 1);
    return source;
};

//调试简写
function log(x) {
    console.log(x)
}

//公共事件
var __ = {
    t: function (x) {
        x = new TAG({el: x});
        return x
    },
    radio: function (tag) {
        $(tag).iCheck({radioClass: 'iradio_minimal-blue'});
    },
    check: function (tag) {
        $(tag).iCheck({checkboxClass: 'icheckbox_minimal-blue'});
    },
    ck: function (tag, callback) {
        $(tag).on('ifChecked', callback)
    },
    ck_ev: function (tag) {
        $(tag).iCheck('check');
    },
    unck: function (tag, callback) {
        $(tag).on('ifUnchecked', callback)
    },
    unck_ev: function (tag) {
        $(tag).iCheck('uncheck');
    },
    tab: function (tag, classname) {
        $(tag).addClass(classname).siblings().removeClass(classname);
    },
    component: function (arg) {
        Vue.component(arg.name, {
            template:arg.template,
            data: function () {
                return arg.data
            },
            methods: arg.methods
        })
    }
};