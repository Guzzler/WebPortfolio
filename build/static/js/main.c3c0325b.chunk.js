(this["webpackJsonppersonal-website"]=this["webpackJsonppersonal-website"]||[]).push([[0],{128:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(10),l=a.n(i);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var s=a(27),c=a(17),o=a(55),m=(a(72),{base:{}}),d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m,t=arguments.length>1?arguments[1]:void 0;return t.type,e},u=a(28),p=a(4),f=function(e){if(Array.isArray(e))return h(e);var t=Object.keys(e).reduce((function(t,a){return Array.isArray(e[a])?t[a]=h(e[a]):t[a]=E(e[a]),t}),{});return E(t)},h=function(e){return e.map((function(e){return E(e)}))},E=function e(t){for(var a in t)if(Object.prototype.hasOwnProperty.call(t,a)){var n=v(a);n!==a&&(t[n]=t[a],delete t[a]),"object"===typeof t[n]&&(Array.isArray(t[n])?t[n]=h(t[n]):t[n]=e(t[n]))}return t},g=function(e,t){return Number(t)>=0||Number(t)<=9?"_".concat(t):t.toUpperCase()},v=function(e){return e.replace(/_(.)/g,g)};var y=Symbol("Get API");function N(e){var t=e.endpoint,a=e.payload,n=e.method,r=void 0===n?"POST":n,i=e.payloadAsIs,l=e.skipCsrfToken;return new Promise((function(e,n){var s=new XMLHttpRequest,c=a;i||(c=function(e){if(Array.isArray(e))throw Error("snakeCaseKeys doesn't support arrays for now");return Object.keys(e).reduce((function(t,a){return t[a.replace(/([A-Z])/g,(function(e){return"_"+e.toLowerCase()}))]=e[a],t}),{})}(a));var o=JSON.stringify(c);s.open(r,t,!0),l||s.setRequestHeader("X-CSRFToken",function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var a=document.cookie.split(";"),n=0;n<a.length;n++){var r=a[n].trim();if(r.substring(0,e.length+1)===e+"="){t=decodeURIComponent(r.substring(e.length+1));break}}return t}("csrftoken")||""),s.setRequestHeader("Content-type","application/json"),s.onload=function(){s.status>=200&&s.status<400?function(e,t){var a=204===e.status?{}:f(JSON.parse(e.responseText));t(Object(p.a)({isServerOK:!0},a))}(s,e):function(e,t){var a=e.status,n=e.responseText;try{var r=JSON.parse(n);t({json:f(r),status:a})}catch(i){t({json:{},status:a})}}(s,n)},s.send(o)}))}var b=Symbol("Post API"),k=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||c.c,w=Object(c.d)(d,k(Object(c.a)(o.a,(function(e){return function(t){return function(a){var n=a[y];if("undefined"===typeof n)return t(a);var r=n.endpoint,i=n.types;if("function"===typeof r&&(r=r(e.getState())),"string"!==typeof r)throw new Error("Specify a string endpoint URL.");if(!Array.isArray(i)||3!==i.length)throw new Error("Expected an array of three action types.");if(!i.every((function(e){return"string"===typeof e})))throw new Error("Expected action types to be strings.");var l=Object(u.a)(i,3),s=l[0],c=l[1],o=l[2];function m(e){var t=Object(p.a)(Object(p.a)({},a),e);return delete t[y],t}function d(a){n.successTypeActionProps?t(m(Object(p.a)(Object(p.a)({response:a},n.successTypeActionProps),{},{type:c}))):t(m({response:a,type:c}));var r=n.onSuccess;if(r){if("function"!==typeof r)throw new Error("Success Callback should be a function");r(a,e.getState(),e.dispatch)}}function h(a){a.status=a.status||0,t(m({type:o,error:a.message||"Something bad happened"}));var r=n.onFailure;if(r){if("function"!==typeof r)throw new Error("Failure Callback should be a function");r(a,e.getState(),e.dispatch)}}var E={type:s};return n.requestTypeActionProps&&(E=Object(p.a)(Object(p.a)({},E),n.requestTypeActionProps)),t(m(E)),function(e){return fetch(e,{credentials:"same-origin"}).then((function(e){return e.json().then((function(t){return{json:t,response:e}})).catch((function(){return e.ok?Promise.resolve({response:e}):Promise.reject({status:e.status})}))})).then((function(e){var t=e.json,a=e.response;Array.isArray(t)?t={data:t}:"object"!==typeof t&&(t={}),t.isServerOK=!!a.ok;var n=f(t);return n.isServerOK?Object(p.a)({},n):Promise.reject(Object(p.a)({status:a.status},n))}))}(r).then(d,h)}}}),(function(e){return function(t){return function(a){var n=a[b];if("undefined"===typeof n)return t(a);var r=n.endpoint,i=n.payload,l=n.method,s=void 0===l?"post":l,c=n.types,o=Object(u.a)(c,3),m=o[0],d=o[1],f=o[2];if("function"===typeof r&&(r=r(e.getState())),"string"!==typeof r)throw new Error("Specify a string endpoint URL.");if("function"===typeof i&&(i=i(e.getState())),"object"!==typeof i)throw new Error("Specify the payload for POST request");if(!Array.isArray(c)||3!==c.length)throw new Error("Expected an array of three action types.");if(!c.every((function(e){return"string"===typeof e})))throw new Error("Expected action types to be strings.");function h(e){var t=Object(p.a)(Object(p.a)({},a),e);return delete t[b],t}var E={type:m};return n.requestTypeActionProps&&(E=Object(p.a)(Object(p.a)({},E),n.requestTypeActionProps)),t(h(E)),function(){var a=n.payloadAsIs,l=void 0!==a&&a,c=n.isPayloadJson,o=void 0!==c&&c,m=n.skipCsrfToken;return N({endpoint:r,payload:i,method:s,payloadAsIs:l,isPayloadJson:o,skipCsrfToken:void 0!==m&&m}).then((function(a){n.successTypeActionProps?t(h(Object(p.a)(Object(p.a)({response:a},n.successTypeActionProps),{},{type:d}))):t(h({response:a,type:d}));var r=n.onSuccess;if(r){if("function"!==typeof r)throw new Error("Success Callback should be a function");r(a,e.getState(),e.dispatch)}}),(function(a){var r=a.status,i=a.json;if("undefined"!==typeof r)try{var l,s={errors:null===i||void 0===i||null===(l=i.form)||void 0===l?void 0:l.errors};n.failureTypeActionProps&&(s=Object(p.a)(Object(p.a)({},s),n.failureTypeActionProps)),t(h(Object(p.a)({type:f},s)));var c=n.onFailure;if(c){if("function"!==typeof c)throw new Error("Failure Callback should be a function");c(i,e.getState(),e.dispatch)}}catch(o){console.error(o.stack)}}))}()}}})))),S=(a(73),a(74),a(18)),j=a(2),O=a(131),A=a(132),C=a(133),P=a(56),T=a.n(P),x=a(57),I=a.n(x),J=(a(75),a(76),function(e){return r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("ul",{className:"timeline timeline-centered"},r.a.createElement("li",{className:"timeline-item period"},r.a.createElement("div",{className:"timeline-info"}),r.a.createElement("div",{className:"timeline-marker"}),r.a.createElement("div",{className:"timeline-content"},r.a.createElement("h2",{className:"timeline-title"},"Work"))),r.a.createElement("li",{className:"timeline-item"},r.a.createElement("div",{className:"timeline-info"},r.a.createElement("span",null,"April 2021 - Current")),r.a.createElement("div",{className:"timeline-marker"}),r.a.createElement("div",{className:"timeline-content"},r.a.createElement("h3",{className:"timeline-title"},"Senior Software Engineer, RedBrickAI"),r.a.createElement("p",null,"Leading a team of small engineers to build a training data platform to help accelerate and manage computer vision labeling while enforcing high quality standards at reasonable cost. My responsibility here includes heading the entire Frontend development of the product as well as helping with system design and future technological management."),r.a.createElement("p",null,r.a.createElement("strong",null,"Technologies Used: "),"Python, React.js, Jest, AWS Tech Stack (S3, Lambdas etc), GraphQL, Typescript."))),r.a.createElement("li",{className:"timeline-item"},r.a.createElement("div",{className:"timeline-info"},r.a.createElement("span",null,"January 2019 - March 2021")),r.a.createElement("div",{className:"timeline-marker"}),r.a.createElement("div",{className:"timeline-content"},r.a.createElement("h3",{className:"timeline-title"},"Software Development Engineer, Instamojo Technologies"),r.a.createElement("p",null,"Full stack engineer working with a financial technology company to build a new age payment and commerce product for MSMEs (Micro, Small and Medium Enterprises). Worked on projects that included sachet loans, micro-finance and UPI (Unified Payment Interface) usage."),r.a.createElement("p",null,r.a.createElement("strong",null,"Technologies Used: "),"Python, Javascript, React.js, Jest, Django, GoLang."))),r.a.createElement("li",{className:"timeline-item period"},r.a.createElement("div",{className:"timeline-info"}),r.a.createElement("div",{className:"timeline-marker"}),r.a.createElement("div",{className:"timeline-content"},r.a.createElement("h2",{className:"timeline-title"},"Internships"))),r.a.createElement("li",{className:"timeline-item"},r.a.createElement("div",{className:"timeline-info"},r.a.createElement("span",null,"May 2018 - July 2018")),r.a.createElement("div",{className:"timeline-marker"}),r.a.createElement("div",{className:"timeline-content"},r.a.createElement("h3",{className:"timeline-title"},"Summer Intern, Microsoft Corporation"),r.a.createElement("p",null,"Worked on a machine learning application based on Object Detection, Object Tracking and Action Classification using Microsoft\u2019s Custom Vision library in combination with open source libraries such as OpenCV, YOLOv3, a Deepmind KineticsI3D based model and a custom trained action classifier based in Keras to gain video-based insights on safety scenarios in workplace environments."),r.a.createElement("p",null,r.a.createElement("strong",null,"Technologies Used: "),"Python, C, C++."))),r.a.createElement("li",{className:"timeline-item"},r.a.createElement("div",{className:"timeline-info"},r.a.createElement("span",null,"May 2017 - July 2017")),r.a.createElement("div",{className:"timeline-marker"}),r.a.createElement("div",{className:"timeline-content"},r.a.createElement("h3",{className:"timeline-title"},"Software Development Intern, Conscia Corporation"),r.a.createElement("p",null,"Worked on the front-end development of Conscia's Data Management and Enrichment platform using the React.js framework with Redux for state-management and Jest for unit testing. My work also involved using external libraries such as the JSON-schema-form to build dynamic front-end components."),r.a.createElement("p",null,r.a.createElement("strong",null,"Technologies Used: "),"Javascript, React.js, Jest."))),r.a.createElement("li",{className:"timeline-item period"},r.a.createElement("div",{className:"timeline-info"}),r.a.createElement("div",{className:"timeline-marker"}),r.a.createElement("div",{className:"timeline-content"},r.a.createElement("h2",{className:"timeline-title"},"Projects"))),r.a.createElement("li",{className:"timeline-item"},r.a.createElement("div",{className:"timeline-info"},r.a.createElement("span",null,"April 2015")),r.a.createElement("div",{className:"timeline-marker"}),r.a.createElement("div",{className:"timeline-content"},r.a.createElement("h3",{className:"timeline-title"},"Co Founder and Developer, Openshiksha Initiative"," "),r.a.createElement("p",null,r.a.createElement("a",{href:"https://www.openshiksha.org",target:"_blank",rel:"noreferrer noopener"}," ","OpenShiksha")," ","is a non-profit online adaptive learning platform, designed to improve learning outcomes for students in underserved communities in India. I managed a large portion of the front-end development and project vision development. We worked with multiple schools and ran a successful pilot at my Alma mater DPS, Pune."),r.a.createElement("p",null,r.a.createElement("strong",null,"Technologies Used: "),"Javascript, React.js, Jest, Django."))),r.a.createElement("li",{className:"timeline-item"},r.a.createElement("div",{className:"timeline-info"},r.a.createElement("span",null,"May 2018")),r.a.createElement("div",{className:"timeline-marker"}),r.a.createElement("div",{className:"timeline-content"},r.a.createElement("h3",{className:"timeline-title"},"Creator , Chess Kabaddi "),r.a.createElement("p",null,r.a.createElement("a",{href:"https://play.google.com/store/apps/details?id=com.chesskabaddi.game",target:"_blank",rel:"noreferrer noopener"}," ","ChessKabaddi")," ","is a novel multiplayer cross-platform game built with a state of the art adversarial AI which is a fusion of the intellectual stimulation of Chess with the fun of the Indian sport Kabaddi. I build this from scratch using Java and LibGdx to and made basic gameAI using Minimax Algorithms and basic neural networks."),r.a.createElement("p",null,r.a.createElement("strong",null,"Technologies Used: "),"Java, Libgdx."))),r.a.createElement("li",{className:"timeline-item"},r.a.createElement("div",{className:"timeline-info"},r.a.createElement("span",null,"May 2021")),r.a.createElement("div",{className:"timeline-marker"}),r.a.createElement("div",{className:"timeline-content"},r.a.createElement("h3",{className:"timeline-title"},"Co-Founder , VaccinePost"),r.a.createElement("p",null,r.a.createElement("a",{href:"https://vaccinepost.co.in",target:"_blank",rel:"noreferrer noopener"}," ","VaccinePost")," ","is a vaccine notification system that was built during the pandemic to help with location based notifications to allow users in India to book their vaccine on priority at clinics around them."),r.a.createElement("p",null,r.a.createElement("strong",null,"Technologies Used: "),"Javascript, React,js, AWS Lambdas."))),r.a.createElement("li",{className:"timeline-item"},r.a.createElement("div",{className:"timeline-info"},r.a.createElement("span",null,"Jan 2016 - May 2018")),r.a.createElement("div",{className:"timeline-marker"}),r.a.createElement("div",{className:"timeline-content"},r.a.createElement("h3",{className:"timeline-title"},"Developer/Event Lead , Cyberhawk"),r.a.createElement("p",null,r.a.createElement("a",{href:"https://cyberhawk.iecsemanipal.com",target:"_blank",rel:"noreferrer noopener"}," ","Cyberhawk")," ","is a web based online cryptic hunt played by over 1000 players. My work included back-end(Flask/Go) development as well as front-end (Angular/React.js) scripting."),r.a.createElement("p",null,r.a.createElement("strong",null,"Technologies Used: "),"Flask, Angular, React.js, Javascript, Golang")))))))}),M=Object(s.b)((function(e){return{base:e.base}}),{})((function(){return r.a.useEffect((function(){new T.a(document.getElementById("test-ele")).radius(130)})),r.a.createElement(A.a,{className:"width-100 height-100 background-white"},r.a.createElement(C.a,{span:4,md:4,sm:24,xs:24,className:"left-column background-blue roboto-font f18 text-white"},r.a.createElement("div",{className:"pi-logo-entire center"},r.a.createElement("span",{id:"test-ele",className:"f18 source-code-font text-cool-grey"},"Sharang"," "),r.a.createElement("img",{src:I.a,alt:"pi",className:"pi-logo-image"})),r.a.createElement("div",{className:"text-left cv-text-details"},r.a.createElement("div",{className:"caption f14 text-green cv-caption"},"Name"),r.a.createElement("div",null,"Sharang Pai"),r.a.createElement("div",{className:"caption f14 text-green cv-caption"},"Focus"),r.a.createElement("div",null,"Computer Science Engineer / Web Developer"),r.a.createElement("div",{className:"caption f14 text-green cv-caption"},"Say Hello"),r.a.createElement("div",null,r.a.createElement("a",{className:"text-white mailtolink",href:"mailto:sharangpai123@gmail.com"},"sharangpai123@gmail.com")),r.a.createElement("div",{className:"caption f14 text-green cv-caption"},"Connect"),r.a.createElement("div",null,r.a.createElement("div",{className:"connect-button-container"},r.a.createElement("ul",{className:"connect-buttons"},r.a.createElement("li",{className:"connect-button"},r.a.createElement("a",{className:"connect-link",href:"https://www.github.com/Guzzler",target:"_blank",rel:"noopener noreferrer"},r.a.createElement("i",{className:"fa fa-github","aria-hidden":"true"}))),r.a.createElement("li",{className:"connect-button"},r.a.createElement("a",{className:"connect-link",target:"_blank",rel:"noopener noreferrer",href:"https://www.linkedin.com/in/sharang-pai/"},r.a.createElement("i",{className:"fa fa-linkedin","aria-hidden":"true"}))),r.a.createElement("li",{className:"connect-button"},r.a.createElement("a",{className:"connect-link",target:"_blank",rel:"noopener noreferrer",href:"https://sharangpai.me"},r.a.createElement("i",{className:"fa fa-globe","aria-hidden":"true"}))))))),r.a.createElement("div",{className:"cv-copyright"}," @ 2021 - By Sharang Pai")),r.a.createElement(C.a,{md:20,sm:24,xs:24,className:"resume-main-content roboto-font"},r.a.createElement(A.a,null,r.a.createElement(C.a,{md:16,sm:24,xs:24,className:"resume-first-col"},r.a.createElement("div",{className:"caption f24 text-green resume-caption"},"About "),r.a.createElement("div",{className:"f14 text-black"},r.a.createElement("div",{className:"padding-half--ends"},"I'm a computer scientist interested in the intersection of information technology and data science for socially relevant applications. This webpage is an attempt to structure some of my ideas and projects. Feel free to get in touch if you're interested in my work or share common interests!"),r.a.createElement("div",{className:"padding-half--ends"}," ","I've spent the last few years working on various projects including an open source educational initiative for underserved students called OpenShiksha. My ultimate purpose is to become a socially relevant technological entrepreneur, and use innovative technology to bridge the socio-economic gap for the underserved.")),r.a.createElement("div",{className:"caption f24 text-green resume-caption"},"EXPERIENCE"," "),r.a.createElement(J,null)),r.a.createElement(C.a,{md:8,sm:24,xs:24,className:"resume-second-col"},r.a.createElement("div",{className:"caption f24 text-green resume-caption"},"EDUCATION"," "),r.a.createElement("div",{className:"f14 text-black"},r.a.createElement("div",{className:"padding--ends"}," ",r.a.createElement("strong",null,"BTech. Computers and Communication Engineering"," ")," ","/ Manipal Institute of Technology (9.64/10 GPA)",r.a.createElement("div",{className:"text-light-grey"},"2015 - 2019"),r.a.createElement("div",null,r.a.createElement("strong",null,"Selected Coursework:")," ",r.a.createElement("span",{className:"italics"},"Operating Systems; Artificial Intelligence; Pattern Recognition; Computer Architecture; Embedded System Design; Neural Networks and Fuzzy Logic; Natural Computing; Human Computer Interaction; Computer Vision."," "))),r.a.createElement("div",{className:"padding--ends"}," ",r.a.createElement("strong",null,"High School ")," / Delhi Public School, Pune",r.a.createElement("div",{className:"text-light-grey"},"2003 - 2015"),r.a.createElement("div",null,"Graduated as the head of the student council body governing over 2500 students. Received multiple scholars honours (given for academic excellence) and was part of both the basketball and football varsity teams, having captained the basketball team for a brief period. Qualified for the Indian National Informatics Olympiad (2012/2013) and also participated in Google Code-in (2013)."))),r.a.createElement("div",{className:"caption f24 text-green resume-caption"},"Technical"," "),r.a.createElement("div",{className:"f16 text-black"},r.a.createElement("div",{className:"padding--ends"},r.a.createElement("span",{className:"strong"},"Programming Languages:"),r.a.createElement("span",{className:"italics"}," Python, C++, Java, SQL, HTML, CSS, Javascript, XML, Typescript, Golang ")),r.a.createElement("div",{className:"padding--ends"},r.a.createElement("span",{className:"strong"},"Tools:")," ",r.a.createElement("span",{className:"italics"}," React/Redux, Flask, Django, OpenCV, NodeJS, Android, Socket.io, Keras, LibGdx, Godot ")),r.a.createElement("div",{className:"padding--ends"},r.a.createElement("span",{className:"strong"},"Interests:")," ",r.a.createElement("span",{className:"italics"},"UI/UX Development, Human Computer Interaction, Low Resource System Design, Neural Networks, Artificial Intelligence "))),r.a.createElement("div",{className:"caption f24 text-green resume-caption"},"IN MY OFF TIME"," "),r.a.createElement("div",{className:"padding--ends f16 text-black"},r.a.createElement("span",{className:"strong"},"Things I like:")," League of Legends;Gaming on my PC;Building new games;Playing Football/Basketball;Watching Anime;"))),r.a.createElement("div",{className:"overflow-auto padding-sides padding--ends"})))})),R=a(130),L=function(){return r.a.createElement(A.a,{style:{marginTop:60,textAlign:"center",width:"100%"}},r.a.createElement(C.a,{span:12,offset:6},r.a.createElement("h1",{className:"f48"}," 404 "),r.a.createElement("h2",{className:"f36"}," PAGE NOT FOUND "),r.a.createElement("h3",{className:"text-light-grey"},' " Not all those who wander are lost " '),r.a.createElement(R.a,{type:"primary"},r.a.createElement(S.b,{to:"/"}," Go to Homepage "))))};var D=function(){return r.a.createElement(j.a,{render:function(e){var t=e.location;return r.a.createElement(A.a,{className:"display-block"},r.a.createElement(j.c,{location:t},r.a.createElement(j.a,{path:"/",component:M,key:"base"}),r.a.createElement(j.a,{render:function(){return r.a.createElement(L,null)},key:"notFound"})))}})},F=O.a.Content;var U=function(){return r.a.createElement(O.a,{className:"height-min-100"},r.a.createElement(F,{theme:"light",className:"height-min-100"},r.a.createElement(D,null)))},_=function(){return r.a.createElement(S.a,null,r.a.createElement("div",{className:"height-100"},r.a.createElement(j.c,null,r.a.createElement(j.a,{path:"/",component:U}))))},G=r.a.createElement(s.a,{store:w},r.a.createElement(_,null));l.a.render(G,document.getElementById("app_root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},57:function(e,t,a){e.exports=a.p+"static/media/pi-image.f352e454.jpg"},63:function(e,t,a){e.exports=a(128)},73:function(e,t,a){},74:function(e,t,a){},75:function(e,t,a){},76:function(e,t,a){}},[[63,1,2]]]);
//# sourceMappingURL=main.c3c0325b.chunk.js.map