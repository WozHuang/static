"use strict";define(["connectionManager","globalize","userSettings","apphost"],(function(connectionManager,globalize,userSettings,appHost){function showMessage(text,userSettingsKey,appHostFeature){if(appHost.supports(appHostFeature))return Promise.resolve();var now=new Date;return userSettingsKey+=now.getFullYear()+"-w"+function getWeek(date){var d=new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate())),dayNum=d.getUTCDay()||7;d.setUTCDate(d.getUTCDate()+4-dayNum);var yearStart=new Date(Date.UTC(d.getUTCFullYear(),0,1));return Math.ceil(((d-yearStart)/864e5+1)/7)}(now),"1"===userSettings.get(userSettingsKey,!1)?Promise.resolve():new Promise((function(resolve,reject){userSettings.set(userSettingsKey,"1",!1),require(["alert"],(function(alert){return alert(text).then(resolve,resolve)}))}))}function ExpirementalPlaybackWarnings(){this.name="Experimental playback warnings",this.type="preplayintercept",this.id="expirementalplaybackwarnings"}return ExpirementalPlaybackWarnings.prototype.intercept=function(options){var item=options.item;return item?"Iso"===item.VideoType?function showIsoMessage(){return showMessage(globalize.translate("UnsupportedPlayback"),"isoexpirementalinfo","nativeisoplayback")}():"BluRay"===item.VideoType?function showBlurayMessage(){return showMessage(globalize.translate("UnsupportedPlayback"),"blurayexpirementalinfo","nativeblurayplayback")}():"Dvd"===item.VideoType?function showDvdMessage(){return showMessage(globalize.translate("UnsupportedPlayback"),"dvdexpirementalinfo","nativedvdplayback")}():Promise.resolve():Promise.resolve()},ExpirementalPlaybackWarnings}));