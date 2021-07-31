"use strict";define(["loading","dialogHelper","dom","globalize","listViewStyle","emby-input","paper-icon-button-light","css!./directorybrowser","formDialogStyle","emby-button"],(function(loading,dialogHelper,dom,globalize){function onDialogClosed(){loading.hide()}function refreshDirectoryBrowser(page,path,fileOptions,updatePathOnError){if(path&&"string"!=typeof path)throw new Error("invalid path");loading.show();var promises=[];"Network"===path?promises.push(ApiClient.getNetworkDevices()):path?(promises.push(ApiClient.getDirectoryContents(path,fileOptions)),promises.push(ApiClient.getParentPath(path))):promises.push(ApiClient.getDrives()),Promise.all(promises).then((function(responses){var folders=responses[0],parentPath=responses[1]||"",html="";page.querySelector(".results").scrollTop=0,page.querySelector("#txtDirectoryPickerPath").value=path||"",path&&(html+=getItem("lnkPath lnkDirectory","",parentPath,"..."));for(var i=0,length=folders.length;i<length;i++){var folder=folders[i];html+=getItem("File"===folder.Type?"lnkPath lnkFile":"lnkPath lnkDirectory",folder.Type,folder.Path,folder.Name)}path||(html+=getItem("lnkPath lnkDirectory","","Network",globalize.translate("ButtonNetwork"))),page.querySelector(".results").innerHTML=html,loading.hide()}),(function(){updatePathOnError&&(page.querySelector("#txtDirectoryPickerPath").value="",page.querySelector(".results").innerHTML="",loading.hide())}))}function getItem(cssClass,type,path,name){var html="";return html+='<div class="listItem listItem-border '+cssClass+'" data-type="'+type+'" data-path="'+path+'">',html+='<div class="listItemBody" style="padding-left:0;padding-top:.5em;padding-bottom:.5em;">',html+='<div class="listItemBodyText">',html+=name,html+="</div>",html+="</div>",html+='<span class="material-icons arrow_forward" style="font-size:inherit;"></span>',html+="</div>"}function alertText(text){!function alertTextWithOptions(options){require(["alert"],(function(alert){alert(options)}))}({text:text})}function initEditor(content,options,fileOptions){content.addEventListener("click",(function(e){var lnkPath=dom.parentWithClass(e.target,"lnkPath");if(lnkPath){var path=lnkPath.getAttribute("data-path");lnkPath.classList.contains("lnkFile")?content.querySelector("#txtDirectoryPickerPath").value=path:refreshDirectoryBrowser(content,path,fileOptions,!0)}})),content.addEventListener("click",(function(e){if(dom.parentWithClass(e.target,"btnRefreshDirectories")){var path=content.querySelector("#txtDirectoryPickerPath").value;refreshDirectoryBrowser(content,path,fileOptions)}})),content.addEventListener("change",(function(e){var txtDirectoryPickerPath=dom.parentWithTag(e.target,"INPUT");txtDirectoryPickerPath&&"txtDirectoryPickerPath"===txtDirectoryPickerPath.id&&refreshDirectoryBrowser(content,txtDirectoryPickerPath.value,fileOptions)})),content.querySelector("form").addEventListener("submit",(function(e){if(options.callback){var networkSharePath=this.querySelector("#txtNetworkPath");networkSharePath=networkSharePath?networkSharePath.value:null;var path=this.querySelector("#txtDirectoryPickerPath").value;(function validatePath(path,validateWriteable,apiClient){return apiClient.ajax({type:"POST",url:apiClient.getUrl("Environment/ValidatePath"),data:{ValidateWriteable:validateWriteable,Path:path}}).catch((function(response){if(response){if(404===response.status)return alertText(globalize.translate("PathNotFound")),Promise.reject();if(500===response.status)return alertText(validateWriteable?globalize.translate("WriteAccessRequired"):globalize.translate("PathNotFound")),Promise.reject()}return Promise.resolve()}))})(path,options.validateWriteable,ApiClient).then(options.callback(path,networkSharePath))}return e.preventDefault(),e.stopPropagation(),!1}))}function getDefaultPath(options){return options.path?Promise.resolve(options.path):ApiClient.getJSON(ApiClient.getUrl("Environment/DefaultDirectoryBrowser")).then((function(result){return result.Path||""}),(function(){return""}))}var systemInfo;return function directoryBrowser(){var currentDialog;this.show=function(options){var fileOptions={includeDirectories:!0};null!=(options=options||{}).includeDirectories&&(fileOptions.includeDirectories=options.includeDirectories),null!=options.includeFiles&&(fileOptions.includeFiles=options.includeFiles),Promise.all([systemInfo?Promise.resolve(systemInfo):ApiClient.getPublicSystemInfo().then((function(info){return systemInfo=info,info})),getDefaultPath(options)]).then((function(responses){var systemInfo=responses[0],initialPath=responses[1],dlg=dialogHelper.createDialog({size:"small",removeOnClose:!0,scrollY:!1});dlg.classList.add("ui-body-a"),dlg.classList.add("background-theme-a"),dlg.classList.add("directoryPicker"),dlg.classList.add("formDialog");var html="";html+='<div class="formDialogHeader">',html+='<button is="paper-icon-button-light" class="btnCloseDialog autoSize" tabindex="-1"><span class="material-icons arrow_back"></span></button>',html+='<h3 class="formDialogHeaderTitle">',html+=options.header||globalize.translate("HeaderSelectPath"),html+="</h3>",html+="</div>",html+=function getEditorHtml(options,systemInfo){var labelKey,html="";html+='<div class="formDialogContent scrollY">',html+='<div class="dialogContentInner dialog-content-centered" style="padding-top:2em;">',options.pathReadOnly||(html+='<div class="infoBanner" style="margin-bottom:1.5em;">',html+=options.instruction?options.instruction+"<br/><br/>":"","bsd"===systemInfo.OperatingSystem.toLowerCase()?(html+="<br/>",html+="<br/>",html+=globalize.translate("MessageDirectoryPickerBSDInstruction"),html+="<br/>"):"linux"===systemInfo.OperatingSystem.toLowerCase()&&(html+="<br/>",html+="<br/>",html+=globalize.translate("MessageDirectoryPickerLinuxInstruction"),html+="<br/>"),html+="</div>"),html+='<form style="margin:auto;">',html+='<div class="inputContainer" style="display: flex; align-items: center;">',html+='<div style="flex-grow:1;">',labelKey=!0!==options.includeFiles?"LabelFolder":"LabelPath";var readOnlyAttribute=options.pathReadOnly?" readonly":"";return html+='<input is="emby-input" id="txtDirectoryPickerPath" type="text" required="required" '+readOnlyAttribute+' label="'+globalize.translate(labelKey)+'"/>',html+="</div>",readOnlyAttribute||(html+='<button type="button" is="paper-icon-button-light" class="btnRefreshDirectories emby-input-iconbutton" title="'+globalize.translate("ButtonRefresh")+'"><span class="material-icons search"></span></button>'),html+="</div>",readOnlyAttribute||(html+='<div class="results paperList" style="max-height: 200px; overflow-y: auto;"></div>'),options.enableNetworkSharePath&&(html+='<div class="inputContainer" style="margin-top:2em;">',html+='<input is="emby-input" id="txtNetworkPath" type="text" label="'+globalize.translate("LabelOptionalNetworkPath")+'"/>',html+='<div class="fieldDescription">',html+=globalize.translate("LabelOptionalNetworkPathHelp","<b>\\\\server</b>","<b>\\\\192.168.1.101</b>"),html+="</div>",html+="</div>"),html+='<div class="formDialogFooter">',html+='<button is="emby-button" type="submit" class="raised button-submit block formDialogFooterItem">'+globalize.translate("ButtonOk")+"</button>",html+="</div>",html+="</form>",html+="</div>",html+="</div>",html+="</div>"}(options,systemInfo),dlg.innerHTML=html,initEditor(dlg,options,fileOptions),dlg.addEventListener("close",onDialogClosed),dialogHelper.open(dlg),dlg.querySelector(".btnCloseDialog").addEventListener("click",(function(){dialogHelper.close(dlg)})),currentDialog=dlg,dlg.querySelector("#txtDirectoryPickerPath").value=initialPath;var txtNetworkPath=dlg.querySelector("#txtNetworkPath");txtNetworkPath&&(txtNetworkPath.value=options.networkSharePath||""),options.pathReadOnly||refreshDirectoryBrowser(dlg,initialPath,fileOptions,!0)}))},this.close=function(){currentDialog&&dialogHelper.close(currentDialog)}}}));