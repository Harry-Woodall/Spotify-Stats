import"./VContainer.8f559310.js";import{m as S}from"./tag.fd07c7c5.js";import{B as f,t as N,b as k,A as y}from"./index.41bbef0a.js";const a=["sm","md","lg","xl","xxl"],i=(()=>a.reduce((e,t)=>(e[t]={type:[Boolean,String,Number],default:!1},e),{}))(),d=(()=>a.reduce((e,t)=>(e["offset"+f(t)]={type:[String,Number],default:null},e),{}))(),m=(()=>a.reduce((e,t)=>(e["order"+f(t)]={type:[String,Number],default:null},e),{}))(),c={col:Object.keys(i),offset:Object.keys(d),order:Object.keys(m)};function C(e,t,r){let n=e;if(!(r==null||r===!1)){if(t){const l=t.replace(e,"");n+=`-${l}`}return e==="col"&&(n="v-"+n),e==="col"&&(r===""||r===!0)||(n+=`-${r}`),n.toLowerCase()}}const h=["auto","start","end","center","baseline","stretch"],P=N()({name:"VCol",props:{cols:{type:[Boolean,String,Number],default:!1},...i,offset:{type:[String,Number],default:null},...d,order:{type:[String,Number],default:null},...m,alignSelf:{type:String,default:null,validator:e=>h.includes(e)},...S()},setup(e,t){let{slots:r}=t;const n=k(()=>{const l=[];let o;for(o in c)c[o].forEach(s=>{const g=e[s],u=C(o,s,g);u&&l.push(u)});const b=l.some(s=>s.startsWith("v-col-"));return l.push({"v-col":!b||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),l});return()=>{var l;return y(e.tag,{class:n.value},(l=r.default)==null?void 0:l.call(r))}}});export{P as V};