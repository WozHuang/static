"use strict";define(["jQuery","datetime","loading","libraryMenu","globalize","listViewStyle","paper-icon-button-light"],(function($,datetime,loading,libraryMenu,globalize){function loadUser(page,user,allParentalRatings){page.querySelector(".username").innerHTML=user.Name,libraryMenu.setTitle(user.Name),function loadUnratedItems(page,user){var items=[{name:globalize.translate("OptionBlockBooks"),value:"Book"},{name:globalize.translate("OptionBlockChannelContent"),value:"ChannelContent"},{name:globalize.translate("OptionBlockLiveTvChannels"),value:"LiveTvChannel"},{name:globalize.translate("OptionBlockMovies"),value:"Movie"},{name:globalize.translate("OptionBlockMusic"),value:"Music"},{name:globalize.translate("OptionBlockTrailers"),value:"Trailer"},{name:globalize.translate("OptionBlockTvShows"),value:"Series"}],html="";html+='<h3 class="checkboxListLabel">'+globalize.translate("HeaderBlockItemsWithNoRating")+"</h3>",html+='<div class="checkboxList paperList checkboxList-paperList">';for(var i=0,length=items.length;i<length;i++){var item=items[i],checkedAttribute=-1!=user.Policy.BlockUnratedItems.indexOf(item.value)?' checked="checked"':"";html+='<label><input type="checkbox" is="emby-checkbox" class="chkUnratedItem" data-itemtype="'+item.value+'" type="checkbox"'+checkedAttribute+"><span>"+item.name+"</span></label>"}html+="</div>",$(".blockUnratedItems",page).html(html).trigger("create")}(page,user),loadBlockedTags(page,user.Policy.BlockedTags),function populateRatings(allParentalRatings,page){var i,length,rating,html="";html+="<option value=''></option>";var ratings=[];for(i=0,length=allParentalRatings.length;i<length;i++){if(rating=allParentalRatings[i],ratings.length){var lastRating=ratings[ratings.length-1];if(lastRating.Value===rating.Value){lastRating.Name+="/"+rating.Name;continue}}ratings.push({Name:rating.Name,Value:rating.Value})}for(i=0,length=ratings.length;i<length;i++)html+="<option value='"+(rating=ratings[i]).Value+"'>"+rating.Name+"</option>";$("#selectMaxParentalRating",page).html(html)}(allParentalRatings,page);var ratingValue="";if(user.Policy.MaxParentalRating)for(var i=0,length=allParentalRatings.length;i<length;i++){var rating=allParentalRatings[i];user.Policy.MaxParentalRating>=rating.Value&&(ratingValue=rating.Value)}$("#selectMaxParentalRating",page).val(ratingValue),user.Policy.IsAdministrator?$(".accessScheduleSection",page).hide():$(".accessScheduleSection",page).show(),renderAccessSchedule(page,user.Policy.AccessSchedules||[]),loading.hide()}function loadBlockedTags(page,tags){var html=tags.map((function(h){var li='<div class="listItem">';return li+='<div class="listItemBody">',li+='<h3 class="listItemBodyText">',li+=h,li+="</h3>",li+="</div>",(li+='<button type="button" is="paper-icon-button-light" class="blockedTag btnDeleteTag listItemButton" data-tag="'+h+'"><span class="material-icons delete"></span></button>')+"</div>"})).join("");html&&(html='<div class="paperList">'+html+"</div>");var elem=$(".blockedTags",page).html(html).trigger("create");$(".btnDeleteTag",elem).on("click",(function(){var tag=this.getAttribute("data-tag"),newTags=tags.filter((function(t){return t!=tag}));loadBlockedTags(page,newTags)}))}function renderAccessSchedule(page,schedules){var html="",index=0;html+=schedules.map((function(a){var itemHtml="";return itemHtml+='<div class="liSchedule listItem" data-day="'+a.DayOfWeek+'" data-start="'+a.StartHour+'" data-end="'+a.EndHour+'">',itemHtml+='<div class="listItemBody two-line">',itemHtml+='<h3 class="listItemBodyText">',itemHtml+=globalize.translate("Option"+a.DayOfWeek),itemHtml+="</h3>",itemHtml+='<div class="listItemBodyText secondary">'+getDisplayTime(a.StartHour)+" - "+getDisplayTime(a.EndHour)+"</div>",itemHtml+="</div>",itemHtml+='<button type="button" is="paper-icon-button-light" class="btnDelete listItemButton" data-index="'+index+'"><span class="material-icons delete"></span></button>',index++,itemHtml+="</div>"})).join("");var accessScheduleList=page.querySelector(".accessScheduleList");accessScheduleList.innerHTML=html,$(".btnDelete",accessScheduleList).on("click",(function(){!function deleteAccessSchedule(page,schedules,index){schedules.splice(index,1),renderAccessSchedule(page,schedules)}(page,schedules,parseInt(this.getAttribute("data-index")))}))}function saveUser(user,page){user.Policy.MaxParentalRating=$("#selectMaxParentalRating",page).val()||null,user.Policy.BlockUnratedItems=$(".chkUnratedItem",page).get().filter((function(i){return i.checked})).map((function(i){return i.getAttribute("data-itemtype")})),user.Policy.AccessSchedules=getSchedulesFromPage(page),user.Policy.BlockedTags=getBlockedTagsFromPage(page),ApiClient.updateUserPolicy(user.Id,user.Policy).then((function(){!function onSaveComplete(page){loading.hide(),require(["toast"],(function(toast){toast(globalize.translate("SettingsSaved"))}))}()}))}function getDisplayTime(hours){var minutes=0,pct=hours%1;return pct&&(minutes=parseInt(60*pct)),datetime.getDisplayTime(new Date(2e3,1,1,hours,minutes,0,0))}function getSchedulesFromPage(page){return $(".liSchedule",page).map((function(){return{DayOfWeek:this.getAttribute("data-day"),StartHour:this.getAttribute("data-start"),EndHour:this.getAttribute("data-end")}})).get()}function getBlockedTagsFromPage(page){return $(".blockedTag",page).map((function(){return this.getAttribute("data-tag")})).get()}window.UserParentalControlPage={onSubmit:function onSubmit(){var page=$(this).parents(".page");loading.show();var userId=getParameterByName("userId");return ApiClient.getUser(userId).then((function(result){saveUser(result,page)})),!1}},$(document).on("pageinit","#userParentalControlPage",(function(){var page=this;$(".btnAddSchedule",page).on("click",(function(){!function showSchedulePopup(page,schedule,index){schedule=schedule||{},require(["components/accessSchedule/accessSchedule"],(function(accessschedule){accessschedule.show({schedule:schedule}).then((function(updatedSchedule){var schedules=getSchedulesFromPage(page);-1==index&&(index=schedules.length),schedules[index]=updatedSchedule,renderAccessSchedule(page,schedules)}))}))}(page,{},-1)})),$(".btnAddBlockedTag",page).on("click",(function(){!function showBlockedTagPopup(page){require(["prompt"],(function(prompt){prompt({label:globalize.translate("LabelTag")}).then((function(value){var tags=getBlockedTagsFromPage(page);-1==tags.indexOf(value)&&(tags.push(value),loadBlockedTags(page,tags))}))}))}(page)})),$(".userParentalControlForm").off("submit",UserParentalControlPage.onSubmit).on("submit",UserParentalControlPage.onSubmit)})).on("pageshow","#userParentalControlPage",(function(){var page=this;loading.show();var userId=getParameterByName("userId"),promise1=ApiClient.getUser(userId),promise2=ApiClient.getParentalRatings();Promise.all([promise1,promise2]).then((function(responses){loadUser(page,responses[0],responses[1])}))}))}));