"use strict";define(["events","browser","require","apphost","appSettings","htmlMediaHelper"],(function(events,browser,require,appHost,appSettings,htmlMediaHelper){var fadeTimeout,supportedFeatures;function cancelFadeTimeout(){fadeTimeout&&(clearTimeout(fadeTimeout),fadeTimeout=null)}function HtmlAudioPlayer(){var self=this;function unBindEvents(elem){elem.removeEventListener("timeupdate",onTimeUpdate),elem.removeEventListener("ended",onEnded),elem.removeEventListener("volumechange",onVolumeChange),elem.removeEventListener("pause",onPause),elem.removeEventListener("playing",onPlaying),elem.removeEventListener("play",onPlay),elem.removeEventListener("waiting",onWaiting)}function onEnded(){htmlMediaHelper.onEndedInternal(self,this,onError)}function onTimeUpdate(){var time=this.currentTime;self._isFadingOut||(self._currentTime=time,events.trigger(self,"timeupdate"))}function onVolumeChange(){self._isFadingOut||(htmlMediaHelper.saveVolume(this.volume),events.trigger(self,"volumechange"))}function onPlaying(e){self._started||(self._started=!0,this.removeAttribute("controls"),htmlMediaHelper.seekOnPlaybackStart(self,e.target,self._currentPlayOptions.playerStartPositionTicks)),events.trigger(self,"playing")}function onPlay(e){events.trigger(self,"unpause")}function onPause(){events.trigger(self,"pause")}function onWaiting(){events.trigger(self,"waiting")}function onError(){var type,errorCode=this.error&&this.error.code||0,errorMessage=this.error&&this.error.message||"";switch(console.error("media element error: "+errorCode.toString()+" "+errorMessage),errorCode){case 1:return;case 2:type="network";break;case 3:if(self._hlsPlayer)return void htmlMediaHelper.handleHlsJsMediaError(self);type="mediadecodeerror";break;case 4:type="medianotsupported";break;default:return}htmlMediaHelper.onErrorInternal(self,type)}self.name="Html Audio Player",self.type="mediaplayer",self.id="htmlaudioplayer",self.priority=1,self.play=function(options){return self._started=!1,self._timeUpdated=!1,self._currentTime=null,function setCurrentSrc(elem,options){elem.removeEventListener("error",onError),unBindEvents(elem),function bindEvents(elem){elem.addEventListener("timeupdate",onTimeUpdate),elem.addEventListener("ended",onEnded),elem.addEventListener("volumechange",onVolumeChange),elem.addEventListener("pause",onPause),elem.addEventListener("playing",onPlaying),elem.addEventListener("play",onPlay),elem.addEventListener("waiting",onWaiting)}(elem);var val=options.url;console.debug("playing url: "+val);var seconds=(options.playerStartPositionTicks||0)/1e7;seconds&&(val+="#t="+seconds);htmlMediaHelper.destroyHlsPlayer(self),self._currentPlayOptions=options;var crossOrigin=htmlMediaHelper.getCrossOriginValue(options.mediaSource);crossOrigin&&(elem.crossOrigin=crossOrigin);return function enableHlsPlayer(url,item,mediaSource,mediaType){return htmlMediaHelper.enableHlsJsPlayer(mediaSource.RunTimeTicks,mediaType)?-1!==url.indexOf(".m3u8")?Promise.resolve():new Promise((function(resolve,reject){require(["fetchHelper"],(function(fetchHelper){fetchHelper.ajax({url:url,type:"HEAD"}).then((function(response){"application/x-mpegurl"===(response.headers.get("Content-Type")||"").toLowerCase()?resolve():reject()}),reject)}))})):Promise.reject()}(val,options.item,options.mediaSource,"Audio").then((function(){return new Promise((function(resolve,reject){!function requireHlsPlayer(callback){require(["hlsjs"],(function(hls){window.Hls=hls,callback()}))}((function(){var hls=new Hls({manifestLoadingTimeOut:2e4,xhrSetup:function xhrSetup(xhr,url){xhr.withCredentials=!0}});hls.loadSource(val),hls.attachMedia(elem),htmlMediaHelper.bindEventsToHlsPlayer(self,hls,elem,onError,resolve,reject),self._hlsPlayer=hls,self._currentSrc=val}))}))}),(function(){return elem.autoplay=!0,elem.crossOrigin="use-credentials",htmlMediaHelper.applySrc(elem,val,options).then((function(){return self._currentSrc=val,htmlMediaHelper.playWithPromise(elem,onError)}))}))}(function createMediaElement(){var elem=self._mediaElement;if(elem)return elem;(elem=document.querySelector(".mediaPlayerAudio"))||((elem=document.createElement("audio")).classList.add("mediaPlayerAudio"),elem.classList.add("hide"),document.body.appendChild(elem));return elem.volume=htmlMediaHelper.getSavedVolume(),self._mediaElement=elem,elem}(),options)},self.stop=function(destroyPlayer){cancelFadeTimeout();var elem=self._mediaElement,src=self._currentSrc;if(elem&&src){if(!destroyPlayer||!function supportsFade(){return!browser.tv}())return elem.pause(),htmlMediaHelper.onEndedInternal(self,elem,onError),destroyPlayer&&self.destroy(),Promise.resolve();var originalVolume=elem.volume;return function fade(instance,elem,startingVolume){instance._isFadingOut=!0;var newVolume=Math.max(0,startingVolume-.15);return console.debug("fading volume to "+newVolume),elem.volume=newVolume,newVolume<=0?(instance._isFadingOut=!1,Promise.resolve()):new Promise((function(resolve,reject){cancelFadeTimeout(),fadeTimeout=setTimeout((function(){fade(instance,elem,newVolume).then(resolve,reject)}),100)}))}(self,elem,elem.volume).then((function(){elem.pause(),elem.volume=originalVolume,htmlMediaHelper.onEndedInternal(self,elem,onError),destroyPlayer&&self.destroy()}))}return Promise.resolve()},self.destroy=function(){unBindEvents(self._mediaElement)}}return HtmlAudioPlayer.prototype.currentSrc=function(){return this._currentSrc},HtmlAudioPlayer.prototype.canPlayMediaType=function(mediaType){return"audio"===(mediaType||"").toLowerCase()},HtmlAudioPlayer.prototype.getDeviceProfile=function(item){return appHost.getDeviceProfile?appHost.getDeviceProfile(item):function getDefaultProfile(){return new Promise((function(resolve,reject){require(["browserdeviceprofile"],(function(profileBuilder){resolve(profileBuilder({}))}))}))}()},HtmlAudioPlayer.prototype.currentTime=function(val){var mediaElement=this._mediaElement;if(mediaElement){if(null!=val)return void(mediaElement.currentTime=val/1e3);var currentTime=this._currentTime;return currentTime?1e3*currentTime:1e3*(mediaElement.currentTime||0)}},HtmlAudioPlayer.prototype.duration=function(val){var mediaElement=this._mediaElement;if(mediaElement){var duration=mediaElement.duration;if(htmlMediaHelper.isValidDuration(duration))return 1e3*duration}return null},HtmlAudioPlayer.prototype.seekable=function(){var mediaElement=this._mediaElement;if(mediaElement){var seekable=mediaElement.seekable;if(seekable&&seekable.length){var start=seekable.start(0),end=seekable.end(0);return htmlMediaHelper.isValidDuration(start)||(start=0),htmlMediaHelper.isValidDuration(end)||(end=0),end-start>0}return!1}},HtmlAudioPlayer.prototype.getBufferedRanges=function(){var mediaElement=this._mediaElement;return mediaElement?htmlMediaHelper.getBufferedRanges(this,mediaElement):[]},HtmlAudioPlayer.prototype.pause=function(){var mediaElement=this._mediaElement;mediaElement&&mediaElement.pause()},HtmlAudioPlayer.prototype.resume=function(){var mediaElement=this._mediaElement;mediaElement&&mediaElement.play()},HtmlAudioPlayer.prototype.unpause=function(){var mediaElement=this._mediaElement;mediaElement&&mediaElement.play()},HtmlAudioPlayer.prototype.paused=function(){var mediaElement=this._mediaElement;return!!mediaElement&&mediaElement.paused},HtmlAudioPlayer.prototype.setPlaybackRate=function(value){var mediaElement=this._mediaElement;mediaElement&&(mediaElement.playbackRate=value)},HtmlAudioPlayer.prototype.getPlaybackRate=function(){var mediaElement=this._mediaElement;return mediaElement?mediaElement.playbackRate:null},HtmlAudioPlayer.prototype.setVolume=function(val){var mediaElement=this._mediaElement;mediaElement&&(mediaElement.volume=val/100)},HtmlAudioPlayer.prototype.getVolume=function(){var mediaElement=this._mediaElement;if(mediaElement)return Math.min(Math.round(100*mediaElement.volume),100)},HtmlAudioPlayer.prototype.volumeUp=function(){this.setVolume(Math.min(this.getVolume()+2,100))},HtmlAudioPlayer.prototype.volumeDown=function(){this.setVolume(Math.max(this.getVolume()-2,0))},HtmlAudioPlayer.prototype.setMute=function(mute){var mediaElement=this._mediaElement;mediaElement&&(mediaElement.muted=mute)},HtmlAudioPlayer.prototype.isMuted=function(){var mediaElement=this._mediaElement;return!!mediaElement&&mediaElement.muted},HtmlAudioPlayer.prototype.destroy=function(){},HtmlAudioPlayer.prototype.supports=function(feature){return supportedFeatures||(supportedFeatures=function getSupportedFeatures(){var list=[];return"number"==typeof document.createElement("audio").playbackRate&&list.push("PlaybackRate"),list}()),-1!==supportedFeatures.indexOf(feature)},HtmlAudioPlayer}));