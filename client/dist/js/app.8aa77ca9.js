(function(t){function e(e){for(var n,i,s=e[0],c=e[1],l=e[2],h=0,p=[];h<s.length;h++)i=s[h],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&p.push(o[i][0]),o[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);u&&u(e);while(p.length)p.shift()();return r.push.apply(r,l||[]),a()}function a(){for(var t,e=0;e<r.length;e++){for(var a=r[e],n=!0,s=1;s<a.length;s++){var c=a[s];0!==o[c]&&(n=!1)}n&&(r.splice(e--,1),t=i(i.s=a[0]))}return t}var n={},o={app:0},r=[];function i(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=n,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(a,n,function(e){return t[e]}.bind(null,n));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var u=c;r.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},1:function(t,e){},2:function(t,e){},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),o=a("f309");n["a"].use(o["a"]);var r=new o["a"]({}),i=a("8c4f"),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[a("v-spacer"),a("v-btn",{attrs:{href:"https://github.com/vuetifyjs/vuetify/releases/latest",target:"_blank",text:""}},[a("span",{staticClass:"mr-2"},[t._v("Farsi Educator")]),a("v-icon",[t._v("mdi-open-in-new")])],1)],1),a("v-main",[a("router-view")],1)],1)},c=[],l={name:"App",components:{},data:function(){return{}}},u=l,h=a("2877"),p=a("6544"),d=a.n(p),g=a("7496"),f=a("40dc"),v=a("8336"),b=a("132d"),m=a("f6c4"),_=a("2fa4"),w=Object(h["a"])(u,s,c,!1,null,null,null),R=w.exports;d()(w,{VApp:g["a"],VAppBar:f["a"],VBtn:v["a"],VIcon:b["a"],VMain:m["a"],VSpacer:_["a"]});var y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-row",{staticClass:"text-center"},[a("v-col",{attrs:{cols:"3"}}),a("v-col",{staticClass:"mb-4",attrs:{cols:"9"}},[a("canvas",{staticStyle:{border:"1px solid black",float:"right"},attrs:{id:"myCanvas",resize:""}}),a("div",{attrs:{id:"allImages"}},t._l(t.alphaGroups,(function(e,n){return a("div",{key:n},[t._l(e,(function(t){return a("img",{key:t,staticStyle:{display:"none"},attrs:{id:t,src:"/images2/"+t+".png"}})})),a("img",{staticStyle:{display:"none"},attrs:{id:"ear",src:"/images2/ear.jpg"}})],2)})),0),a("div",{attrs:{id:"allAudios"}},[a("audio",{attrs:{src:t.audioKalameh,id:t.audioKalamehId}}),t._l(t.alphaGroups,(function(e,n){return a("audio",{key:n,attrs:{src:t.audioAlph(e),id:t.audioAlphId(e)}})}))],2)])],1)],1)},k=[],O=(a("4de4"),a("7db0"),a("caad"),a("c975"),a("d81d"),a("13d5"),a("d3b7"),a("ac1f"),a("2532"),a("466d"),a("1276"),a("ddb0"),a("3835")),j=a("b85c"),S=(a("96cf"),a("1da1")),T=(a("99af"),a("ade3")),I=a("d4ec"),C=a("bee2"),P=a("2222"),x=function(){function t(e,a){Object(I["a"])(this,t),this.phiRect=new P.Path.Rectangle(e,a),this.origBound=this.phiRect.bounds,this.aTile=null,this.phiRect.strokeColor="black",this.phiRect.fillColor="white"}return Object(C["a"])(t,[{key:"getPhiRect",value:function(){return this.phiRect}}]),t}(),A=function(){function t(e,a){Object(I["a"])(this,t),window.ptr=e;var n=e.x-t.minLeftMargin;n-=(a-1)*t.phiGutter,n/=t.phiSide,n=Math.floor(n);var o=Math.ceil(a/n);console.log("".concat(o," rows with ").concat(n," tiles in each row"));var r=e,i=r.subtract(n*t.phiSide+(n-1)*t.phiGutter,-o*t.phpRow);this.phpRect=P.Path.Rectangle(r,i),this.phiRowTR=r.subtract(t.phiSpacing,-t.phiSpacing),this.phpRect.fillColor="#d3d3d3"}return Object(C["a"])(t,[{key:"getPhiTopRight",value:function(e){return this.phiRowTR.subtract((e-1)*(t.phiSide+t.phiGutter),0)}},{key:"getPhiBottomLeft",value:function(e){return this.phiRowTR.subtract(e*(t.phiSide+t.phiGutter)-t.phiGutter,-t.phiSide)}}]),t}();Object(T["a"])(A,"minLeftMargin",30),Object(T["a"])(A,"phiSide",80),Object(T["a"])(A,"phiSpacing",10),Object(T["a"])(A,"phpRow",A.phiSide+2*A.phiSpacing),Object(T["a"])(A,"phiGutter",4);var G=function(){function t(e,a){Object(I["a"])(this,t);var n=e.add(0,t.topMargin),o=n.subtract(a*t.atiSide+(a-1)*t.atiGutter+2*t.atpSpacing,-t.atpRow);this.atpRect=P.Path.Rectangle(n,o),window.atpRect=this.atpRect,this.atpRect.strokeColor="red",this.atpRect.fillColor="#ea3c53",this.atiRowTR=n.subtract(t.atpSpacing,-t.atpSpacing)}return Object(C["a"])(t,[{key:"getAtiTopRight",value:function(e){return this.atiRowTR.subtract((e-1)*(t.atiSide+t.atiGutter),0)}},{key:"getAtiBottomLeft",value:function(e){return this.atiRowTR.subtract(e*(t.atiSide+t.atiGutter)-t.atiGutter,-t.atiSide)}}]),t}();Object(T["a"])(G,"rightMargin",50),Object(T["a"])(G,"atiSide",80),Object(T["a"])(G,"atpSpacing",10),Object(T["a"])(G,"atpRow",G.atiSide+2*G.atpSpacing),Object(T["a"])(G,"atiGutter",10);var M=function t(e,a,n,o){var r=this;Object(I["a"])(this,t),this.atiRect=new P.Path.Rectangle(e,a),this.atiRect.strokeColor="red",this.atiRect.fillColor="white";var i=document.getElementById(o),s=new P.Raster(i);s.position=this.atiRect.position,s.scale(1,(G.atiSide-t.rasterMargin)/s.size.height);var c=new P.Group([this.atiRect,s]);c.onMouseDrag=function(t){c.position=c.position.add(t.delta),window.gr=r},c.onMouseUp=function(){r.resolve=!0},this.group=c,this.origin=c.position,this.resolve=!1,this.resolved=!1,this.resolving=!1,this.resolvingTarg=null,this.resolvingPhi=null,this.ph=n,this.group=c};Object(T["a"])(M,"rasterMargin",5);var z=a("5fb0"),E=a("2222"),V={name:"Main",data:function(){return{darsId:1,canvas:null}},watch:{},mounted:function(){var t=this;return Object(S["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log("Hello"),t.canvas=document.getElementById("myCanvas"),t.canvas.width=z.canvasWidth,t.canvas.height=z.canvasHeight,E.setup(t.canvas),t.darsId=t.$route.params.darsId,console.log(t.$route.params),console.log(t.darsId),setTimeout((function(){console.log("WAAIIIITT"),t.initCanvas()}),500);case 9:case"end":return e.stop()}}),e)})))()},computed:{audioKalameh:function(){return"/audios/"+z.darses[this.darsId][1]+".m4a"},audioKalamehId:function(){return z.darses[this.darsId][1]},kalameh:function(){return z.darses[this.darsId][0].split(" ")},alphaGroups:function(){var t={},e=this.kalameh.filter((function(t,e,a){return a.indexOf(t)===e})),a=e.reduce((function(e,a){if(t[a])return e;var n=z.alphaGroups.find((function(t){return t.includes(a)}));e.push(n);var o,r=Object(j["a"])(n);try{for(r.s();!(o=r.n()).done;){var i=o.value;t[i]=1}}catch(s){r.e(s)}finally{r.f()}return e}),[]);return a}},methods:{audioAlph:function(t){return"/audios/"+t[0].match(/([a-z]*)_/)[1]+".m4a"},audioAlphId:function(t){return t[0].match(/([a-z]*)_/)[1]},initCanvas:function(){var t=this;return Object(S["a"])(regeneratorRuntime.mark((function e(){var a,n,o,r,i,s,c,l,u,h,p,d,g,f,v,b,m,_,w,R,y,k;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log("HEREs"),a=50,n=50,o=new E.Point(z.canvasWidth-a,n),r=new A(o,t.kalameh.length+2),i=o.add(A.phiSpacing+A.phiSide/4,A.phiSpacing+A.phiSide/2),s=function(t,e){var a=document.getElementById("ear"),n=new E.Raster(a);n.position=t,n.strokeColor="yellow",n.onMouseDown=function(){document.getElementById(e).play()},console.log("created ear for : "+e)},s(i,z.darses[t.darsId][1]),c=[],l=[],u=0,h=Object(j["a"])(t.kalameh.keys());try{for(h.s();!(p=h.n()).done;)u=p.value,c.push(new x(r.getPhiTopRight(u+1),r.getPhiBottomLeft(u+1))),u++}catch(S){h.e(S)}finally{h.f()}window.phInsts=c,u=0,d=Object(j["a"])(t.alphaGroups);try{for(d.s();!(g=d.n()).done;){f=g.value,v=r.phpRect.bounds.bottomRight.add(0,20),v=v.add(0,u*(G.atpRow+10)),b=new G(v,f.length),m=1,_=Object(j["a"])(f);try{for(R=function(){var e=w.value,a=e.match(/([a-z]*)_/)[1];s(v.add(G.atpSpacing+G.atiSide/4,G.atpSpacing+G.atiSide/2),a);var n=t.kalameh.reduce((function(t,a,n){return a===e&&t.push(n),t}),[]),o=n.map((function(t){return c[t]})),r=void 0;r=new M(b.getAtiTopRight(m),b.getAtiBottomLeft(m),o,e),l.push(r),r=new M(b.getAtiTopRight(m),b.getAtiBottomLeft(m),o,e),l.push(r),m++},_.s();!(w=_.n()).done;)R()}catch(S){_.e(S)}finally{_.f()}u++}}catch(S){d.e(S)}finally{d.f()}y=function(){var t,e=r.phiRowTR,a=Object(j["a"])(c.entries());try{for(a.s();!(t=a.n()).done;){var n=Object(O["a"])(t.value,2),o=n[0],i=n[1];if(console.log("--------"+o),null===i.aTile){var s=new E.Rectangle(e,e.subtract(A.phiSide,-A.phiSide));console.log(i.phiRect.bounds),console.log(s),i.phiRect.bounds=s,e=e.subtract(A.phiSide,0)}else{var l=i.aTile.group;console.log("HERE"),console.log(l.bounds),console.log(l.firstChild.bounds),console.log(l.lastChild.bounds);var u=new E.Rectangle(e,e.subtract(l.lastChild.bounds.width,-l.lastChild.bounds.height));console.log(u),l.bounds=u,e=e.subtract(l.bounds.width,0)}}}catch(S){a.e(S)}finally{a.f()}},E.view.onFrame=function(){var e=l.find((function(t){return t.resolve||t.resolvingTarg}));if(e){if(console.log("Found tile: "+e),e.resolve){e.resolve=!1;var a,n=Object(j["a"])(e.ph);try{for(n.s();!(a=n.n()).done;){var o=a.value;if(!o.aTile&&o.phiRect.contains(e.group.position)){e.resolvingTarg=o.phiRect.position,e.resolvingPhi=o,console.log("then here ");break}}}catch(S){n.e(S)}finally{n.f()}e.resolvingTarg=e.resolvingTarg||e.origin}var r=e.resolvingTarg.subtract(e.group.position),i=r;if(console.log("vector length: "+r.length),r.length>20?(i=i.divide(10),i=i.floor()):i=r,e.group.position=e.group.position.add(i),e.group.position.equals(e.resolvingTarg)&&(e.resolvingTarg=null),e.resolvingPhi&&e.group.position.equals(e.resolvingPhi.phiRect.position)){e.resolved=!0,e.group.firstChild.visible=!1,e.resolvingPhi.aTile=e,e.resolvingPhi.phiRect.visible=!1,console.log("resolved"),console.log(e),y();var s=k();s&&(console.log("DDDDDDDOOONNE"),t.darsId++,setTimeout((function(){console.log("WAAIIIITT"),t.initCanvas()}),500))}else e.group.position.equals(e.origin)&&(e.group.firstChild.visible=!0,e.resolved=!1,e.resolvingPhi&&(e.resolvingPhi.aTile=null,e.resolvingPhi.phiRect.visible=!0),console.log(" non resolved"),console.log(e.ph.phiRect),e.resolvingPhi=null,y())}},k=function(){var t,e=Object(j["a"])(c);try{for(e.s();!(t=e.n()).done;){var a=t.value;if(!a.aTile)return!1}}catch(S){e.e(S)}finally{e.f()}return!0};case 20:case"end":return e.stop()}}),e)})))()}}},B=V,D=a("62ad"),K=a("a523"),L=a("0fd9"),J=Object(h["a"])(B,y,k,!1,null,null,null),$=J.exports;d()(J,{VCol:D["a"],VContainer:K["a"],VRow:L["a"]});var H=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-row",{staticClass:"text-center"},[a("v-col",{attrs:{cols:"6"}},[a("router-link",{attrs:{to:"/dars/"+t.students["Yara"]}},[a("v-img",{attrs:{src:"images2/Yara.jpg"}})],1)],1),a("v-col",{attrs:{cols:"6"}},[a("router-link",{attrs:{to:"/dars/3"}},[a("v-img",{attrs:{src:"images2/Delsa.jpg"}})],1)],1)],1)],1)},W=[],q=a("bc3a"),F=a.n(q),Y={name:"User",data:function(){return{students:{Yara:4,Delsa:3}}},watch:{},mounted:function(){var t=this;return Object(S["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log("KJKJKJKJ"),e.next=3,F.a.get("http://localhost:3085/users");case 3:a=e.sent,console.log(a),t.students=a["data"],console.log(a["data"]);case 7:case"end":return e.stop()}}),e)})))()},computed:{},methods:{}},N=Y,U=a("adda"),Q=Object(h["a"])(N,H,W,!1,null,null,null),X=Q.exports;d()(Q,{VCol:D["a"],VContainer:K["a"],VImg:U["a"],VRow:L["a"]});var Z=[{path:"/",component:X,name:"user"},{path:"/dars/:darsId",component:$,name:"main"}],tt=Z;n["a"].config.productionTip=!1,n["a"].use(i["a"]);var et=new i["a"]({routes:tt,mode:"history"});new n["a"]({vuetify:r,router:et,render:function(t){return t(R)}}).$mount("#app")},"5fb0":function(t,e,a){"use strict";a.r(e),a.d(e,"canvasWidth",(function(){return n})),a.d(e,"canvasHeight",(function(){return o})),a.d(e,"alphaGroups",(function(){return r})),a.d(e,"darses",(function(){return i}));var n=800,o=800,r=[["aa_chasban_rast","aa_bakola","aa_bikola"],["be_koochik_chap","be_koochik_dovar","be_bozorg_rast","be_bozorg_tanha"],["de_tanha","de_chasban_rast"],["me_koochik_chap","me_koochik_dovar","me_bozorg_rast","me_bozorg_tanha"],["re_chasban_rast","re_tanha"],["ye_koochik_chap","ye_koochik_dovar","ye_bozorg_tanha","ye_bozorg_rast"],["faseleh"]],i=[["be_koochik_chap aa_chasban_rast be_koochik_chap aa_chasban_rast","baba"],["aa_bakola be_bozorg_tanha","ab"],["be_koochik_chap aa_chasban_rast de_tanha","bad"],["me_koochik_chap aa_chasban_rast de_tanha re_tanha","madar"],["be_koochik_chap aa_chasban_rast de_tanha aa_bikola me_bozorg_tanha","badam"],["ye_koochik_chap aa_chasban_rast re_tanha aa_bikola","yara"]]}});
//# sourceMappingURL=app.8aa77ca9.js.map