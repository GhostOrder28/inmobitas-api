"use strict";(self.webpackChunkinmobitas_client=self.webpackChunkinmobitas_client||[]).push([[155],{1155:function(e,t,n){n.r(t);var a=n(5861),c=n(9439),r=n(7757),s=n.n(r),i=n(7313),o=n(6352),u=n(7890),l=n(7414),f=n(5997),h=n(2682),p=n(6417),d=(0,i.lazy)((function(){return Promise.all([n.e(29),n.e(225),n.e(68),n.e(587),n.e(550)]).then(n.bind(n,550))})),m=(0,i.lazy)((function(){return Promise.all([n.e(29),n.e(723),n.e(683)]).then(n.bind(n,6683))}));t.default=function(){var e=(0,i.useState)(),t=(0,c.Z)(e,2),n=t[0],r=t[1],b=(0,u.UO)().clientid,x=(0,u.TH)(),k=(0,o.v9)(h.vn);switch(console.log(x.pathname),(0,i.useEffect)((function(){(0,a.Z)(s().mark((function e(){var t;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.Z.get("/clients/".concat(k,"/").concat(b));case 3:t=e.sent,r(t.data),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()}),[]),(0,i.useEffect)((function(){return console.log(n)})),x.pathname){case"/editclient/".concat(b):return(0,p.jsx)(i.Suspense,{fallback:(0,p.jsx)(l.Z,{}),children:(0,p.jsx)(m,{clientData:n,setClient:r})});case"/clientdetail/".concat(b):return(0,p.jsx)(i.Suspense,{fallback:(0,p.jsx)(l.Z,{}),children:(0,p.jsx)(d,{clientData:n})});default:return(0,p.jsx)(p.Fragment,{children:"'no route was matched'"})}}},5997:function(e,t,n){var a=n(1881),c=n.n(a),r=n(460),s=n(8121),i=c().create({withCredentials:!0,baseURL:"https://inmobitas.herokuapp.com/"});i.interceptors.response.use((function(e){return e}),(function(e){return e.response.data.authorizationError&&r.h.dispatch((0,s.P_)()),Promise.reject(e)})),t.Z=i}}]);