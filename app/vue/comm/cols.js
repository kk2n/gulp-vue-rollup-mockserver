"use strict";var cols={init:function(){this.cols={props:["span","text","zhongyao"],data:function(){return{col_span:"ivu-col ivu-col-span-"+this.span}}},this.cols.template='<div><div class="comm-form-xiangmu" :class="col_span"><div class="form-left" v-if="text"><span v-if="zhongyao==undefined?0:1">*</span>{{text}}</div><div class="form-right"><slot></slot></div></div></div>',Vue.component("cols",this.cols)}};