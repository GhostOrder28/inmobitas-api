"use strict";(self.webpackChunkinmobitas_client=self.webpackChunkinmobitas_client||[]).push([[765],{6765:function(e,t,n){n.r(t);var s=n(5861),a=n(9439),r=n(7757),i=n.n(r),c=n(7313),u=n(6352),l=n(7890),o=n(7414),d=n(5997),f=n(2682),p=n(6417),g=(0,c.lazy)((function(){return Promise.all([n.e(708),n.e(544),n.e(740)]).then(n.bind(n,2740))})),h=(0,c.lazy)((function(){return Promise.all([n.e(708),n.e(225),n.e(68),n.e(600),n.e(746)]).then(n.bind(n,8746))}));t.default=function(){var e=(0,l.TH)(),t=(0,l.UO)(),n=t.clientid,r=t.listingid,x=(0,c.useState)(),b=(0,a.Z)(x,2),k=b[0],Z=b[1],j=(0,c.useState)(),m=(0,a.Z)(j,2),v=m[0],w=m[1],P=(0,c.useState)(null),S=(0,a.Z)(P,2),z=(S[0],S[1]),C=(0,u.v9)(f.vn);switch((0,c.useEffect)((function(){(0,s.Z)(i().mark((function t(){var s,a,c,u;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,"/newlisting"===e.pathname){t.next=18;break}if(!e.pathname.includes("/listingdetail")){t.next=8;break}return t.next=5,d.Z.get("/listings/".concat(C,"/").concat(n,"/").concat(r,"/group"));case 5:s=t.sent,t.next=11;break;case 8:return t.next=10,d.Z.get("/listings/".concat(C,"/").concat(n,"/").concat(r));case 10:s=t.sent;case 11:return t.next=13,d.Z.get("/listingpresets");case 13:a=t.sent,Z(s.data),w(a.data),t.next=22;break;case 18:return t.next=20,d.Z.get("/listingpresets");case 20:c=t.sent,w(c.data);case 22:t.next=27;break;case 24:t.prev=24,t.t0=t.catch(0),z(null===(u=t.t0.response)||void 0===u?void 0:u.data.error);case 27:case"end":return t.stop()}}),t,null,[[0,24]])})))()}),[]),e.pathname){case"/newlisting":return(0,p.jsx)(c.Suspense,{fallback:(0,p.jsx)(o.Z,{}),children:(0,p.jsx)(g,{dataPresets:v,setListing:Z})});case"/editlisting/".concat(n,"/").concat(r):return(0,p.jsx)(c.Suspense,{fallback:(0,p.jsx)(o.Z,{}),children:(0,p.jsx)(g,{dataPresets:v,listing:k,setListing:Z})});case"/listingdetail/".concat(n,"/").concat(r):return(0,p.jsx)(c.Suspense,{fallback:(0,p.jsx)(o.Z,{}),children:(0,p.jsx)(h,{dataPresets:v,listing:k})});default:return(0,p.jsx)(p.Fragment,{children:"no route matched..."})}}},5997:function(e,t,n){n.d(t,{Y:function(){return c}});var s=n(1881),a=n.n(s),r=n(460),i=n(8121),c={withCredentials:!0,baseURL:"/"},u=a().create(c);u.interceptors.response.use((function(e){return e}),(function(e){return e.response.data.authorizationError&&r.h.dispatch((0,i.P_)()),Promise.reject(e)})),t.Z=u}}]);