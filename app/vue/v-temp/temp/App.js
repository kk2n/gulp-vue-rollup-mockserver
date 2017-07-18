(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.helloRollupVue = factory());
}(this, (function () {

var kk={
    id:2
};

var App = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"App"},[_vm._v(_vm._s(_vm.msg))])},staticRenderFns: [],
    data: function data () {
        console.log(kk);
        return {
            msg: '31ssddds'
        }
    }
};

return App;

})));
