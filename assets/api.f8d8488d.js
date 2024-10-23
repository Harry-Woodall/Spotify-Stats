import{S as n}from"./VContainer.8f559310.js";const r={baseEndpoint:"https://spotify-service-zbmi.onrender.com"},a={getAsync:(e,t,s,i)=>fetch(`${r.baseEndpoint}${t}/?accessToken=${e}${c(s)}`,{signal:AbortSignal.timeout(i||3e4)}),postAsync:(e,t,s)=>fetch(`${r.baseEndpoint}${t}`,{headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify(e),signal:AbortSignal.timeout(s||2e4)}),refreshToken:e=>fetch(`${r.baseEndpoint}/refreshToken?refreshToken=${e}`,{signal:AbortSignal.timeout(1e4)})},c=e=>{let t="";return e==null||e.length==0||e.forEach(s=>{t+=`&${s.key}=${s.value}`}),t},l={async verifyToken(){return await a.getAsync(n.GetAccessToken(),"/api/verify")},async refreshToken(){const e=await a.refreshToken(n.GetRefreshToken());if(!e.ok)throw{response:e};const t=await e.text();return n.UpdateAccessToken(t),t},async getDisplayName(){},async getAllPlaylists(e,t=!1){const s=[];return e&&s.push({key:"offset",value:e.toString()}),t&&s.push({key:"cache",value:new Date().getTime().toString()}),await a.getAsync(n.GetAccessToken(),"/api/playlists/all",s.length?s:void 0)},async getPlaylistOverview(e){return await a.getAsync(n.GetAccessToken(),"/api/playlists/overview",[{key:"id",value:e}])},async getPlaylistData(e){return await a.getAsync(n.GetAccessToken(),"/api/playlists",[{key:"id",value:e}],6e4)},async postUserDetails(e){return await a.postAsync(e,"/requestAccess")},async pollForCurrentTrack(){return await a.getAsync(n.GetAccessToken(),"/api/player/current")},async getPlaylistName(e){return await a.getAsync(n.GetAccessToken(),"/api/playlists/name",[{key:"id",value:e}])},async getTrackAnalysis(e){return await a.getAsync(n.GetAccessToken(),"/api/player/current/analysis",[{key:"id",value:e}])}};export{l as A,r as s};