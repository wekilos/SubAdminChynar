(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[27],{189:function(e,t,c){"use strict";c.d(t,"c",(function(){return n})),c.d(t,"a",(function(){return r})),c.d(t,"b",(function(){return a}));var n=function(){localStorage.removeItem("SubProfile")},r=function(){if(localStorage.getItem("SubProfile")){if(JSON.parse(localStorage.getItem("SubProfile")).token)return!0;localStorage.removeItem("SubProfile")}return!1},a=function(){return!!localStorage.getItem("SubProfile")&&(!!JSON.parse(localStorage.getItem("SubProfile")).token||void localStorage.removeItem("SubProfile"))}},212:function(e,t,c){},222:function(e,t,c){},241:function(e,t,c){"use strict";var n=c(21),r=c(0),a=(c(222),c(153),c(406)),s=c(271),i=c(264),l=c(157),o=c(265),j=c(272),b=c(389),u=c(263),m=c(408),d=c(396),O=c(397),x=c(398),h=c(189),f=(c(62),c(7)),p=c(56),k=c(63),g=c(112),N=(c(212),c(392)),S=c(393),v=c(394),M=c(395),y=c(4),C=i.a.SubMenu,I=s.a.Sider,T=function(e){var t=Object(r.useContext)(k.a).dil,c=Object(g.a)(),a=Object(n.a)(c,2),s=(a[0],a[1],Object(r.useState)(!1)),l=Object(n.a)(s,2),o=l[0];l[1];return Object(y.jsx)("div",{children:Object(y.jsxs)(I,{style:{overflow:"auto",position:"sticky",top:0,left:0},className:"Sider",width:"100%",trigger:null,collapsible:!0,collapsed:o,children:[Object(y.jsxs)(i.a,{mode:"inline",defaultOpenKeys:["sub1"],className:"sidebar-left",children:[Object(y.jsxs)(C,{title:Object(y.jsxs)("span",{children:[Object(y.jsx)(N.a,{}),Object(y.jsx)("span",{className:"menuitem ",children:"TM"===t?"Zakazlar":"\u0417\u0430\u043a\u0430\u0437\u044b"})]}),children:[Object(y.jsx)(i.a.Item,{onClick:function(){return e.close()},className:"menuitem menuitem2",children:Object(y.jsx)(p.b,{to:"canceledOrders",children:"TM"===t?"T\xe4ze Zakazlar":"\u041d\u043e\u0432\u044b\u0435 \u0437\u0430\u043a\u0430\u0437\u044b"})},"63"),Object(y.jsx)(i.a.Item,{onClick:function(){return e.close()},className:"menuitem menuitem2",children:Object(y.jsx)(p.b,{to:"orders",children:"TM"===t?"Zakazlar":"\u0417\u0430\u043a\u0430\u0437\u044b"})},"1"),Object(y.jsx)(i.a.Item,{onClick:function(){return e.close()},className:"menuitem menuitem2",children:Object(y.jsx)(p.b,{to:"orderStatus",children:"TM"===t?"Zakazy\u0148 Statusy":"\u0421\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u043a\u0430\u0437\u0430"})},"2"),Object(y.jsx)(i.a.Item,{onClick:function(){return e.close()},className:"menuitem menuitem2",children:Object(y.jsxs)(p.b,{to:"archiveOrders",children:["TM"===t?"Gow\u015furlan Zakazlar":"\u0414\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d\u043d\u044b\u0435 \u0437\u0430\u043a\u0430\u0437\u044b","  "]})},"3")]},"sub1"),Object(y.jsxs)(C,{title:Object(y.jsxs)("span",{className:"menuitem",children:[Object(y.jsx)(S.a,{}),Object(y.jsx)("span",{children:"TM"===t?"Marketler":"M\u0430\u0440\u043a\u0435\u0442\u044b"})]}),children:[Object(y.jsx)(i.a.Item,{onClick:function(){return e.close()},className:"menuitem menuitem2",children:Object(y.jsx)(p.b,{to:"/markets",children:"TM"===t?"Marketler":"M\u0430\u0440\u043a\u0435\u0442\u044b"})},"17"),Object(y.jsx)(i.a.Item,{onClick:function(){return e.close()},className:"menuitem menuitem2",children:Object(y.jsxs)(p.b,{to:"/marketCategory",children:[" ","TM"===t?"Kategoryalar":"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0438"]})},"18"),Object(y.jsx)(i.a.Item,{onClick:function(){return e.close()},className:"menuitem menuitem2",children:Object(y.jsxs)(p.b,{to:"/marketSubCategories",children:[" ","TM"===t?"SubKategoryalar":"\u041f\u043e\u0434\u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0438"]})},"1888")]},"sub8"),Object(y.jsxs)(C,{title:Object(y.jsxs)("span",{className:"menuitem",children:[Object(y.jsx)(v.a,{}),Object(y.jsx)("span",{children:"TM"===t?"Brendler":"\u0411\u0440\u0435\u043d\u0434\u044b"})]}),children:[Object(y.jsx)(i.a.Item,{onClick:function(){return e.close()},className:"menuitem menuitem2",children:Object(y.jsx)(p.b,{to:"/brendKategory",children:"TM"===t?"Brend Kategoriya":"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f \u0431\u0440\u0435\u043d\u0434\u0430"})},"115"),Object(y.jsx)(i.a.Item,{onClick:function(){return e.close()},className:"menuitem menuitem2",children:Object(y.jsx)(p.b,{to:"brendler",children:"TM"===t?"Brendler":"\u0411\u0440\u0435\u043d\u0434\u044b"})},"165")]},"sub222"),Object(y.jsxs)(C,{title:Object(y.jsxs)("span",{className:"menuitem",children:[Object(y.jsx)(M.a,{}),Object(y.jsx)("span",{children:"TM"===t?"Harytlar":"\u0422\u043e\u0432\u0430\u0440\u044b"})]}),children:[Object(y.jsx)(i.a.Item,{onClick:function(){return e.close()},className:"menuitem menuitem2",children:Object(y.jsx)(p.b,{to:"products",children:"TM"===t?"Harytlar":"\u0422\u043e\u0432\u0430\u0440\u044b"})},"5"),Object(y.jsx)(i.a.Item,{onClick:function(){return e.close()},className:"menuitem menuitem2",children:Object(y.jsx)(p.b,{to:"hideProducts",children:"TM"===t?"Gizli Harytlar":"\u0421\u043a\u0440\u044b\u0442\u044b\u0435 \u0442\u043e\u0432\u0430\u0440\u044b"})},"65"),Object(y.jsx)(i.a.Item,{onClick:function(){return e.close()},className:"menuitem menuitem2",children:Object(y.jsx)(p.b,{to:"unit",children:"TM"===t?"Harytlary\u0148 Uniti":"\u0422\u043e\u0432\u0430\u0440\u043d\u043e\u0435 \u0423\u043d\u0438\u0442\u0438"})},"4")]},"sub2"),!1,!1,!1]}),Object(y.jsx)("div",{className:"admin-footer",children:Object(y.jsxs)("center",{style:{fontSize:12,color:"#C0C0C0",fontWeight:600},children:["Developed by:",Object(y.jsx)("br",{})," WB programmer team"]})})]})})},w=(a.a.Search,s.a.Header);i.a,i.a.Item,i.a.Item,d.a,t.a=function(){var e=Object(g.a)(),t=Object(n.a)(e,2),c=t[0],a=(t[1],Object(f.g)()),s=Object(r.useState)(!1),N=Object(n.a)(s,2),S=(N[0],N[1],Object(r.useState)(!1)),v=Object(n.a)(S,2),M=(v[0],v[1],Object(r.useState)(!1)),C=Object(n.a)(M,2),I=C[0],z=C[1],P=Object(r.useContext)(k.a),Z=P.ChangeDil,H=P.dil,K=P.newOrder,B=Object(r.useState)("TM"==H?"\ud83c\uddf9\ud83c\uddf2":"\ud83c\uddf7\ud83c\uddfa"),J=Object(n.a)(B,2),D=J[0],G=J[1];Object(r.useEffect)((function(){console.log("width",c)}),[c]);var L=Object(y.jsx)("div",{children:Object(y.jsx)(p.b,{to:"/canceledOrders",style:{cursor:"pointer"},children:"TM"===H?"T\xe4ze Zakazlar":"\u041d\u043e\u0432\u044b\u0435 \u0437\u0430\u043a\u0430\u0437\u044b"})}),U=Object(y.jsxs)(i.a,{children:[Object(y.jsx)(i.a.Item,{}),Object(y.jsx)(i.a.Item,{children:Object(y.jsxs)("a",{target:"_blank",rel:"noopener noreferrer",children:[Object(y.jsx)(d.a,{})," ","TM"===H?"Logout":"\u0412\u044b\u0439\u0442\u0438"]})})]});return Object(y.jsxs)(w,{className:"site-layout-background header",style:{position:"fixed"},children:[c>850&&Object(y.jsx)("div",{className:"App-title",children:"Cynar Market"}),c<850&&Object(y.jsx)("div",{style:{marginLeft:"10px"},children:Object(y.jsx)(l.a,{onClick:function(){return z(!0)},children:"Menu"})}),Object(y.jsx)("div",{className:"profile",children:Object(y.jsx)(o.a,{overlay:U,children:Object(y.jsx)("div",{className:"ant-dropdown-link",onClick:function(){return Object(h.c)(),void a.push("/")},children:Object(y.jsx)(O.a,{})})})}),Object(y.jsx)("div",{className:"notify",children:Object(y.jsx)(j.a,{placement:"bottom",title:"Notification",content:L,trigger:"click",children:Object(y.jsx)(b.a,{count:K,children:Object(y.jsx)(x.a,{style:{fontSize:22}})})})}),Object(y.jsx)("div",{className:"notify2",children:Object(y.jsxs)(u.a,{defaultValue:D,onChange:function(e){"\ud83c\uddf7\ud83c\uddfa"===e?(Z("RU"),G("\ud83c\uddf7\ud83c\uddfa")):(G("\ud83c\uddf9\ud83c\uddf2"),Z("TM"))},children:[Object(y.jsx)("option",{value:"\ud83c\uddf9\ud83c\uddf2",children:" \ud83c\uddf9\ud83c\uddf2 "}),Object(y.jsx)("option",{value:"\ud83c\uddf7\ud83c\uddfa",children:" \ud83c\uddf7\ud83c\uddfa "})]})}),Object(y.jsx)("div",{className:"headerDrawer",children:Object(y.jsx)(m.a,{width:320,className:"lukman-table--drawer",title:"Menu",placement:"left",onClose:function(){return z(!1)},visible:I,children:Object(y.jsx)(T,{close:function(){return z(!1)}})})})]})}},352:function(e,t){},401:function(e,t,c){"use strict";c.r(t);var n=c(163),r=c(240),a=(c(0),c(7)),s=c(189),i=c(271),l=(c(241),c(352),c(153),c(4));t.default=function(e){var t=e.component,c=e.restricted,o=Object(r.a)(e,["component","restricted"]);return Object(l.jsx)(a.b,Object(n.a)(Object(n.a)({},o),{},{render:function(e){return Object(s.a)()&&c?Object(l.jsx)(a.a,{to:"/orders"}):Object(l.jsx)(i.a,{className:"main-layout",children:Object(l.jsx)(t,Object(n.a)({},e))})}}))}}}]);
//# sourceMappingURL=27.fd103d85.chunk.js.map