"use strict";define(["loading","libraryMenu","globalize","emby-checkbox","emby-select"],(function(loading,libraryMenu,globalize){function onSubmit(e){var form=this,localAddress=form.querySelector("#txtLocalAddress").value,enableUpnp=form.querySelector("#chkEnableUpnp").checked;!function confirmSelections(localAddress,enableUpnp,callback){localAddress||!enableUpnp?showAlertText({title:globalize.translate("TitleHostingSettings"),text:globalize.translate("SettingsWarning")}).then(callback):callback()}(localAddress,enableUpnp,(function(){var validationResult=function getValidationAlert(form){if(form.querySelector("#txtPublicPort").value===form.querySelector("#txtPublicHttpsPort").value)return"The public http and https ports must be different.";if(form.querySelector("#txtPortNumber").value===form.querySelector("#txtHttpsPort").value)return"The http and https ports must be different.";return null}(form);validationResult?showAlertText(validationResult):function validateHttps(form){var certPath=form.querySelector("#txtCertificatePath").value||null;if(form.querySelector("#chkEnableHttps").checked&&!certPath)return showAlertText({title:globalize.translate("TitleHostingSettings"),text:globalize.translate("HttpsRequiresCert")}).then(Promise.reject);return Promise.resolve()}(form).then((function(){loading.show(),ApiClient.getServerConfiguration().then((function(config){config.LocalNetworkSubnets=form.querySelector("#txtLanNetworks").value.split(",").map((function(s){return s.trim()})).filter((function(s){return s.length>0})),config.RemoteIPFilter=form.querySelector("#txtExternalAddressFilter").value.split(",").map((function(s){return s.trim()})).filter((function(s){return s.length>0})),config.IsRemoteIPFilterBlacklist="blacklist"===form.querySelector("#selectExternalAddressFilterMode").value,config.PublicPort=form.querySelector("#txtPublicPort").value,config.PublicHttpsPort=form.querySelector("#txtPublicHttpsPort").value,config.HttpServerPortNumber=form.querySelector("#txtPortNumber").value,config.HttpsPortNumber=form.querySelector("#txtHttpsPort").value,config.EnableHttps=form.querySelector("#chkEnableHttps").checked,config.RequireHttps=form.querySelector("#chkRequireHttps").checked,config.EnableUPnP=enableUpnp,config.BaseUrl=form.querySelector("#txtBaseUrl").value,config.EnableRemoteAccess=form.querySelector("#chkRemoteAccess").checked,config.CertificatePath=form.querySelector("#txtCertificatePath").value||null,config.CertificatePassword=form.querySelector("#txtCertPassword").value||null,config.LocalNetworkAddresses=localAddress?[localAddress]:[],ApiClient.updateServerConfiguration(config).then(Dashboard.processServerConfigurationUpdateResult,Dashboard.processErrorResponse)}))}))})),e.preventDefault()}function showAlertText(options){return new Promise((function(resolve,reject){require(["alert"],(function(alert){alert(options).then(resolve,reject)}))}))}return function(view,params){function loadPage(page,config){page.querySelector("#txtPortNumber").value=config.HttpServerPortNumber,page.querySelector("#txtPublicPort").value=config.PublicPort,page.querySelector("#txtPublicHttpsPort").value=config.PublicHttpsPort,page.querySelector("#txtLocalAddress").value=config.LocalNetworkAddresses[0]||"",page.querySelector("#txtLanNetworks").value=(config.LocalNetworkSubnets||[]).join(", "),page.querySelector("#txtExternalAddressFilter").value=(config.RemoteIPFilter||[]).join(", "),page.querySelector("#selectExternalAddressFilterMode").value=config.IsRemoteIPFilterBlacklist?"blacklist":"whitelist",page.querySelector("#chkRemoteAccess").checked=null==config.EnableRemoteAccess||config.EnableRemoteAccess,page.querySelector("#txtHttpsPort").value=config.HttpsPortNumber,page.querySelector("#chkEnableHttps").checked=config.EnableHttps,page.querySelector("#chkRequireHttps").checked=config.RequireHttps,page.querySelector("#txtBaseUrl").value=config.BaseUrl||"",page.querySelector("#txtCertificatePath").value=config.CertificatePath||"",page.querySelector("#txtCertPassword").value=config.CertificatePassword||"",page.querySelector("#chkEnableUpnp").checked=config.EnableUPnP,function triggerChange(select){var evt=document.createEvent("HTMLEvents");evt.initEvent("change",!1,!0),select.dispatchEvent(evt)}(page.querySelector("#chkRemoteAccess")),loading.hide()}view.querySelector("#chkRemoteAccess").addEventListener("change",(function(){this.checked?(view.querySelector(".fldExternalAddressFilter").classList.remove("hide"),view.querySelector(".fldExternalAddressFilterMode").classList.remove("hide"),view.querySelector(".fldPublicPort").classList.remove("hide"),view.querySelector(".fldPublicHttpsPort").classList.remove("hide"),view.querySelector(".fldEnableUpnp").classList.remove("hide")):(view.querySelector(".fldExternalAddressFilter").classList.add("hide"),view.querySelector(".fldExternalAddressFilterMode").classList.add("hide"),view.querySelector(".fldPublicPort").classList.add("hide"),view.querySelector(".fldPublicHttpsPort").classList.add("hide"),view.querySelector(".fldEnableUpnp").classList.add("hide"))})),view.querySelector("#btnSelectCertPath").addEventListener("click",(function(){require(["directorybrowser"],(function(directoryBrowser){var picker=new directoryBrowser;picker.show({includeFiles:!0,includeDirectories:!0,callback:function callback(path){path&&(view.querySelector("#txtCertificatePath").value=path),picker.close()},header:globalize.translate("HeaderSelectCertificatePath")})}))})),view.querySelector(".dashboardHostingForm").addEventListener("submit",onSubmit),view.addEventListener("viewshow",(function(e){loading.show(),ApiClient.getServerConfiguration().then((function(config){loadPage(view,config)}))}))}}));