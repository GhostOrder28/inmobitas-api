"use strict";(self.webpackChunkinmobitas_client=self.webpackChunkinmobitas_client||[]).push([[155],{1155:function(e,n,t){t.r(n);var a=t(5861),c=t(9439),r=t(7757),s=t.n(r),i=t(7313),o=t(6352),u=t(7890),l=t(7414),f=t(5997),p=t(2682),h=t(6417),d=(0,i.lazy)((function(){return Promise.all([t.e(29),t.e(225),t.e(68),t.e(587),t.e(550)]).then(t.bind(t,550))})),b=(0,i.lazy)((function(){return Promise.all([t.e(29),t.e(723),t.e(683)]).then(t.bind(t,6683))}));n.default=function(){var e=(0,i.useState)(),n=(0,c.Z)(e,2),t=n[0],r=n[1],m=(0,u.UO)().clientid,x=(0,u.TH)(),v=(0,o.v9)(p.vn);switch(console.log(x.pathname),(0,i.useEffect)((function(){(0,a.Z)(s().mark((function e(){var n;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.Z.get("/clients/".concat(v,"/").concat(m));case 3:n=e.sent,r(n.data),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()}),[]),(0,i.useEffect)((function(){return console.log(t)})),x.pathname){case"/editclient/".concat(m):return(0,h.jsx)(i.Suspense,{fallback:(0,h.jsx)(l.Z,{}),children:(0,h.jsx)(b,{clientData:t,setClient:r})});case"/clientdetail/".concat(m):return(0,h.jsx)(i.Suspense,{fallback:(0,h.jsx)(l.Z,{}),children:(0,h.jsx)(d,{clientData:t})});default:return(0,h.jsx)(h.Fragment,{children:"'no route was matched'"})}}},5997:function(e,n,t){t.d(n,{Y:function(){return i}});var a=t(1881),c=t.n(a),r=t(460),s=t(8121),i={withCredentials:!0,baseURL:"https://inmobitas-api-production.up.railway.app/"},o=c().create(i);o.interceptors.response.use((function(e){return e}),(function(e){return e.response.data.authorizationError&&r.h.dispatch((0,s.P_)()),Promise.reject(e)})),n.Z=o}}]);