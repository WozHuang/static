"use strict";define(["connectionManager","playbackManager","syncPlayManager","events","inputManager","focusManager","appRouter"],(function(connectionManager,playbackManager,syncPlayManager,events,inputManager,focusManager,appRouter){var serverNotifications={};function notifyApp(){inputManager.notify()}function processGeneralCommand(cmd,apiClient){switch(console.debug("Received command: "+cmd.Name),cmd.Name){case"Select":return void inputManager.trigger("select");case"Back":return void inputManager.trigger("back");case"MoveUp":return void inputManager.trigger("up");case"MoveDown":return void inputManager.trigger("down");case"MoveLeft":return void inputManager.trigger("left");case"MoveRight":return void inputManager.trigger("right");case"PageUp":return void inputManager.trigger("pageup");case"PageDown":return void inputManager.trigger("pagedown");case"PlayTrailers":!function playTrailers(apiClient,itemId){apiClient.getItem(apiClient.getCurrentUserId(),itemId).then((function(item){playbackManager.playTrailers(item)}))}(apiClient,cmd.Arguments.ItemId);break;case"SetRepeatMode":playbackManager.setRepeatMode(cmd.Arguments.RepeatMode);break;case"SetShuffleQueue":playbackManager.setQueueShuffleMode(cmd.Arguments.ShuffleMode);break;case"VolumeUp":return void inputManager.trigger("volumeup");case"VolumeDown":return void inputManager.trigger("volumedown");case"ChannelUp":return void inputManager.trigger("channelup");case"ChannelDown":return void inputManager.trigger("channeldown");case"Mute":return void inputManager.trigger("mute");case"Unmute":return void inputManager.trigger("unmute");case"ToggleMute":return void inputManager.trigger("togglemute");case"SetVolume":notifyApp(),playbackManager.setVolume(cmd.Arguments.Volume);break;case"SetAudioStreamIndex":notifyApp(),playbackManager.setAudioStreamIndex(parseInt(cmd.Arguments.Index));break;case"SetSubtitleStreamIndex":notifyApp(),playbackManager.setSubtitleStreamIndex(parseInt(cmd.Arguments.Index));break;case"ToggleFullscreen":return void inputManager.trigger("togglefullscreen");case"GoHome":return void inputManager.trigger("home");case"GoToSettings":return void inputManager.trigger("settings");case"DisplayContent":!function displayContent(cmd,apiClient){playbackManager.isPlayingLocally(["Video","Book"])||appRouter.showItem(cmd.Arguments.ItemId,apiClient.serverId())}(cmd,apiClient);break;case"GoToSearch":return void inputManager.trigger("search");case"DisplayMessage":!function displayMessage(cmd){var args=cmd.Arguments;args.TimeoutMs?require(["toast"],(function(toast){toast({title:args.Header,text:args.Text})})):require(["alert"],(function(alert){alert({title:args.Header,text:args.Text})}))}(cmd);break;case"ToggleOsd":case"ToggleContextMenu":case"TakeScreenShot":case"SendKey":break;case"SendString":focusManager.sendText(cmd.Arguments.String);break;default:console.debug("processGeneralCommand does not recognize: "+cmd.Name)}notifyApp()}function onMessageReceived(e,msg){if("Play"===msg.MessageType){notifyApp();var serverId=this.serverInfo().Id;"PlayNext"===msg.Data.PlayCommand?playbackManager.queueNext({ids:msg.Data.ItemIds,serverId:serverId}):"PlayLast"===msg.Data.PlayCommand?playbackManager.queue({ids:msg.Data.ItemIds,serverId:serverId}):playbackManager.play({ids:msg.Data.ItemIds,startPositionTicks:msg.Data.StartPositionTicks,mediaSourceId:msg.Data.MediaSourceId,audioStreamIndex:msg.Data.AudioStreamIndex,subtitleStreamIndex:msg.Data.SubtitleStreamIndex,startIndex:msg.Data.StartIndex,serverId:serverId})}else if("Playstate"===msg.MessageType)"Stop"===msg.Data.Command?inputManager.trigger("stop"):"Pause"===msg.Data.Command?inputManager.trigger("pause"):"Unpause"===msg.Data.Command?inputManager.trigger("play"):"PlayPause"===msg.Data.Command?inputManager.trigger("playpause"):"Seek"===msg.Data.Command?playbackManager.seek(msg.Data.SeekPositionTicks):"NextTrack"===msg.Data.Command?inputManager.trigger("next"):"PreviousTrack"===msg.Data.Command?inputManager.trigger("previous"):notifyApp();else if("GeneralCommand"===msg.MessageType){processGeneralCommand(msg.Data,this)}else if("UserDataChanged"===msg.MessageType){if(msg.Data.UserId===this.getCurrentUserId())for(var i=0,length=msg.Data.UserDataList.length;i<length;i++)events.trigger(serverNotifications,"UserDataChanged",[this,msg.Data.UserDataList[i]])}else"SyncPlayCommand"===msg.MessageType?syncPlayManager.processCommand(msg.Data,this):"SyncPlayGroupUpdate"===msg.MessageType?syncPlayManager.processGroupUpdate(msg.Data,this):events.trigger(serverNotifications,msg.MessageType,[this,msg.Data])}function bindEvents(apiClient){events.off(apiClient,"message",onMessageReceived),events.on(apiClient,"message",onMessageReceived)}return connectionManager.getApiClients().forEach(bindEvents),events.on(connectionManager,"apiclientcreated",(function(e,newApiClient){bindEvents(newApiClient)})),serverNotifications}));