import{A as b,s as A}from"./api.f8d8488d.js";import{t as K,b as O,A as j,B as k,d as C,C as D,r as G,D as P,o as d,c as f,w as i,a as l,E as r,F as B,G as H,H as u}from"./index.41bbef0a.js";import{S as c,V as R}from"./VContainer.8f559310.js";import{V as $,a as z,b as M,c as U}from"./VResponsive.d7797cba.js";import{V as F}from"./VSheet.3f77283e.js";import{m as J}from"./tag.fd07c7c5.js";import{V as p}from"./VCol.b072cd0e.js";var o=(t=>(t.VALID_TOKEN="VALID_TOKEN",t.INVALID_TOKEN="INVALID_TOKEN",t.CHECKING_TOKEN="CHECKING_TOKEN",t))(o||{});const W=["sm","md","lg","xl","xxl"],_=["start","end","center"],E=["space-between","space-around","space-evenly"];function h(t,s){return W.reduce((e,n)=>(e[t+k(n)]=s(),e),{})}const Y=[..._,"baseline","stretch"],I=t=>Y.includes(t),S=h("align",()=>({type:String,default:null,validator:I})),q=[..._,...E],w=t=>q.includes(t),x=h("justify",()=>({type:String,default:null,validator:w})),Q=[..._,...E,"stretch"],T=t=>Q.includes(t),v=h("alignContent",()=>({type:String,default:null,validator:T})),N={align:Object.keys(S),justify:Object.keys(x),alignContent:Object.keys(v)},X={align:"align",justify:"justify",alignContent:"align-content"};function Z(t,s,e){let n=X[t];if(e!=null){if(s){const a=s.replace(t,"");n+=`-${a}`}return n+=`-${e}`,n.toLowerCase()}}const V=K()({name:"VRow",props:{dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:I},...S,justify:{type:String,default:null,validator:w},...x,alignContent:{type:String,default:null,validator:T},...v,...J()},setup(t,s){let{slots:e}=s;const n=O(()=>{const a=[];let g;for(g in N)N[g].forEach(m=>{const L=t[m],y=Z(g,m,L);y&&a.push(y)});return a.push({"v-row--no-gutters":t.noGutters,"v-row--dense":t.dense,[`align-${t.align}`]:t.align,[`justify-${t.justify}`]:t.justify,[`align-content-${t.alignContent}`]:t.alignContent}),a});return()=>{var a;return j(t.tag,{class:["v-row",n.value]},(a=e.default)==null?void 0:a.call(e))}}}),tt=u("p",{class:"text-body-2 font-weight-light mb-1"},"Welcome to",-1),et=u("h1",{class:"text-h2 font-weight-bold hidden-sm-and-down"},"Playlist breakdown",-1),nt=u("h1",{class:"text-h3 font-weight-bold hidden-md-and-up"},"Playlist breakdown",-1),at=u("div",{class:"py-10"},null,-1),st=u("h2",{class:"text-h5 font-weight-light mb-5"},"Verifying Spotify Login",-1),ot=C({__name:"SplashComponent",setup(t){const s=D();let e=G(o.CHECKING_TOKEN);return P(async()=>{if(!c.TokenExists()){e.value=o.INVALID_TOKEN;return}e.value=o.CHECKING_TOKEN;try{const n=await b.verifyToken();if(!n.ok)throw{response:n};const a=await n.json();if(e.value=a?o.VALID_TOKEN:o.INVALID_TOKEN,a){s.push("/home");return}c.DestroyLocalStorage(),c.DestroySessionStorage()}catch{e.value=o.INVALID_TOKEN,c.DestroyLocalStorage(),c.DestroySessionStorage()}}),(n,a)=>(d(),f(R,{class:"fill-height"},{default:i(()=>[l($,{class:"d-flex align-center justify-center text-center fill-height"},{default:i(()=>[l(F,{elevation:"4",color:"rgba(0,0,0,0.25)",rounded:"xl",class:"py-10 text-center mx-auto","max-width":"500"},{default:i(()=>[tt,et,nt,at,r(e)==r(o).INVALID_TOKEN?(d(),f(V,{key:0,class:"d-flex align-center justify-center"},{default:i(()=>[l(p,{cols:"auto"},{default:i(()=>[l(z,{"min-width":"228",size:"x-large",variant:"tonal",href:r(A).baseEndpoint+"/login"},{default:i(()=>[l(M,{icon:"mdi-spotify",size:"x-large",start:""}),B(" Login with Spotify ")]),_:1},8,["href"])]),_:1})]),_:1})):r(e)==r(o).CHECKING_TOKEN?(d(),f(V,{key:1,class:"d-flex align-center justify-center"},{default:i(()=>[l(p,null,{default:i(()=>[st,l(U,{indeterminate:"",size:"large"})]),_:1})]),_:1})):H("",!0)]),_:1})]),_:1})]),_:1}))}}),gt=C({__name:"Splash",setup(t){return(s,e)=>(d(),f(ot))}});export{gt as default};