(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{382:function(t,e,n){var content=n(384);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(12).default)("6b6e5d98",content,!0,{sourceMap:!1})},383:function(t,e,n){"use strict";n(382)},384:function(t,e,n){(e=n(11)(!1)).push([t.i,".common-layout .content-wrapper[data-v-4f49b4ea]{padding-bottom:80px}.ui-post[data-v-4f49b4ea]{padding-bottom:25px;margin-bottom:25px}.ui-post[data-v-4f49b4ea]:last-child{border-bottom:0;margin-bottom:0}.ui-post-title[data-v-4f49b4ea]{font-family:PT Serif,Serif;font-size:28px;border-bottom:0}ui-post-title a[data-v-4f49b4ea]{cursor:pointer;transition:all .2s;text-decoration:none}ui-post-title a[data-v-4f49b4ea]:hover{text-decoration:underline}.ui-post-summary[data-v-4f49b4ea]{font-size:14px;color:#787878;font-weight:200;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.ui-post-meta[data-v-4f49b4ea]{display:inline-flex;align-items:center;font-size:12px;line-height:12px}.ui-post-meta[data-v-4f49b4ea]:not(:last-child){margin-bottom:3px;margin-right:20px}svg[data-v-4f49b4ea]{margin-right:5px;width:14px;height:14px}.ui-post-author[data-v-4f49b4ea]{font-weight:400}.ui-post-date[data-v-4f49b4ea],.ui-post-tag[data-v-4f49b4ea],.ui-post-tag a[data-v-4f49b4ea]{font-weight:200}.ui-post-tag a[data-v-4f49b4ea]{color:inherit;text-decoration:none;margin-right:5px}.audience[data-v-4f49b4ea]{color:grey;font-size:13px;margin-top:-3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.page_tag .post_explanations[data-v-4f49b4ea]{background-color:#e6e6e6}",""]),t.exports=e},385:function(t,e,n){"use strict";n(22);var r=n(28),o=(n(31),n(37),n(110)),c=n(76),l=o.a.extend({name:"Index",computed:{group:function(){return this.$route.params.group||"fuentes"},posts:function(){var t=this.group,e=this.$route.params.tag;if(e){var n=[];for(var g in c.a.posts){var o=c.a.posts[g].filter((function(p){return p.id&&p.tags.includes(e)}));n.push.apply(n,Object(r.a)(o))}return n}var l=c.a.posts[t];return l?l.filter((function(p){return p.id})).sort((function(a,b){var t=a.tags||[],e=b.tags||[];if(t.length!=e.length)return e.length-t.length;var n=parseInt(a.audience)||0,r=parseInt(b.audience)||0;return n!=r?r-n:(a.name||"").localeCompare(b.name||"")})):[]}}}),d=(n(383),n(75)),f=n(162),v=n.n(f),m=n(156),h=n(154),y=n(215),x=(n(10),n(8),n(2)),w=(n(32),n(217),n(55),n(5),n(4),n(9),n(218),n(1)),j=n.n(w),O=n(35),_=n(0);function S(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function k(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?S(Object(source),!0).forEach((function(e){Object(x.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):S(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var C=["sm","md","lg","xl"],P=["start","end","center"];function E(t,e){return C.reduce((function(n,r){return n[t+Object(_.w)(r)]=e(),n}),{})}var D=function(t){return[].concat(P,["baseline","stretch"]).includes(t)},I=E("align",(function(){return{type:String,default:null,validator:D}})),z=function(t){return[].concat(P,["space-between","space-around"]).includes(t)},V=E("justify",(function(){return{type:String,default:null,validator:z}})),$=function(t){return[].concat(P,["space-between","space-around","stretch"]).includes(t)},B=E("alignContent",(function(){return{type:String,default:null,validator:$}})),G={align:Object.keys(I),justify:Object.keys(V),alignContent:Object.keys(B)},J={align:"align",justify:"justify",alignContent:"align-content"};function M(t,e,n){var r=J[t];if(null!=n){if(e){var o=e.replace(t,"");r+="-".concat(o)}return(r+="-".concat(n)).toLowerCase()}}var A=new Map,L=j.a.extend({name:"v-row",functional:!0,props:k(k(k({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:D}},I),{},{justify:{type:String,default:null,validator:z}},V),{},{alignContent:{type:String,default:null,validator:$}},B),render:function(t,e){var n=e.props,data=e.data,r=e.children,o="";for(var c in n)o+=String(n[c]);var l=A.get(o);return l||function(){var t,e;for(e in l=[],G)G[e].forEach((function(t){var r=n[t],o=M(e,t,r);o&&l.push(o)}));l.push((t={"no-gutters":n.noGutters,"row--dense":n.dense},Object(x.a)(t,"align-".concat(n.align),n.align),Object(x.a)(t,"justify-".concat(n.justify),n.justify),Object(x.a)(t,"align-content-".concat(n.alignContent),n.alignContent),t)),A.set(o,l)}(),t(n.tag,Object(O.a)(data,{staticClass:"row",class:l}),r)}}),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",t._l(t.posts,(function(e){return n("article",{key:e.name,attrs:{itemscope:"",itemtype:"https://schema.org/BlogPosting"}},[n("v-row",{staticStyle:{display:"flex","flex-direction":"row",padding:"12px"}},[n("meta",{attrs:{itemprop:"mainEntityOfPage",content:"/"+t.group+"/"+e.id}}),t._v(" "),n("div",{staticStyle:{width:"100px",height:"100px","margin-right":"10px"}},[e.image?n("router-link",{attrs:{to:"/"+t.group+"/"+e.id}},[n("v-img",{staticStyle:{"max-width":"100%","max-height":"100%"},attrs:{src:e.image,width:"100px",height:"100px"}})],1):t._e()],1),t._v(" "),n("div",{staticStyle:{flex:"1",overflow:"hidden","margin-top":"2px"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:"fuentes"==t.group,expression:"'fuentes' == group"}],staticClass:"audience"},[t._v("\n          Audiencia: "+t._s(e.audience||"?")+"\n        ")]),t._v(" "),n("header",{staticClass:"ui-post-title",staticStyle:{"line-height":"1"},attrs:{itemprop:"name headline"}},[n("router-link",{attrs:{to:"/"+t.group+"/"+e.id}},[t._v(t._s(e.name))])],1),t._v(" "),n("div",{staticClass:"ui-post-summary",attrs:{itemprop:"description"}},[t._v("\n          "+t._s(e.description)+"\n        ")]),t._v(" "),n("footer",[n("div",{staticClass:"ui-post-meta ui-post-tag",attrs:{itemprop:"keywords"}},[n("v-icon",{attrs:{small:""}},[t._v("mdi-tag-outline")]),t._v(" "),t._l(e.tags,(function(e){return n("router-link",{key:e,attrs:{to:"/tag/"+e}},[t._v("\n              "+t._s(e)+"\n            ")])}))],2)])])]),t._v(" "),n("v-divider",{staticStyle:{margin:"20px 0"}})],1)})),0)}),[],!1,null,"4f49b4ea",null);e.a=component.exports;v()(component,{VDivider:m.a,VIcon:h.a,VImg:y.a,VRow:L})},468:function(t,e,n){"use strict";n.r(e);var r=n(110),o=n(385),c=r.a.extend({name:"Group",components:{Posts:o.a}}),l=n(75),component=Object(l.a)(c,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("Posts")],1)}),[],!1,null,null,null);e.default=component.exports}}]);
//# sourceMappingURL=2bba7e6.js.map