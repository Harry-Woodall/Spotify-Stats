import{V as y,S as g}from"./VContainer.12e11d6d.js";import{o as t,ac as d,H as o,F as u,d as f,C as k,ak as v,c as s,w as r,a as i,ar as l,E as a,ad as R,G as _}from"./index.6412d301.js";import{_ as h}from"./_plugin-vue_export-helper.cdc0426e.js";import{V,a as m}from"./VResponsive.ef6de587.js";import{V as b}from"./VSheet.9af612b0.js";import"./tag.768b0aec.js";const C={},q=o("p",{class:"mt-10"},"Please wait and try again",-1),w=[q];function B(c,e){return t(),d("div",null,w)}const $=h(C,[["render",B]]),E={},S=o("p",{class:"text-left mt-10"},[u(" If you belive you are seeing this error by mistake, or would like to request access to this site, you can "),o("a",{href:"#/requestAccess",class:"basic-anchor"},"request access")],-1),N=[S];function T(c,e){return t(),d("div",null,N)}const D=h(E,[["render",T]]),L=f({__name:"Error",setup(c){const e=k(),{xs:n}=v(),p=()=>{e.removeRoute(e.currentRoute.value.name),g.DestroyLocalStorage(),e.push("/")},x=()=>{e.removeRoute(e.currentRoute.value.name),e.back()};return(P,z)=>(t(),s(y,{class:"fill-height"},{default:r(()=>[i(V,{class:"d-flex align-center justify-center text-center fill-height"},{default:r(()=>[i(b,{elevation:"4",color:"rgba(0,0,0,0.25)",rounded:"xl",class:"pa-10 text-center mx-auto","max-width":"500"},{default:r(()=>[o("h1",{class:l(a(n)?"text-h6":"text-h4")},"Error",2),o("p",{class:l(a(n)?"text-h4 font-weight-bold mt-5":"text-h3 font-weight-bold mt-5")},R(a(e).currentRoute.value.query.message),3),a(e).currentRoute.value.query.status=="403"?(t(),s(D,{key:0})):_("",!0),a(e).currentRoute.value.query.status=="429"?(t(),s($,{key:1})):_("",!0),a(e).currentRoute.value.query.status!="429"?(t(),s(m,{key:2,variant:"tonal",class:"mt-10",onClick:p},{default:r(()=>[u(" Back to login ")]),_:1})):(t(),s(m,{key:3,variant:"tonal",class:"mt-10",onClick:x},{default:r(()=>[u("Try again")]),_:1}))]),_:1})]),_:1})]),_:1}))}}),U=f({__name:"Error",setup(c){return(e,n)=>(t(),s(L))}});export{U as default};
