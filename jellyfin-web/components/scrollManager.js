define(["exports","dom","browser","layoutManager"],(function(_exports,_dom,_browser,_layoutManager){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.isEnabled=isEnabled,_exports.scrollTo=scrollTo,_exports.scrollToElement=scrollToElement,_exports.default=void 0,_dom=_interopRequireDefault(_dom),_browser=_interopRequireDefault(_browser),_layoutManager=_interopRequireDefault(_layoutManager);var supportsSmoothScroll="scrollBehavior"in document.documentElement.style,supportsScrollToOptions=!1;try{var elem=document.createElement("div"),opts=Object.defineProperty({},"behavior",{get:function get(){supportsScrollToOptions=!0}});elem.scrollTo(opts)}catch(e){console.error("error checking ScrollToOptions support")}function clamp(value,min,max){return value<=min?min:value>=max?max:value}var scrollTimer,documentScroller=new(function(){function DocumentScroller(){!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,DocumentScroller)}return function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}(DocumentScroller,[{key:"getBoundingClientRect",value:function getBoundingClientRect(){return{left:0,top:0,width:this.clientWidth,height:this.clientHeight}}},{key:"scrollTo",value:function scrollTo(){window.scrollTo.apply(window,arguments)}},{key:"scrollLeft",get:function get(){return window.pageXOffset},set:function set(val){window.scroll(val,window.pageYOffset)}},{key:"scrollTop",get:function get(){return window.pageYOffset},set:function set(val){window.scroll(window.pageXOffset,val)}},{key:"scrollWidth",get:function get(){return Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)}},{key:"scrollHeight",get:function get(){return Math.max(document.documentElement.scrollHeight,document.body.scrollHeight)}},{key:"clientWidth",get:function get(){return Math.min(document.documentElement.clientWidth,document.body.clientWidth)}},{key:"clientHeight",get:function get(){return Math.min(document.documentElement.clientHeight,document.body.clientHeight)}}]),DocumentScroller}());function getScrollableParent(element,vertical){if(element){var nameScroll="scrollWidth",nameClient="clientWidth",nameClass="scrollX";vertical&&(nameScroll="scrollHeight",nameClient="clientHeight",nameClass="scrollY");for(var parent=element.parentElement;parent;){if(!parent.classList.contains("emby-scroller")&&parent[nameScroll]>parent[nameClient]&&parent.classList.contains(nameClass))return parent;parent=parent.parentElement}}return documentScroller}function getScrollerData(scroller,vertical){var data={};return vertical?(data.scrollPos=scroller.scrollTop,data.scrollSize=scroller.scrollHeight,data.clientSize=scroller.clientHeight):(data.scrollPos=scroller.scrollLeft,data.scrollSize=scroller.scrollWidth,data.clientSize=scroller.clientWidth),data}function getScrollerChildPos(scroller,element,vertical){var elementRect=element.getBoundingClientRect(),scrollerRect=scroller.getBoundingClientRect();return vertical?scroller.scrollTop+elementRect.top-scrollerRect.top:scroller.scrollLeft+elementRect.left-scrollerRect.left}function calcScroll(scrollerData,elementPos,elementSize,centered){var scroll,maxScroll=scrollerData.scrollSize-scrollerData.clientSize;if(centered)scroll=elementPos+(elementSize-scrollerData.clientSize)/2;else{var delta=function fitRange(begin1,end1,begin2,end2){var delta1=begin1-begin2,delta2=end2-end1;return delta1<0&&delta1<delta2?-delta1:delta2<0?delta2:0}(elementPos,elementPos+elementSize-1,scrollerData.scrollPos,scrollerData.scrollPos+scrollerData.clientSize-1);scroll=scrollerData.scrollPos-delta}return clamp(Math.round(scroll),0,maxScroll)}function scrollToHelper(scroller,options){if("scrollTo"in scroller)if(supportsScrollToOptions)scroller.scrollTo(options);else{var scrollX=void 0!==options.left?options.left:scroller.scrollLeft,scrollY=void 0!==options.top?options.top:scroller.scrollTop;scroller.scrollTo(scrollX,scrollY)}else"scrollLeft"in scroller&&(void 0!==options.left&&(scroller.scrollLeft=options.left),void 0!==options.top&&(scroller.scrollTop=options.top))}function builtinScroll(xScroller,scrollX,yScroller,scrollY,smooth){var scrollBehavior=smooth?"smooth":"instant";xScroller!==yScroller?(scrollToHelper(xScroller,{left:scrollX,behavior:scrollBehavior}),scrollToHelper(yScroller,{top:scrollY,behavior:scrollBehavior})):scrollToHelper(xScroller,{left:scrollX,top:scrollY,behavior:scrollBehavior})}function resetScrollTimer(){cancelAnimationFrame(scrollTimer),scrollTimer=void 0}function doScroll(xScroller,scrollX,yScroller,scrollY,smooth){resetScrollTimer(),smooth&&function useAnimatedScroll(){return!supportsSmoothScroll}()?function animateScroll(xScroller,scrollX,yScroller,scrollY){var start,ox=xScroller.scrollLeft,oy=yScroller.scrollTop,dx=scrollX-ox,dy=scrollY-oy;Math.abs(dx)<1e-6&&Math.abs(dy)<1e-6||(scrollTimer=requestAnimationFrame((function scrollAnim(currentTimestamp){start=start||currentTimestamp;var k=Math.min(1,(currentTimestamp-start)/270);if(1===k)return resetScrollTimer(),void builtinScroll(xScroller,scrollX,yScroller,scrollY,!1);k=function ease(t){return t*(2-t)}(k),builtinScroll(xScroller,ox+dx*k,yScroller,oy+dy*k,!1),scrollTimer=requestAnimationFrame(scrollAnim)})))}(xScroller,scrollX,yScroller,scrollY):builtinScroll(xScroller,scrollX,yScroller,scrollY,smooth)}function isEnabled(){return _layoutManager.default.tv}function scrollTo(scrollX,scrollY,smooth){smooth=!!smooth;var scroller=getScrollableParent(null,!1),xScrollerData=getScrollerData(scroller,!1),yScrollerData=getScrollerData(scroller,!0);doScroll(scroller,scrollX=clamp(Math.round(scrollX),0,xScrollerData.scrollSize-xScrollerData.clientSize),scroller,scrollY=clamp(Math.round(scrollY),0,yScrollerData.scrollSize-yScrollerData.clientSize),smooth)}function scrollToElement(element,smooth){smooth=!!smooth;var scrollCenterX=!0,scrollCenterY=!0,offsetParent=element.offsetParent,isFixed=offsetParent&&(!offsetParent.offsetParent||"fixed"===window.getComputedStyle(offsetParent).position);isFixed&&(scrollCenterX=scrollCenterY=!1);var xScroller=getScrollableParent(element,!1),yScroller=getScrollableParent(element,!0),elementRect=element.getBoundingClientRect(),xScrollerData=getScrollerData(xScroller,!1),yScrollerData=getScrollerData(yScroller,!0),xPos=getScrollerChildPos(xScroller,element,!1),yPos=getScrollerChildPos(yScroller,element,!0),scrollX=calcScroll(xScrollerData,xPos,elementRect.width,scrollCenterX),scrollY=calcScroll(yScrollerData,yPos,elementRect.height,scrollCenterY);isFixed&&elementRect.bottom<0&&(scrollY=0),scrollY<function minimumScrollY(){var topMenu=document.querySelector(".headerTop");return topMenu?topMenu.clientHeight:0}()&&yScroller===documentScroller&&(scrollY=0),doScroll(xScroller,scrollX,yScroller,scrollY,smooth)}isEnabled()&&_dom.default.addEventListener(window,"focusin",(function(e){setTimeout((function(){scrollToElement(e.target,function useSmoothScroll(){return!!_browser.default.tizen}())}),0)}),{capture:!0});var _default={isEnabled:isEnabled,scrollTo:scrollTo,scrollToElement:scrollToElement};_exports.default=_default}));