"use strict";define(["viewContainer","focusManager","queryString","layoutManager"],(function(viewContainer,focusManager,queryString,layoutManager){var currentView,dispatchPageEvents;function onViewChange(view,options,isRestore){currentView&&dispatchViewEvent(currentView,null,"viewhide"),currentView=view;var eventDetail=getViewEventDetail(view,options,isRestore);isRestore?layoutManager.mobile||(view.activeElement&&document.body.contains(view.activeElement)&&focusManager.isCurrentlyFocusable(view.activeElement)?focusManager.focus(view.activeElement):focusManager.autoFocus(view)):!1!==options.autoFocus&&focusManager.autoFocus(view),view.dispatchEvent(new CustomEvent("viewshow",eventDetail)),dispatchPageEvents&&view.dispatchEvent(new CustomEvent("pageshow",eventDetail))}function getProperties(view){var props=view.getAttribute("data-properties");return props?props.split(","):[]}function dispatchViewEvent(view,eventInfo,eventName,isCancellable){eventInfo||(eventInfo={detail:{type:view.getAttribute("data-type"),properties:getProperties(view)},bubbles:!0,cancelable:isCancellable}),eventInfo.cancelable=isCancellable||!1;var eventResult=view.dispatchEvent(new CustomEvent(eventName,eventInfo));return dispatchPageEvents&&(eventInfo.cancelable=!1,view.dispatchEvent(new CustomEvent(eventName.replace("view","page"),eventInfo))),eventResult}function getViewEventDetail(view,options,isRestore){var url=options.url,index=url.indexOf("?"),params=-1===index?{}:queryString.parse(url.substring(index+1));return{detail:{type:view.getAttribute("data-type"),properties:getProperties(view),params:params,isRestored:isRestore,state:options.state,options:options.options||{}},bubbles:!0,cancelable:!1}}function ViewManager(){}return viewContainer.setOnBeforeChange((function(newView,isRestored,options){if(currentView)dispatchViewEvent(currentView,null,"viewbeforehide",!0);var eventDetail=getViewEventDetail(newView,options,isRestored);newView.initComplete||(newView.initComplete=!0,"function"==typeof options.controllerFactory?new options.controllerFactory(newView,eventDetail.detail.params):options.controllerFactory&&"function"==typeof options.controllerFactory.default&&new options.controllerFactory.default(newView,eventDetail.detail.params),options.controllerFactory&&!dispatchPageEvents||dispatchViewEvent(newView,eventDetail,"viewinit"));dispatchViewEvent(newView,eventDetail,"viewbeforeshow")})),document.addEventListener("skinunload",(function resetCachedViews(){viewContainer.reset()})),ViewManager.prototype.loadView=function(options){currentView&&(currentView.activeElement=document.activeElement),options.cancel||viewContainer.loadView(options).then((function(view){onViewChange(view,options)}))},ViewManager.prototype.tryRestoreView=function(options,onViewChanging){return options.cancel?Promise.reject({cancelled:!0}):(currentView&&(currentView.activeElement=document.activeElement),viewContainer.tryRestoreView(options).then((function(view){onViewChanging(),onViewChange(view,options,!0)})))},ViewManager.prototype.currentView=function(){return currentView},ViewManager.prototype.dispatchPageEvents=function(value){dispatchPageEvents=value},new ViewManager}));