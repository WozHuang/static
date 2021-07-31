"use strict";define(["dialogHelper","require","layoutManager","globalize","userSettings","connectionManager","loading","focusManager","dom","apphost","emby-select","listViewStyle","paper-icon-button-light","css!./../formdialog","material-icons","emby-button","flexStyles"],(function(dialogHelper,require,layoutManager,globalize,userSettings,connectionManager,loading,focusManager,dom,appHost){function setMediaInfo(user,page,item){var html=item.MediaSources.map((function(version){return function getMediaSourceHtml(user,item,version){var html="";version.Name&&(html+='<div><h2 class="mediaInfoStreamType">'+version.Name+"</h2></div>");version.Container&&(html+=createAttribute(globalize.translate("MediaInfoContainer"),version.Container)+"<br/>");version.Formats&&version.Formats.length&&(html+=createAttribute(globalize.translate("MediaInfoFormat"),version.Formats.join(","))+"<br/>");version.Path&&user&&user.Policy.IsAdministrator&&(html+=createAttribute(globalize.translate("MediaInfoPath"),version.Path)+"<br/>");if(version.Size){var size=(version.Size/1048576).toFixed(0)+" MB";html+=createAttribute(globalize.translate("MediaInfoSize"),size)+"<br/>"}for(var i=0,length=version.MediaStreams.length;i<length;i++){var stream=version.MediaStreams[i];if("Data"!==stream.Type){html+='<div class="mediaInfoStream">';var displayType=globalize.translate("MediaInfoStreamType"+stream.Type);html+='<h2 class="mediaInfoStreamType">'+displayType+"</h2>";var attributes=[];stream.DisplayTitle&&attributes.push(createAttribute("Title",stream.DisplayTitle)),stream.Language&&"Video"!==stream.Type&&attributes.push(createAttribute(globalize.translate("MediaInfoLanguage"),stream.Language)),stream.Codec&&attributes.push(createAttribute(globalize.translate("MediaInfoCodec"),stream.Codec.toUpperCase())),stream.CodecTag&&attributes.push(createAttribute(globalize.translate("MediaInfoCodecTag"),stream.CodecTag)),null!=stream.IsAVC&&attributes.push(createAttribute("AVC",stream.IsAVC?"Yes":"No")),stream.Profile&&attributes.push(createAttribute(globalize.translate("MediaInfoProfile"),stream.Profile)),stream.Level&&attributes.push(createAttribute(globalize.translate("MediaInfoLevel"),stream.Level)),(stream.Width||stream.Height)&&attributes.push(createAttribute(globalize.translate("MediaInfoResolution"),stream.Width+"x"+stream.Height)),stream.AspectRatio&&"mjpeg"!==stream.Codec&&attributes.push(createAttribute(globalize.translate("MediaInfoAspectRatio"),stream.AspectRatio)),"Video"===stream.Type&&(null!=stream.IsAnamorphic&&attributes.push(createAttribute(globalize.translate("MediaInfoAnamorphic"),stream.IsAnamorphic?"Yes":"No")),attributes.push(createAttribute(globalize.translate("MediaInfoInterlaced"),stream.IsInterlaced?"Yes":"No"))),(stream.AverageFrameRate||stream.RealFrameRate)&&attributes.push(createAttribute(globalize.translate("MediaInfoFramerate"),stream.AverageFrameRate||stream.RealFrameRate)),stream.ChannelLayout&&attributes.push(createAttribute(globalize.translate("MediaInfoLayout"),stream.ChannelLayout)),stream.Channels&&attributes.push(createAttribute(globalize.translate("MediaInfoChannels"),stream.Channels+" ch")),stream.BitRate&&"mjpeg"!==stream.Codec&&attributes.push(createAttribute(globalize.translate("MediaInfoBitrate"),parseInt(stream.BitRate/1e3)+" kbps")),stream.SampleRate&&attributes.push(createAttribute(globalize.translate("MediaInfoSampleRate"),stream.SampleRate+" Hz")),stream.BitDepth&&attributes.push(createAttribute(globalize.translate("MediaInfoBitDepth"),stream.BitDepth+" bit")),stream.PixelFormat&&attributes.push(createAttribute(globalize.translate("MediaInfoPixelFormat"),stream.PixelFormat)),stream.RefFrames&&attributes.push(createAttribute(globalize.translate("MediaInfoRefFrames"),stream.RefFrames)),stream.NalLengthSize&&attributes.push(createAttribute("NAL",stream.NalLengthSize)),"Video"!==stream.Type&&attributes.push(createAttribute(globalize.translate("MediaInfoDefault"),stream.IsDefault?"Yes":"No")),"Subtitle"===stream.Type&&(attributes.push(createAttribute(globalize.translate("MediaInfoForced"),stream.IsForced?"Yes":"No")),attributes.push(createAttribute(globalize.translate("MediaInfoExternal"),stream.IsExternal?"Yes":"No"))),"Video"===stream.Type&&version.Timestamp&&attributes.push(createAttribute(globalize.translate("MediaInfoTimestamp"),version.Timestamp)),html+=attributes.join("<br/>"),html+="</div>"}}return html}(user,0,version)})).join('<div style="border-top:1px solid #444;margin: 1em 0;"></div>');item.MediaSources.length>1&&(html="<br/>"+html),page.querySelector("#mediaInfoContent").innerHTML=html}function createAttribute(label,value){return'<span class="mediaInfoLabel">'+label+'</span><span class="mediaInfoAttribute">'+value+"</span>"}return{show:function showMediaInfo(itemId,serverId){return loading.show(),new Promise((function(resolve,reject){require(["text!./itemMediaInfo.template.html"],(function(template){(function showMediaInfoMore(itemId,serverId,template){var apiClient=connectionManager.getApiClient(serverId);return apiClient.getItem(apiClient.getCurrentUserId(),itemId).then((function(item){var dialogOptions={size:"small",removeOnClose:!0,scrollY:!1};layoutManager.tv&&(dialogOptions.size="fullscreen");var dlg=dialogHelper.createDialog(dialogOptions);dlg.classList.add("formDialog");var html="";html+=globalize.translateDocument(template,"core"),dlg.innerHTML=html,layoutManager.tv&&dlg.querySelector(".formDialogContent"),dialogHelper.open(dlg),dlg.querySelector(".btnCancel").addEventListener("click",(function(e){dialogHelper.close(dlg)})),apiClient.getCurrentUser().then((function(user){setMediaInfo(user,dlg,item)})),loading.hide()}))})(itemId,serverId,template).then(resolve,reject)}))}))}}}));