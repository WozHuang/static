"use strict";define(["loading","libraryMenu","dom","emby-input","emby-button"],(function(loading,libraryMenu,dom){function loadData(){var page=this;loading.show();var id=getParameterByName("id"),promise1=ApiClient.getJSON(ApiClient.getUrl("Devices/Info",{Id:id})),promise2=ApiClient.getJSON(ApiClient.getUrl("Devices/Options",{Id:id}));Promise.all([promise1,promise2]).then((function(responses){!function load(page,device,deviceOptions){page.querySelector("#txtCustomName",page).value=deviceOptions.CustomName||"",page.querySelector(".reportedName",page).innerHTML=device.Name||""}(page,responses[0],responses[1]),loading.hide()}))}function onSubmit(e){return function save(page){var id=getParameterByName("id");ApiClient.ajax({url:ApiClient.getUrl("Devices/Options",{Id:id}),type:"POST",data:JSON.stringify({CustomName:page.querySelector("#txtCustomName").value}),contentType:"application/json"}).then(Dashboard.processServerConfigurationUpdateResult)}(dom.parentWithClass(this,"page")),e.preventDefault(),!1}return function(view,params){view.querySelector("form").addEventListener("submit",onSubmit),view.addEventListener("viewshow",loadData)}}));