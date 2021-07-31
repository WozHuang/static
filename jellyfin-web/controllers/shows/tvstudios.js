"use strict";define(["loading","libraryBrowser","cardBuilder","apphost"],(function(loading,libraryBrowser,cardBuilder,appHost){function getQuery(params){var key=function getSavedQueryKey(){return libraryBrowser.getSavedQueryKey("studios")}(),pageData=data[key];return pageData||((pageData=data[key]={query:{SortBy:"SortName",SortOrder:"Ascending",IncludeItemTypes:"Series",Recursive:!0,Fields:"DateCreated,PrimaryImageAspectRatio",StartIndex:0}}).query.ParentId=params.topParentId),pageData.query}var data={};return function(view,params,tabContent){var promise;this.preRender=function(){promise=function getPromise(context,params){var query=getQuery(params);return loading.show(),ApiClient.getStudios(ApiClient.getCurrentUserId(),query)}(0,params)},this.renderTab=function(){!function reloadItems(context,params,promise){promise.then((function(result){var elem=context.querySelector("#items");cardBuilder.buildCards(result.Items,{itemsContainer:elem,shape:"backdrop",preferThumb:!0,showTitle:!0,scalable:!0,centerText:!0,overlayMoreButton:!0,context:"tvshows"}),loading.hide(),require(["autoFocuser"],(function(autoFocuser){autoFocuser.autoFocus(context)}))}))}(tabContent,0,promise)}}}));