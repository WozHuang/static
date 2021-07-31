"use strict";define(["browser","dialogHelper","layoutManager","scrollHelper","globalize","dom","require","material-icons","emby-button","paper-icon-button-light","emby-input","formDialogStyle"],(function(browser,dialogHelper,layoutManager,scrollHelper,globalize,dom,require){return(browser.tv||browser.xboxOne)&&window.confirm?function(options){"string"==typeof options&&(options={label:"",text:options});var label=function replaceAll(str,find,replace){return str.split(find).join(replace)}(options.label||"","<br/>","\n"),result=prompt(label,options.text||"");return result?Promise.resolve(result):Promise.reject(result)}:function(options){return new Promise((function(resolve,reject){require(["text!./prompt.template.html"],(function(template){"string"==typeof options&&(options={title:"",text:options}),function showDialog(options,template){var dialogOptions={removeOnClose:!0,scrollY:!1};layoutManager.tv&&(dialogOptions.size="fullscreen");var submitValue,dlg=dialogHelper.createDialog(dialogOptions);return dlg.classList.add("formDialog"),dlg.innerHTML=globalize.translateHtml(template,"core"),layoutManager.tv?scrollHelper.centerFocus.on(dlg.querySelector(".formDialogContent"),!1):(dlg.querySelector(".dialogContentInner").classList.add("dialogContentInner-mini"),dlg.classList.add("dialog-fullscreen-lowres")),dlg.querySelector(".btnCancel").addEventListener("click",(function(e){dialogHelper.close(dlg)})),dlg.querySelector(".formDialogHeaderTitle").innerHTML=options.title||"",options.description?dlg.querySelector(".fieldDescription").innerHTML=options.description:dlg.querySelector(".fieldDescription").classList.add("hide"),function setInputProperties(dlg,options){var txtInput=dlg.querySelector("#txtInput");txtInput.label?txtInput.label(options.label||""):txtInput.setAttribute("label",options.label||""),txtInput.value=options.value||""}(dlg,options),dlg.querySelector("form").addEventListener("submit",(function(e){return submitValue=dlg.querySelector("#txtInput").value,e.preventDefault(),e.stopPropagation(),setTimeout((function(){dialogHelper.close(dlg)}),300),!1})),dlg.querySelector(".submitText").innerHTML=options.confirmText||globalize.translate("ButtonOk"),dlg.style.minWidth=Math.min(400,dom.getWindowSize().innerWidth-50)+"px",dialogHelper.open(dlg).then((function(){return layoutManager.tv&&scrollHelper.centerFocus.off(dlg.querySelector(".formDialogContent"),!1),submitValue||Promise.reject()}))}(options,template).then(resolve,reject)}))}))}}));