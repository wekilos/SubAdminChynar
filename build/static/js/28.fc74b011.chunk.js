(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[28],{364:function(e,t,n){},365:function(e,t,n){},366:function(e,t,n){},421:function(e,t,n){"use strict";n.r(t);var a=n(21),c=n(0),s=n(408),i=(n(153),n(202)),o=n(263),r=n(157),l=n(426),u=(n(364),n(4)),d=(i.a.RangePicker,o.a.Option,function(e){var t,n=e.GoshButton;return t=e.sany<=2,Object(u.jsx)("div",{className:"lukman-gozleg",children:Object(u.jsxs)("form",{className:"lukman-gozleg--form",children:[Object(u.jsx)("div",{children:Object(u.jsx)("h2",{style:{margin:"10px 10px"},children:"Admin Post page"})}),Object(u.jsx)("div",{children:t&&Object(u.jsx)(r.a,{onClick:function(){return n()},shape:"round",type:"primary",icon:Object(u.jsx)(l.a,{}),className:"lukman-gozleg--button",children:"Status go\u015f"})})]})})}),j=(n(171),n(53)),b=n.n(j),m=n(64),O=n(172),h=n(169),f=n(111),x=n(404),g=n(170),p=(n(365),n(62)),k=function(e){var t=Object(a.a)(e.data,2),n=t[0],i=(t[1],e.getStatuses),o=[{title:"Post No",dataIndex:"id"},{title:"Post Ady",dataIndex:"slug_tm"},{title:"Post Text ",dataIndex:"description_tm"},{title:"Ulanyjy ",render:function(e,t){return Object(u.jsxs)("div",{children:[Object(u.jsxs)("h3",{children:[t.User&&t.User.fname," ",t.User&&t.User.lastname]}),Object(u.jsx)("p",{children:t.User&&t.User.phoneNumber})]})}},{title:"\xd6\xe7\xfcrmek",dataIndex:"goshmacha",render:function(e,t){return Object(u.jsx)(O.b,{size:"middle",children:Object(u.jsx)(h.a,{title:"Siz \xe7yndan \xf6\xe7\xfcrmek isle\xfd\xe4rsinizmi?",onConfirm:function(){return z(t)},okText:"Howwa",cancelText:"\xddok",children:Object(u.jsx)(r.a,{type:"primary",shape:"round",danger:!0,children:Object(u.jsx)(g.a,{})})})})}}],l=Object(c.useState)(!1),d=Object(a.a)(l,2),j=d[0],k=d[1],v=Object(c.useState)([]),S=Object(a.a)(v,2),y=(S[0],S[1]),N=Object(c.useState)(!1),w=Object(a.a)(N,2),z=(w[0],w[1],function(e){console.log(e),p.b.delete("/api/post/delete/"+e.id).then((function(e){console.log(e.data),f.b.success(e.data.msg),i()})).catch((function(e){console.log(e)}))}),U=function(){var e=Object(m.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return k(!j),console.log("maglumat edit",t),e.next=4,y(t);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(u.jsxs)("div",{className:"LukmanTable",children:[Object(u.jsx)(s.a,{width:500,className:"lukman-table--drawer",title:"\xdc\xfdtgetmeler",placement:"right",onClose:function(){return U()},visible:j}),Object(u.jsx)(x.a,{columns:o,dataSource:n})]})};n(366),t.default=function(){var e=Object(c.useState)([]),t=Object(a.a)(e,2),n=t[0],i=t[1],o=Object(c.useState)(0),r=Object(a.a)(o,2);r[0],r[1];Object(c.useEffect)((function(){l()}),[]);var l=function(){p.b.get("/api/posts").then((function(e){console.log(e.data),i(e.data)})).catch((function(e){console.log(e)}))},j=Object(c.useState)(!1),b=Object(a.a)(j,2),m=b[0],O=b[1],h=Object(c.useState)(!1),f=Object(a.a)(h,2),x=f[0],g=f[1];return Object(u.jsxs)("div",{className:"lukman",children:[Object(u.jsx)(s.a,{width:500,className:"lukman-gosh--drawer",title:"Status Go\u015f",placement:"right",onClose:function(){return g(!1),void O(!1)},visible:x}),Object(u.jsx)("div",{className:"lukman--gozleg",children:Object(u.jsx)(d,{GoshButton:function(){g(!0),O(!0),console.log(m)}})}),Object(u.jsx)("div",{className:"lukman-Table",children:Object(u.jsx)(k,{data:[n,i],getStatuses:l})})]})}}}]);
//# sourceMappingURL=28.fc74b011.chunk.js.map