"use strict";(self.webpackChunkinmobitas_client=self.webpackChunkinmobitas_client||[]).push([[436],{991:function(e,n,t){t(7313);var i=t(7908),r=t(6417);n.Z=function(e){var n=e.icon,t=e.onClick,o=e.color;return(0,r.jsx)(i.Z,{flex:1,display:"flex",justifyContent:"center",alignItems:"center",borderLeft:"1px solid #EDEFF5",onClick:t,height:"100%",width:"100%",children:(0,r.jsx)(n,{color:o})})}},7403:function(e,n,t){var i=t(5861),r=t(4942),o=t(1413),c=t(9439),u=t(7757),a=t.n(u),s=t(7313),l=t(7890),d=t(6352),f=t(2682),h=t(7908),p=t(6267),g=t(5611),Z=t(6020),v=t(3202),x=t(2649),w=t(9502),m=t(5818),j=t(1837),k=t(3819),b=t(5110),P=t(2497),C=t(8408),S=t(8474),y=t(9873),E=t(991),I=t(5997),T=t(9958),H=t(8710),M=t(6417);n.Z=function(e){var n=e.source,t=e.setSource,u=e.labels,L=e.detailRouteStructure,R=e.editRouteStructure,W=e.deleteBaseUrl,U=(0,l.s0)(),z=(0,s.useRef)(null),X=(0,P.Z)(z),O=(0,d.v9)(f.vn),N=(0,s.useState)(null),_=(0,c.Z)(N,2),A=_[0],B=_[1],F=(0,s.useState)(),Y=(0,c.Z)(F,2),D=Y[0],G=Y[1],$=(0,s.useRef)(null);(0,S.Z)($,(function(){return B(null)}));var q=(0,C.Z)(),J=(0,s.useMemo)((function(){return n.map((function(e){return Object.keys(e).reduce((function(n,t){return(0,o.Z)((0,o.Z)({},n),{},(0,r.Z)({},t,e[t]))}),{})}))}),[n]),K=(0,s.useMemo)((function(){return n.length?Object.keys(n[0]).filter((function(e){return!e.includes("Id")})).map((function(e,n){return{Header:u[n],accessor:e}})):[]}),[n]),Q=(0,b.useTable)({columns:K,data:J,initialState:{pageIndex:0}},b.usePagination),V=Q.getTableProps,ee=Q.headerGroups,ne=Q.prepareRow,te=Q.page,ie=Q.pageCount,re=Q.state,oe=Q.setPageSize,ce=Q.previousPage,ue=Q.nextPage,ae=Q.gotoPage,se=function(){var e=(0,i.Z)(a().mark((function e(i,r,o){var c,u;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.Z.delete("".concat(W,"/").concat(i,"/").concat(r));case 2:c=e.sent,u=n.filter((function(e){return e[o]!==c.data})),t(u),B(null);case 6:case"end":return e.stop()}}),e)})));return function(n,t,i){return e.apply(this,arguments)}}();(0,s.useEffect)((function(){if(X){var e=(0,H.b)(X,64);e>0&&oe(e)}}),[X]);return(0,M.jsxs)(h.Z,{children:[(0,M.jsxs)(p.Z,(0,o.Z)((0,o.Z)({flex:1},V()),{},{children:[(0,M.jsxs)(g.Z,{display:"flex",userSelect:"none",children:[ee.map((function(e){return e.headers.map((function(e,n){return(0,M.jsx)(Z.Z,(0,o.Z)((0,o.Z)({flex:.45},e.getHeaderProps()),{},{children:e.render("Header")}))}))})),(0,M.jsx)(Z.Z,{flex:.3})]}),(0,M.jsx)(v.Z,{ref:z,height:X,children:te.map((function(e,t){var i=Object.keys(e.original).find((function(e){return e.includes("Id")}));return ne(e),(0,M.jsxs)(x.Z,(0,o.Z)((0,o.Z)({isHighlighted:A===t,color:"#3a3e58",display:"flex",cursor:"pointer",onMouseOver:"desktop"===q?function(){return B(t)}:void 0,onMouseLeave:"desktop"===q?function(){return B(null)}:void 0,onTouchStart:"touchscreen"===q?function(){G(setTimeout((function(){return B(t)}),500))}:void 0,onTouchEnd:"touchscreen"===q?function(){clearTimeout(D)}:void 0,onTouchMove:"touchscreen"===q?function(){clearTimeout(D)}:void 0,onClick:function(){"touchscreen"===q?A?B(null):U((0,y.UM)(n[t],L)):U((0,y.UM)(te[t],L))}},e.getRowProps()),{},{children:[e.cells.map((function(n,t){return(0,M.jsx)(w.Z,{flex:.45,paddingX:t===e.cells.length-1?0:12,children:(0,M.jsx)(m.Z,{children:n.render("Cell")})},"item-prop-".concat(t))})),(0,M.jsx)(w.Z,{flex:.3,paddingX:0,children:t===A&&(0,M.jsxs)(h.Z,{ref:$,display:"flex",width:"100%",height:"100%",children:[(0,M.jsx)(E.Z,{icon:j.d,onClick:function(e){e.stopPropagation(),U((0,y.UM)(te[t],R))}}),(0,M.jsx)(E.Z,{icon:k.a,color:"danger",onClick:function(n){n.stopPropagation(),se(O,e.original[i],i)}})]})})]}))}))})]})),(0,M.jsx)(h.Z,{width:"100%",display:"flex",justifyContent:"center",children:(0,M.jsx)(T.Z,{page:re.pageIndex+1,totalPages:ie,onNextPage:ue,onPreviousPage:ce,onPageChange:function(e){return ae(e-1)}})})]})}},8710:function(e,n,t){t.d(n,{b:function(){return i}});var i=function(e,n){return Math.floor(e/n)}},2201:function(e,n,t){t(7313);var i=t(7908),r=t(6228),o=t(8225),c=t(9466),u=t(7202),a=t(6417);n.Z=function(e){var n=e.messageText,t=e.linkText,s=e.url,l=(0,u.Z)(),d=l.windowInnerWidth,f=l.windowInnerHeight;return(0,a.jsx)(i.Z,{position:"absolute",display:"flex",justifyContent:"center",top:f/2,left:0,paddingX:(0,r.Z)(4),width:d,children:(0,a.jsxs)(o.Z,{is:"h1",color:"#474d66",children:[n,t&&s&&(0,a.jsx)(c.rU,{to:s,className:"link blue",children:t})]})})}},9958:function(e,n,t){var i=t(1413),r=t(5987),o=t(7313),c=t(9525),u=t(5818),a=t(6228),s=t(2520),l=t(7908),d=t(618),f=t(8756),h=t(9964),p=t(6417),g=["isSelected","onPageChange","page"],Z=function(e){var n=e.isSelected,t=e.onPageChange,l=e.page,d=(0,r.Z)(e,g),f=(0,c.Z)().colors,h="string"===typeof l&&"..."===l,Z=(0,o.useMemo)((function(){return n?{backgroundColor:f.blue50,color:f.blue400}:{}}),[n,f]),v=(0,o.useCallback)((function(){t(l)}),[l,t]);return h?(0,p.jsx)(u.Z,{paddingX:(0,a.Z)(1),paddingY:(0,a.Z)(1),minWidth:(0,a.Z)(4),textAlign:"center","aria-label":"Pagination overflow",children:l}):(0,p.jsx)(s.ZP,(0,i.Z)((0,i.Z)({"aria-current":n,"aria-label":"Page ".concat(l),onClick:v,minWidth:(0,a.Z)(4),paddingX:(0,a.Z)(1)},Z),d))};n.Z=function(e){var n=e.onNextPage,t=e.onPageChange,i=e.onPreviousPage,r=e.page,o=void 0===r?1:r,c=e.totalPages,u=function(e,n){for(var t=[],i=e;i<=n;i++)t.push(i);return t}(1,c);return(0,p.jsx)(l.Z,{is:"nav",children:(0,p.jsxs)(l.Z,{is:"ul",height:50,display:"flex",alignItems:"center",padding:0,margin:0,children:[(0,p.jsx)(l.Z,{is:"li",listStyle:"none",padding:0,children:(0,p.jsx)(d.Z,{appearance:"minimal",icon:f.w,disabled:1===o,onClick:i})}),u.map((function(e,n){var i=e===o;return(0,p.jsx)(l.Z,{is:"li",listStyle:"none",children:(0,p.jsx)(Z,{appearance:"minimal",isSelected:i,page:e,onPageChange:t,children:e})},"".concat(o,"-").concat(n))})),(0,p.jsx)(l.Z,{is:"li",listStyle:"none",padding:0,children:(0,p.jsx)(d.Z,{appearance:"minimal",icon:h.X,disabled:c?o===c:void 0,onClick:n})})]})})}},8474:function(e,n,t){var i=t(7313);n.Z=function(e,n){(0,i.useEffect)((function(){var t=function(t){var i;console.log("clicked!"),!t.target.isConnected||null!==e&&void 0!==e&&null!==(i=e.current)&&void 0!==i&&i.contains(t.target)||n()};return document.addEventListener("click",t),function(){return document.removeEventListener("click",t)}}),[n,e])}},8408:function(e,n){n.Z=function(){return"ontouchstart"in document.documentElement?"touchscreen":"desktop"}},2497:function(e,n,t){var i=t(9439),r=t(7313);n.Z=function(e,n){var t,o=(0,r.useState)(),c=(0,i.Z)(o,2),u=c[0],a=c[1],s=function(){if(null!==e&&void 0!==e&&e.current){var t,i=0;i=window.innerHeight-(null===(t=e.current)||void 0===t?void 0:t.offsetTop)-1,null!==n&&void 0!==n&&n.extraSpace&&(i-=n.extraSpace),null!==n&&void 0!==n&&n.ignorePaginationSpace?a(i):a(i-50)}};return(0,r.useEffect)((function(){return s(),window.addEventListener("resize",s),function(){return window.removeEventListener("resize",s)}}),[]),(0,r.useEffect)((function(){s()}),[null===(t=e.current)||void 0===t?void 0:t.offsetTop]),u}},7202:function(e,n,t){var i=t(9439),r=t(7313);n.Z=function(){var e=(0,r.useState)({windowInnerWidth:window.innerWidth,windowInnerHeight:window.innerHeight}),n=(0,i.Z)(e,2),t=n[0],o=n[1];return(0,r.useEffect)((function(){return window.addEventListener("resize",(function(){o({windowInnerWidth:window.innerWidth,windowInnerHeight:window.innerHeight})})),function(){window.removeEventListener("resize",(function(){o({windowInnerWidth:window.innerWidth,windowInnerHeight:window.innerHeight})}))}}),[]),t}},5436:function(e,n,t){t.r(n);var i=t(5861),r=t(9439),o=t(7757),c=t.n(o),u=t(7908),a=t(6352),s=t(4511),l=t(7313),d=t(5997),f=t(2682),h=(t(8435),t(7403)),p=t(2201),g=t(6417);n.default=function(){var e=(0,l.useState)([]),n=(0,r.Z)(e,2),t=n[0],o=n[1],Z=(0,l.useState)(!1),v=(0,r.Z)(Z,2),x=v[0],w=v[1],m=(0,a.v9)(f.vn),j=(0,s.$)(["client","ui"]).t;return(0,l.useEffect)((function(){(0,i.Z)(c().mark((function e(){var n;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.Z.get("/clients/".concat(m));case 3:(n=e.sent).data.length?o(n.data):w(!0),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()}),[m]),(0,g.jsxs)(u.Z,{overflow:"scroll",borderColor:"black",children:[x&&(0,g.jsx)(p.Z,{messageText:j("noClients",{ns:"ui"})+", ",linkText:j("startAddingOne",{ns:"ui"}),url:"/newlisting"}),t.length?(0,g.jsx)(h.Z,{source:t,setSource:o,labels:[j("name"),j("phone")],detailRouteStructure:["clientdetail","clientId"],editRouteStructure:["editclient","clientId"],deleteBaseUrl:"/clients"}):""]})}},5997:function(e,n,t){t.d(n,{Y:function(){return u}});var i=t(1881),r=t.n(i),o=t(460),c=t(8121),u={withCredentials:!0,baseURL:"https://inmobitas-api-production.up.railway.app/"},a=r().create(u);a.interceptors.response.use((function(e){return e}),(function(e){return e.response.data.authorizationError&&o.h.dispatch((0,c.P_)()),Promise.reject(e)})),n.Z=a},8435:function(){}}]);