"use strict";define((function(){var requireCss={normalize:function(name,normalize){return".css"===name.substr(name.length-4,4)&&(name=name.substr(0,name.length-4)),normalize(name)}},importedCss=[];return requireCss.load=function(cssId,req,load,config){var srch="components/require/requirecss",index=cssId.indexOf(srch);-1!==index&&(cssId="css"+cssId.substring(index+srch.length));var url=cssId+".css";if(-1===url.indexOf("://")&&(url=config.baseUrl+url),function isLoaded(url){return-1!==importedCss.indexOf(url)}(url))load();else{importedCss.push(url);var link=document.createElement("link");link.setAttribute("rel","stylesheet"),link.setAttribute("type","text/css"),link.onload=load;var linkUrl=url;config.urlArgs&&(linkUrl+=config.urlArgs(cssId,url)),link.setAttribute("href",linkUrl),document.head.appendChild(link)}},window.requireCss={removeStylesheet:function removeStylesheet(stylesheet){stylesheet.parentNode.removeChild(stylesheet),function removeFromLoadHistory(url){url=url.toLowerCase(),importedCss=importedCss.filter((function(c){return-1===url.indexOf(c.toLowerCase())}))}(stylesheet.href)}},requireCss}));