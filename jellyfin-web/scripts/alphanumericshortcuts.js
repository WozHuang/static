"use strict";define(["dom","focusManager"],(function(dom,focusManager){var inputDisplayElement,currentDisplayTextContainer,alpanumericShortcutTimeout,currentDisplayText="";function onKeyDown(e){if(!e.ctrlKey&&!e.shiftKey&&!e.altKey){var key=e.key,chr=key?function alphanumeric(value){return value.match(/^[0-9a-zA-Z]+$/)}(key):null;chr&&1===(chr=chr.toString().toUpperCase()).length&&(currentDisplayTextContainer=this.options.itemsContainer,function onAlphanumericKeyPress(e,chr){if(currentDisplayText.length>=3)return;(function ensureInputDisplayElement(){inputDisplayElement||((inputDisplayElement=document.createElement("div")).classList.add("alphanumeric-shortcut"),inputDisplayElement.classList.add("hide"),document.body.appendChild(inputDisplayElement))})(),currentDisplayText+=chr,inputDisplayElement.innerHTML=currentDisplayText,inputDisplayElement.classList.remove("hide"),function resetAlphaNumericShortcutTimeout(){clearAlphaNumericShortcutTimeout(),alpanumericShortcutTimeout=setTimeout(onAlphanumericShortcutTimeout,2e3)}()}(0,chr))}}function clearAlphaNumericShortcutTimeout(){alpanumericShortcutTimeout&&(clearTimeout(alpanumericShortcutTimeout),alpanumericShortcutTimeout=null)}function onAlphanumericShortcutTimeout(){var value=currentDisplayText,container=currentDisplayTextContainer;currentDisplayText="",currentDisplayTextContainer=null,inputDisplayElement.innerHTML="",inputDisplayElement.classList.add("hide"),clearAlphaNumericShortcutTimeout(),function selectByShortcutValue(container,value){var focusElem;"#"===(value=value.toUpperCase())&&(focusElem=container.querySelector("*[data-prefix]"));focusElem||(focusElem=container.querySelector("*[data-prefix^='"+value+"']"));focusElem&&focusManager.focus(focusElem)}(container,value)}function AlphaNumericShortcuts(options){this.options=options;var keyDownHandler=onKeyDown.bind(this);dom.addEventListener(window,"keydown",keyDownHandler,{passive:!0}),this.keyDownHandler=keyDownHandler}return AlphaNumericShortcuts.prototype.destroy=function(){var keyDownHandler=this.keyDownHandler;keyDownHandler&&(dom.removeEventListener(window,"keydown",keyDownHandler,{passive:!0}),this.keyDownHandler=null),this.options=null},AlphaNumericShortcuts}));