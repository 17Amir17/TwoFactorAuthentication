(this.webpackJsonpfront=this.webpackJsonpfront||[]).push([[0],{69:function(e,t,r){},71:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r(31),s=r.n(a),c=r(32),o=r(2),u=r(4),i=r.n(u),l=r(9),p=r(72),j=r(73),b=r(5),d=r(1),f=Object(n.createContext)(void 0),h=function(e){var t=Object(n.useState)(),r=Object(b.a)(t,2),a=r[0],s=r[1],c=Object(n.useState)(),o=Object(b.a)(c,2),u=o[0],i=o[1],l=Object(n.useState)(),p=Object(b.a)(l,2),j=p[0],h=p[1],O=Object(n.useState)(),m=Object(b.a)(O,2),v=m[0],x=m[1];return Object(d.jsx)(f.Provider,{value:{user:a,setUser:s,image:u,setImage:i,clearContext:function(){s(void 0),i(void 0)},online:v,setOnline:x,username:j,setUsername:h},children:e.children})},O=r(3),m=r(13),v=r.n(m),x=r(20),w=r.n(x);function g(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";w.a.fire(e,t,"success")}function y(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";w.a.fire(e,t,"error")}function k(e){return"string"===typeof e||e instanceof String}function E(e){return"object"===typeof e&&null!=e}function C(e){if(E(t=e)&&"username"in t&&"hasTwoFactor"in t&&"token"in t){if(!k(e.username))throw new Error("Username is not string");if(!k(e.token))throw new Error("Invalid token");if("boolean"!==typeof e.hasTwoFactor)throw new Error("Invalid two factor");return e}var t;throw new Error("Invalid user")}var N=v.a.create({baseURL:"http://localHost:3001/"});function T(){return(T=Object(l.a)(i.a.mark((function e(t,r){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,N.post("register",{username:t,password:r});case 3:return g(e.sent.data.message),e.abrupt("return",!0);case 8:return e.prev=8,e.t0=e.catch(0),v.a.isAxiosError(e.t0)&&e.t0.response&&y("Oppsies",e.t0.response.data.message),e.abrupt("return",!1);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function U(e,t){return I.apply(this,arguments)}function I(){return(I=Object(l.a)(i.a.mark((function e(t,r){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,N.post("login",{username:t,password:r});case 3:if("2factor"!==(n=e.sent).data.message){e.next=8;break}return e.abrupt("return",{twoFactor:!0,username:n.data.username});case 8:return g(n.data.message),a=C(n.data.user),e.abrupt("return",a);case 11:e.next=18;break;case 13:return e.prev=13,e.t0=e.catch(0),v.a.isAxiosError(e.t0)&&e.t0.response&&y("Oopsies",e.t0.response.data.message),console.log(e.t0),e.abrupt("return",!1);case 18:case"end":return e.stop()}}),e,null,[[0,13]])})))).apply(this,arguments)}function F(e,t){return S.apply(this,arguments)}function S(){return(S=Object(l.a)(i.a.mark((function e(t,r){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,N.post("login/qr?code=".concat(t),{username:r});case 3:return n=e.sent,g("GG WP","You are in!"),a=C(n.data.user),e.abrupt("return",a);case 9:return e.prev=9,e.t0=e.catch(0),v.a.isAxiosError(e.t0)&&e.t0.response&&y("Oopsies",e.t0.response.data.message),console.log(e.t0),e.abrupt("return",!1);case 14:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function R(e){return A.apply(this,arguments)}function A(){return(A=Object(l.a)(i.a.mark((function e(t){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,N.post("register/twofactor",Object(O.a)({},t));case 3:return g("Yay!",(r=e.sent).data.message),console.log(r),e.abrupt("return",r.data.qr);case 9:return e.prev=9,e.t0=e.catch(0),v.a.isAxiosError(e.t0)&&e.t0.response&&y("Oopsies",e.t0.response.data.message),console.log(e.t0),e.abrupt("return",!1);case 14:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function q(){var e,t=Object(n.useContext)(f),r=Object(o.f)();Object(n.useEffect)((function(){t&&(t.user||r("/"))}),[t]);var a=function(){var e=Object(l.a)(i.a.mark((function e(){var r,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t||!t.user){e.next=5;break}return e.next=3,R(t.user);case 3:(r=e.sent)&&((n=t.user).hasTwoFactor=!0,t.setUser(n),t.setImage(r));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(d.jsxs)("div",{className:"homepage",children:[Object(d.jsxs)("h1",{children:[" Welcome ",(null===t||void 0===t?void 0:t.user)?t.user.username:"","! "]}),(null===t||void 0===t||null===(e=t.user)||void 0===e?void 0:e.hasTwoFactor)?Object(d.jsxs)(p.a,{style:{width:"18rem"},children:[Object(d.jsx)(p.a.Img,{variant:"top",src:t.image,alt:"img"}),Object(d.jsxs)(p.a.Body,{children:[Object(d.jsx)(p.a.Title,{children:"Your QR Code"}),Object(d.jsx)(p.a.Text,{children:"Scan the code and save it!"})]})]}):Object(d.jsx)(j.a,{variant:"primary",onClick:a,children:"Use Two Factor!"})]})}function B(){var e=Object(n.useRef)(null),t=Object(n.useRef)(null),r=Object(n.useContext)(f),a=Object(o.f)(),s=Object(o.e)(),c=function(){var n=Object(l.a)(i.a.mark((function n(){var s;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!e.current||!t.current){n.next=5;break}return n.next=3,U(e.current.value,t.current.value);case 3:E(s=n.sent)&&"twoFactor"in s?r&&(r.setUsername(s.username),r.setOnline(!0),a("twofactor")):s&&r&&(r.setUser(s),r.setOnline(!0),a("homepage"));case 5:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();return Object(n.useEffect)((function(){"/"===s.pathname&&r&&r.setOnline(!1)}),[s]),Object(d.jsx)("div",{className:"login-wrapper",children:Object(d.jsxs)("div",{className:"login",children:[Object(d.jsx)("h3",{children:"Sign In"}),Object(d.jsxs)("div",{className:"form-group",children:[Object(d.jsx)("label",{children:"Username"}),Object(d.jsx)("input",{type:"text",className:"form-control",placeholder:"Enter username",ref:e})]}),Object(d.jsxs)("div",{className:"form-group",children:[Object(d.jsx)("label",{children:"Password"}),Object(d.jsx)("input",{type:"password",className:"form-control",placeholder:"Enter password",ref:t})]}),Object(d.jsxs)("div",{className:"btns",children:[Object(d.jsx)("button",{className:"btn btn-primary btn-block",onClick:c,children:"Login"}),Object(d.jsx)("button",{className:"btn btn-primary btn-block",onClick:function(){e.current&&t.current&&function(e,t){T.apply(this,arguments)}(e.current.value,t.current.value)},children:"Register"})]})]})})}function P(){var e=Object(n.useRef)(null),t=Object(n.useContext)(f),r=Object(o.f)();Object(n.useEffect)((function(){t&&(t.online||r("/"))}),[t]);var a=function(){var n=Object(l.a)(i.a.mark((function n(){var a,s,c;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!(e.current&&t&&t.username)){n.next=6;break}return s=null===(a=e.current)||void 0===a?void 0:a.value,n.next=4,F(s,t.username);case 4:(c=n.sent)&&t&&(t.setUser(c),c.qr&&t.setImage(c.qr),r("/homepage"));case 6:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();return Object(d.jsx)("div",{children:Object(d.jsx)(p.a,{style:{width:"18rem"},children:Object(d.jsxs)(p.a.Body,{children:[Object(d.jsx)(p.a.Title,{children:"Two Factor Auth"}),Object(d.jsx)(p.a.Text,{children:"Enter code from mobile authenticator app"}),Object(d.jsx)("input",{type:"text",placeholder:"code",ref:e}),Object(d.jsx)(j.a,{variant:"primary",onClick:a,children:"Send Code"})]})})})}var Y=function(){return Object(d.jsx)(h,{children:Object(d.jsx)(c.a,{children:Object(d.jsxs)(o.c,{children:[Object(d.jsx)(o.a,{path:"/twofactor",element:Object(d.jsx)(P,{})}),Object(d.jsx)(o.a,{path:"/homepage",element:Object(d.jsx)(q,{})}),Object(d.jsx)(o.a,{path:"/",element:Object(d.jsx)(B,{})})]})})})};r(69),r(70);s.a.render(Object(d.jsx)(Y,{}),document.getElementById("root"))}},[[71,1,2]]]);
//# sourceMappingURL=main.c6900f9a.chunk.js.map