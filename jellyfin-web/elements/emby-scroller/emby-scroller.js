"use strict";define(["scroller","dom","layoutManager","inputManager","focusManager","browser","webcomponents","css!./emby-scroller"],(function(scroller,dom,layoutManager,inputManager,focusManager,browser){var ScrollerPrototype=Object.create(HTMLDivElement.prototype);function onInputCommand(e){var cmd=e.detail.command;"end"===cmd?(focusManager.focusLast(this,"."+this.getAttribute("data-navcommands")),e.preventDefault(),e.stopPropagation()):"pageup"===cmd?(focusManager.moveFocus(e.target,this,"."+this.getAttribute("data-navcommands"),-12),e.preventDefault(),e.stopPropagation()):"pagedown"===cmd&&(focusManager.moveFocus(e.target,this,"."+this.getAttribute("data-navcommands"),12),e.preventDefault(),e.stopPropagation())}ScrollerPrototype.createdCallback=function(){this.classList.add("emby-scroller")},ScrollerPrototype.scrollToBeginning=function(){this.scroller&&this.scroller.slideTo(0,!0)},ScrollerPrototype.toStart=function(elem,immediate){this.scroller&&this.scroller.toStart(elem,immediate)},ScrollerPrototype.toCenter=function(elem,immediate){this.scroller&&this.scroller.toCenter(elem,immediate)},ScrollerPrototype.scrollToPosition=function(pos,immediate){this.scroller&&this.scroller.slideTo(pos,immediate)},ScrollerPrototype.getScrollPosition=function(){if(this.scroller)return this.scroller.getScrollPosition()},ScrollerPrototype.getScrollSize=function(){if(this.scroller)return this.scroller.getScrollSize()},ScrollerPrototype.getScrollEventName=function(){if(this.scroller)return this.scroller.getScrollEventName()},ScrollerPrototype.getScrollSlider=function(){if(this.scroller)return this.scroller.getScrollSlider()},ScrollerPrototype.addScrollEventListener=function(fn,options){this.scroller&&dom.addEventListener(this.scroller.getScrollFrame(),this.scroller.getScrollEventName(),fn,options)},ScrollerPrototype.removeScrollEventListener=function(fn,options){this.scroller&&dom.removeEventListener(this.scroller.getScrollFrame(),this.scroller.getScrollEventName(),fn,options)},ScrollerPrototype.attachedCallback=function(){this.getAttribute("data-navcommands")&&inputManager.on(this,onInputCommand);var horizontal="false"!==this.getAttribute("data-horizontal"),slider=this.querySelector(".scrollSlider");horizontal&&(slider.style["white-space"]="nowrap");var enableScrollButtons=layoutManager.desktop&&horizontal&&"false"!==this.getAttribute("data-scrollbuttons"),options={horizontal:horizontal,mouseDragging:1,mouseWheel:"false"!==this.getAttribute("data-mousewheel"),touchDragging:1,slidee:slider,scrollBy:200,speed:horizontal?270:240,elasticBounds:1,dragHandle:1,autoImmediate:!0,skipSlideToWhenVisible:"true"===this.getAttribute("data-skipfocuswhenvisible"),dispatchScrollEvent:enableScrollButtons||"true"===this.getAttribute("data-scrollevent"),hideScrollbar:enableScrollButtons||"true"===this.getAttribute("data-hidescrollbar"),allowNativeSmoothScroll:"true"===this.getAttribute("data-allownativesmoothscroll")&&!enableScrollButtons,allowNativeScroll:!enableScrollButtons,forceHideScrollbars:enableScrollButtons,requireAnimation:enableScrollButtons&&browser.edge};this.scroller=new scroller(this,options),this.scroller.init(),this.scroller.reload(),layoutManager.tv&&this.getAttribute("data-centerfocus")&&function initCenterFocus(elem,scrollerInstance){dom.addEventListener(elem,"focus",(function(e){var focused=focusManager.focusableParent(e.target);focused&&scrollerInstance.toCenter(focused)}),{capture:!0,passive:!0})}(this,this.scroller),enableScrollButtons&&function loadScrollButtons(scroller){require(["emby-scrollbuttons"],(function(){scroller.insertAdjacentHTML("beforebegin",'<div is="emby-scrollbuttons" class="emby-scrollbuttons padded-right"></div>')}))}(this)},ScrollerPrototype.pause=function(){var headroom=this.headroom;headroom&&headroom.pause()},ScrollerPrototype.resume=function(){var headroom=this.headroom;headroom&&headroom.resume()},ScrollerPrototype.detachedCallback=function(){this.getAttribute("data-navcommands")&&inputManager.off(this,onInputCommand);var headroom=this.headroom;headroom&&(headroom.destroy(),this.headroom=null);var scrollerInstance=this.scroller;scrollerInstance&&(scrollerInstance.destroy(),this.scroller=null)},document.registerElement("emby-scroller",{prototype:ScrollerPrototype,extends:"div"})}));