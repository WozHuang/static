"use strict";define(["libraryBrowser","cardBuilder","apphost","imageLoader","loading"],(function(libraryBrowser,cardBuilder,appHost,imageLoader,loading){return function(view,params,tabContent){function getPageData(){var key=getSavedQueryKey(),pageData=data[key];return pageData||((pageData=data[key]={query:{SortBy:"SortName",SortOrder:"Ascending",Recursive:!0,Fields:"PrimaryImageAspectRatio,ItemCounts",StartIndex:0},view:libraryBrowser.getSavedView(key)||"Poster"}).query.ParentId=params.topParentId,libraryBrowser.loadSavedQueryValues(key,pageData.query)),pageData}function getQuery(){return getPageData().query}function getSavedQueryKey(){return libraryBrowser.getSavedQueryKey("genres")}var promise,self=this,data={};self.getViewStyles=function(){return"Poster,PosterCard,Thumb,ThumbCard".split(",")},self.getCurrentViewStyle=function(){return getPageData().view},self.setCurrentViewStyle=function(viewStyle){getPageData().view=viewStyle,libraryBrowser.saveViewSetting(getSavedQueryKey(),viewStyle),function fullyReload(){self.preRender(),self.renderTab()}()},self.enableViewSelection=!0,self.preRender=function(){promise=function getPromise(){loading.show();var query=getQuery();return ApiClient.getGenres(ApiClient.getCurrentUserId(),query)}()},self.renderTab=function(){!function reloadItems(context,promise){var query=getQuery();promise.then((function(result){var html="",viewStyle=self.getCurrentViewStyle();"Thumb"==viewStyle?html=cardBuilder.getCardsHtml({items:result.Items,shape:"backdrop",preferThumb:!0,context:"music",centerText:!0,overlayMoreButton:!0,showTitle:!0}):"ThumbCard"==viewStyle?html=cardBuilder.getCardsHtml({items:result.Items,shape:"backdrop",preferThumb:!0,context:"music",cardLayout:!0,showTitle:!0}):"PosterCard"==viewStyle?html=cardBuilder.getCardsHtml({items:result.Items,shape:"auto",context:"music",cardLayout:!0,showTitle:!0}):"Poster"==viewStyle&&(html=cardBuilder.getCardsHtml({items:result.Items,shape:"auto",context:"music",centerText:!0,overlayMoreButton:!0,showTitle:!0}));var elem=context.querySelector("#items");elem.innerHTML=html,imageLoader.lazyChildren(elem),libraryBrowser.saveQueryValues(getSavedQueryKey(),query),loading.hide(),require(["autoFocuser"],(function(autoFocuser){autoFocuser.autoFocus(context)}))}))}(tabContent,promise)}}}));