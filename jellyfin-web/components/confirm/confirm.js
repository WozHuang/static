"use strict";define(["browser","dialog","globalize"],(function(browser,dialog,globalize){return browser.tv&&window.confirm?function(options){"string"==typeof options&&(options={title:"",text:options});var text=function replaceAll(str,find,replace){return str.split(find).join(replace)}(options.text||"","<br/>","\n");return confirm(text)?Promise.resolve():Promise.reject()}:function(text,title){var options;options="string"==typeof text?{title:title,text:text}:text;var items=[];return items.push({name:options.cancelText||globalize.translate("ButtonCancel"),id:"cancel",type:"cancel"}),items.push({name:options.confirmText||globalize.translate("ButtonOk"),id:"ok",type:"delete"===options.primary?"delete":"submit"}),options.buttons=items,dialog(options).then((function(result){return"ok"===result?Promise.resolve():Promise.reject()}))}}));