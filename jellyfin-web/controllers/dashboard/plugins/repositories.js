define(["exports","loading","libraryMenu","globalize","dialogHelper","emby-button","emby-checkbox","emby-select","formDialogStyle","listViewStyle"],(function(_exports,_loading,_libraryMenu,_globalize,_dialogHelper,_embyButton,_embyCheckbox,_embySelect,_formDialogStyle,_listViewStyle){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.default=function _default(view,params){view.addEventListener("viewshow",(function(){_libraryMenu.default.setTabs("plugins",2,getTabs),reloadList(this);var save=this;$("#repositories",view).on("click",".btnDelete",(function(){var button=this;repositories=repositories.filter((function(r){return r.Url!==button.id})),saveList(save)}))})),view.querySelector(".btnNewRepository").addEventListener("click",(function(){var dialog=_dialogHelper.default.createDialog({scrollY:!1,size:"large",modal:!1,removeOnClose:!0}),html="";html+='<div class="formDialogHeader">',html+='<button type="button" is="paper-icon-button-light" class="btnCancel autoSize" tabindex="-1"><span class="material-icons arrow_back"></span></button>',html+='<h3 class="formDialogHeaderTitle">'.concat(_globalize.default.translate("HeaderNewRepository"),"</h3>"),html+="</div>",html+='<form class="newPluginForm" style="margin:4em">',html+='<div class="inputContainer">',html+='<input is="emby-input" id="txtRepositoryName" label="'.concat(_globalize.default.translate("LabelRepositoryName"),'" type="text" required />'),html+='<div class="fieldDescription">'.concat(_globalize.default.translate("LabelRepositoryNameHelp"),"</div>"),html+="</div>",html+='<div class="inputContainer">',html+='<input is="emby-input" id="txtRepositoryUrl" label="'.concat(_globalize.default.translate("LabelRepositoryUrl"),'" type="url" required />'),html+='<div class="fieldDescription">'.concat(_globalize.default.translate("LabelRepositoryUrlHelp"),"</div>"),html+="</div>",html+='<button is="emby-button" type="submit" class="raised button-submit block"><span>'.concat(_globalize.default.translate("ButtonSave"),"</span></button>"),html+="</div>",html+="</form>",dialog.innerHTML=html,dialog.querySelector(".btnCancel").addEventListener("click",(function(){_dialogHelper.default.close(dialog)})),dialog.querySelector(".newPluginForm").addEventListener("submit",(function(){return repositories.push({Name:dialog.querySelector("#txtRepositoryName").value,Url:dialog.querySelector("#txtRepositoryUrl").value,Enabled:!0}),saveList(view),_dialogHelper.default.close(dialog),!1})),_dialogHelper.default.open(dialog)}))},_loading=_interopRequireDefault(_loading),_libraryMenu=_interopRequireDefault(_libraryMenu),_globalize=_interopRequireDefault(_globalize),_dialogHelper=_interopRequireDefault(_dialogHelper);var repositories=[];function reloadList(page){_loading.default.show(),ApiClient.getJSON(ApiClient.getUrl("Repositories")).then((function(list){repositories=list,function populateList(options){var html="";html+='<div class="paperList">';for(var i=0;i<options.repositories.length;i++)html+=getRepositoryHtml(options.repositories[i]);html+="</div>",options.repositories.length||options.noneElement.classList.remove("hide");options.listElement.innerHTML=html,_loading.default.hide()}({listElement:page.querySelector("#repositories"),noneElement:page.querySelector("#none"),repositories:repositories})})).catch((function(error){console.error("error loading repositories"),page.querySelector("#none").classList.remove("hide"),_loading.default.hide()}))}function saveList(page){_loading.default.show(),ApiClient.ajax({type:"POST",url:ApiClient.getUrl("Repositories"),data:JSON.stringify(repositories),contentType:"application/json"}).then((function(response){reloadList(page)})).catch((function(error){console.error("error saving repositories"),_loading.default.hide()}))}function getRepositoryHtml(repository){var html="";return html+='<div class="listItem listItem-border">',html+='<a is="emby-linkbutton" style="margin:0;padding:0" class="clearLink listItemIconContainer" href="'.concat(repository.Url,'">'),html+='<span class="material-icons listItemIcon open_in_new"></span>',html+="</a>",html+='<div class="listItemBody two-line">',html+='<h3 class="listItemBodyText">'.concat(repository.Name,"</h3>"),html+='<div class="listItemBodyText secondary">'.concat(repository.Url,"</div>"),html+="</div>",html+='<button type="button" is="paper-icon-button-light" id="'.concat(repository.Url,'" class="btnDelete" title="').concat(_globalize.default.translate("ButtonDelete"),'"><span class="material-icons delete"></span></button>'),html+="</div>"}function getTabs(){return[{href:"installedplugins.html",name:_globalize.default.translate("TabMyPlugins")},{href:"availableplugins.html",name:_globalize.default.translate("TabCatalog")},{href:"repositories.html",name:_globalize.default.translate("TabRepositories")}]}}));