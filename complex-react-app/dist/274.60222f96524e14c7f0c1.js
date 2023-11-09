"use strict";(self.webpackChunkcomplex_react_app=self.webpackChunkcomplex_react_app||[]).push([[274],{274:(e,s,t)=>{t.r(s),t.d(s,{default:()=>n});var a=t(294),r=t(983),c=t(625),l=t(861),o=t(847);const n=function(){const e=(0,a.useContext)(r.Z),[s,t]=(0,c.x)({searchTerm:"",results:[],show:"neither",requestCount:0});function n(s){27==s.keyCode&&e({type:"closeSearch"})}return(0,a.useEffect)((()=>(document.addEventListener("keyup",n),()=>document.removeEventListener("keyup",n))),[]),(0,a.useEffect)((()=>{if(s.searchTerm.trim()){t((e=>{e.show="loading"}));const e=setTimeout((()=>{console.log("useEffects delayed searchTerm value is: ",s.searchTerm),t((e=>{e.requestCount++}))}),750);return()=>clearTimeout(e)}t((e=>{e.show="neither"}))}),[s.searchTerm]),(0,a.useEffect)((()=>{if(s.requestCount){const e=l.Z.CancelToken.source();async function a(){try{const a=await l.Z.post("/search",{searchTerm:s.searchTerm},{cancelToken:e.token});console.log("Search.js mongoDB results from fetchResults was: ",a.data),t((e=>{e.results=a.data,e.show="results"}))}catch(e){console.log("There was a problem in Search.js axios useEffect() or the request was cancelled",e)}}return a(),()=>e.cancel()}}),[s.requestCount]),a.createElement(a.Fragment,null,a.createElement("div",{className:"search-overlay-top shadow-sm"},a.createElement("div",{className:"container container--narrow"},a.createElement("label",{htmlFor:"live-search-field",className:"search-overlay-icon"},a.createElement("i",{className:"fas fa-search"})),a.createElement("input",{onChange:function(e){const s=e.target.value;t((e=>{e.searchTerm=s}))},autoFocus:!0,type:"text",autoComplete:"off",id:"live-search-field",className:"live-search-field",placeholder:"Type here to search for a post"}),a.createElement("span",{onClick:()=>e({type:"closeSearch"}),className:"close-live-search"},a.createElement("i",{className:"fas fa-times-circle"})))),a.createElement("div",{className:"search-overlay-bottom"},a.createElement("div",{className:"container container--narrow py-3"},a.createElement("div",{className:"circle-loader "+("loading"==s.show?"circle-loader--visible":"")}),a.createElement("div",{className:"live-search-results "+("results"==s.show?"live-search-results--visible":"")},Boolean(s.results.length)&&a.createElement("div",{className:"list-group shadow-sm"},a.createElement("div",{className:"list-group-item active"},a.createElement("strong",null,"Search Results")," (",s.results.length," ",1!==s.results.length?"items":"item"," found)"),s.results.map((s=>a.createElement(o.Z,{post:s,key:s._id,onClick:()=>e({type:"closeSearch"})})))),!Boolean(s.results.length)&&a.createElement("p",{className:"alert alert-danger text-center shadow-sm"}," Sorry, no posts match this search.")))))}}}]);