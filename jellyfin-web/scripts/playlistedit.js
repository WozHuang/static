"use strict";define(["listView"],(function(listView){function init(page,item){var elem=page.querySelector("#childrenContent .itemsContainer");elem.classList.add("vertical-list"),elem.classList.remove("vertical-wrap"),elem.enableDragReordering(!0),elem.fetchData=function getFetchPlaylistItemsFn(itemId){return function(){var query={Fields:"PrimaryImageAspectRatio,UserData",EnableImageTypes:"Primary,Backdrop,Banner,Thumb",UserId:ApiClient.getCurrentUserId()};return ApiClient.getJSON(ApiClient.getUrl("Playlists/".concat(itemId,"/Items"),query))}}(item.Id),elem.getItemsHtml=function getItemsHtmlFn(itemId){return function(items){return listView.getListViewHtml({items:items,showIndex:!1,showRemoveFromPlaylist:!0,playFromHere:!0,action:"playallfromhere",smallIcon:!0,dragHandle:!0,playlistId:itemId})}}(item.Id)}window.PlaylistViewer={render:function render(page,item){page.playlistInit||(page.playlistInit=!0,init(page,item)),page.querySelector("#childrenContent").classList.add("verticalSection-extrabottompadding"),page.querySelector("#childrenContent .itemsContainer").refreshItems()}}}));