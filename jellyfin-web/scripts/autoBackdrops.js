"use strict";define(["backdrop","userSettings","libraryMenu"],(function(backdrop,userSettings,libraryMenu){var cache={};function showBackdrop(type,parentId){var apiClient=window.ApiClient;apiClient&&function getBackdropItemIds(apiClient,userId,types,parentId){var key="backdrops2_".concat(userId+(types||"")+(parentId||"")),data=cache[key];if(data)return console.debug("Found backdrop id list in cache. Key: ".concat(key)),data=JSON.parse(data),Promise.resolve(data);var options={SortBy:"IsFavoriteOrLiked,Random",Limit:20,Recursive:!0,IncludeItemTypes:types,ImageTypes:"Backdrop",ParentId:parentId,EnableTotalRecordCount:!1};return apiClient.getItems(apiClient.getCurrentUserId(),options).then((function(result){var images=result.Items.map((function(i){return{Id:i.Id,tag:i.BackdropImageTags[0],ServerId:i.ServerId}}));return cache[key]=JSON.stringify(images),images}))}(apiClient,apiClient.getCurrentUserId(),type,parentId).then((function(images){images.length?backdrop.setBackdrops(images.map((function(i){return i.BackdropImageTags=[i.tag],i}))):backdrop.clear()}))}pageClassOn("pageshow","page",(function(){this.classList.contains("selfBackdropPage")||(this.classList.contains("backdropPage")?!function enabled(){return userSettings.enableBackdrops()}()?(this.classList.remove("backdropPage"),backdrop.clear()):showBackdrop(this.getAttribute("data-backdroptype"),this.classList.contains("globalBackdropPage")?"":libraryMenu.getTopParentId()):backdrop.clear())}))}));