(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var App = createCommonjsModule(function (module, exports) {
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):e.helloRollupVue=n();}(commonjsGlobal,function(){var e={id:2},n={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"App"},[e._v(e._s(e.msg))])},staticRenderFns:[],data:function(){return console.log(e),{msg:"31ssddds"}}};return n});
});

new Vue({
    el: '#app',
    template: '<layout/>',
    components: { layout: App }
});

})));
