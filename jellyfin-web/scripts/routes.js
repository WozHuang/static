"use strict";define(["jQuery","emby-button","emby-input","scripts/livetvcomponents","paper-icon-button-light","emby-itemscontainer","emby-collapse","emby-select","livetvcss","emby-checkbox","emby-slider","listViewStyle","dashboardcss","detailtablecss"],(function(){function defineRoute(newRoute){var path=newRoute.alias?newRoute.alias:newRoute.path;console.debug("defining route: "+path),newRoute.dictionary="core",Emby.Page.addRoute(path,newRoute)}console.debug("defining core routes"),defineRoute({path:"/addserver.html",autoFocus:!1,anonymous:!0,startup:!0,controller:"auth/addserver"}),defineRoute({path:"/selectserver.html",autoFocus:!1,anonymous:!0,startup:!0,controller:"auth/selectserver",type:"selectserver"}),defineRoute({path:"/login.html",autoFocus:!1,anonymous:!0,startup:!0,controller:"auth/login",type:"login"}),defineRoute({path:"/forgotpassword.html",anonymous:!0,startup:!0,controller:"auth/forgotpassword"}),defineRoute({path:"/forgotpasswordpin.html",autoFocus:!1,anonymous:!0,startup:!0,controller:"auth/forgotpasswordpin"}),defineRoute({path:"/mypreferencesmenu.html",autoFocus:!1,transition:"fade",controller:"user/menu"}),defineRoute({path:"/myprofile.html",autoFocus:!1,transition:"fade",controller:"user/profile"}),defineRoute({path:"/mypreferencesdisplay.html",autoFocus:!1,transition:"fade",controller:"user/display"}),defineRoute({path:"/mypreferenceshome.html",autoFocus:!1,transition:"fade",controller:"user/home"}),defineRoute({path:"/mypreferencesplayback.html",autoFocus:!1,transition:"fade",controller:"user/playback"}),defineRoute({path:"/mypreferencessubtitles.html",autoFocus:!1,transition:"fade",controller:"user/subtitles"}),defineRoute({path:"/dashboard.html",autoFocus:!1,roles:"admin",controller:"dashboard/dashboard"}),defineRoute({path:"/dashboardgeneral.html",controller:"dashboard/general",autoFocus:!1,roles:"admin"}),defineRoute({path:"/networking.html",autoFocus:!1,roles:"admin",controller:"dashboard/networking"}),defineRoute({path:"/devices.html",autoFocus:!1,roles:"admin",controller:"dashboard/devices/devices"}),defineRoute({path:"/device.html",autoFocus:!1,roles:"admin",controller:"dashboard/devices/device"}),defineRoute({path:"/dlnaprofile.html",autoFocus:!1,roles:"admin",controller:"dashboard/dlna/profile"}),defineRoute({path:"/dlnaprofiles.html",autoFocus:!1,roles:"admin",controller:"dashboard/dlna/profiles"}),defineRoute({path:"/addplugin.html",autoFocus:!1,roles:"admin",controller:"dashboard/plugins/add"}),defineRoute({path:"/library.html",autoFocus:!1,roles:"admin",controller:"dashboard/mediaLibrary"}),defineRoute({path:"/librarydisplay.html",autoFocus:!1,roles:"admin",controller:"dashboard/librarydisplay"}),defineRoute({path:"/dlnasettings.html",autoFocus:!1,roles:"admin",controller:"dashboard/dlna/settings"}),defineRoute({path:"/edititemmetadata.html",controller:"edititemmetadata",autoFocus:!1}),defineRoute({path:"/encodingsettings.html",autoFocus:!1,roles:"admin",controller:"dashboard/encodingsettings"}),defineRoute({path:"/log.html",roles:"admin",controller:"dashboard/logs"}),defineRoute({path:"/metadataimages.html",autoFocus:!1,roles:"admin",controller:"dashboard/metadataImages"}),defineRoute({path:"/metadatanfo.html",autoFocus:!1,roles:"admin",controller:"dashboard/metadatanfo"}),defineRoute({path:"/notificationsetting.html",autoFocus:!1,roles:"admin",controller:"dashboard/notifications/notification"}),defineRoute({path:"/notificationsettings.html",controller:"dashboard/notifications/notifications",autoFocus:!1,roles:"admin"}),defineRoute({path:"/playbackconfiguration.html",autoFocus:!1,roles:"admin",controller:"dashboard/playback"}),defineRoute({path:"/availableplugins.html",autoFocus:!1,roles:"admin",controller:"dashboard/plugins/available"}),defineRoute({path:"/repositories.html",autoFocus:!1,roles:"admin",controller:"dashboard/plugins/repositories"}),defineRoute({path:"/home.html",autoFocus:!1,controller:"home",transition:"fade",type:"home"}),defineRoute({path:"/search.html",controller:"searchpage"}),defineRoute({path:"/list.html",autoFocus:!1,controller:"list",transition:"fade"}),defineRoute({alias:"/details",path:"/controllers/itemDetails/index.html",controller:"itemDetails/index",autoFocus:!1,transition:"fade"}),defineRoute({path:"/livetv.html",controller:"livetv/livetvsuggested",autoFocus:!1,transition:"fade"}),defineRoute({path:"/livetvguideprovider.html",autoFocus:!1,roles:"admin",controller:"livetvguideprovider"}),defineRoute({path:"/livetvsettings.html",autoFocus:!1,controller:"livetvsettings"}),defineRoute({path:"/livetvstatus.html",autoFocus:!1,roles:"admin",controller:"livetvstatus"}),defineRoute({path:"/livetvtuner.html",autoFocus:!1,roles:"admin",controller:"livetvtuner"}),defineRoute({path:"/movies.html",autoFocus:!1,controller:"movies/moviesrecommended",transition:"fade"}),defineRoute({path:"/music.html",controller:"music/musicrecommended",autoFocus:!1,transition:"fade"}),defineRoute({path:"/installedplugins.html",autoFocus:!1,roles:"admin",controller:"dashboard/plugins/installed"}),defineRoute({path:"/scheduledtask.html",autoFocus:!1,roles:"admin",controller:"dashboard/scheduledtasks/scheduledtask"}),defineRoute({path:"/scheduledtasks.html",autoFocus:!1,roles:"admin",controller:"dashboard/scheduledtasks/scheduledtasks"}),defineRoute({path:"/serveractivity.html",autoFocus:!1,roles:"admin",controller:"dashboard/serveractivity"}),defineRoute({path:"/apikeys.html",autoFocus:!1,roles:"admin",controller:"dashboard/apikeys"}),defineRoute({path:"/streamingsettings.html",autoFocus:!1,roles:"admin",controller:"dashboard/streaming"}),defineRoute({path:"/tv.html",autoFocus:!1,controller:"shows/tvrecommended",transition:"fade"}),defineRoute({path:"/useredit.html",autoFocus:!1,roles:"admin",controller:"dashboard/users/useredit"}),defineRoute({path:"/userlibraryaccess.html",autoFocus:!1,roles:"admin",controller:"dashboard/users/userlibraryaccess"}),defineRoute({path:"/usernew.html",autoFocus:!1,roles:"admin",controller:"dashboard/users/usernew"}),defineRoute({path:"/userparentalcontrol.html",autoFocus:!1,roles:"admin",controller:"dashboard/users/userparentalcontrol"}),defineRoute({path:"/userpassword.html",autoFocus:!1,controller:"dashboard/users/userpasswordpage"}),defineRoute({path:"/userprofiles.html",autoFocus:!1,roles:"admin",controller:"dashboard/users/userprofilespage"}),defineRoute({path:"/wizardremoteaccess.html",autoFocus:!1,anonymous:!0,controller:"wizard/remoteaccess"}),defineRoute({path:"/wizardfinish.html",autoFocus:!1,anonymous:!0,controller:"wizard/finish"}),defineRoute({path:"/wizardlibrary.html",autoFocus:!1,anonymous:!0,controller:"dashboard/mediaLibrary"}),defineRoute({path:"/wizardsettings.html",autoFocus:!1,anonymous:!0,controller:"wizard/settings"}),defineRoute({path:"/wizardstart.html",autoFocus:!1,anonymous:!0,controller:"wizard/start"}),defineRoute({path:"/wizarduser.html",controller:"wizard/user",autoFocus:!1,anonymous:!0}),defineRoute({path:"/videoosd.html",transition:"fade",controller:"playback/videoosd",autoFocus:!1,type:"video-osd",supportsThemeMedia:!0,fullscreen:!0,enableMediaControl:!1}),defineRoute({path:"/nowplaying.html",controller:"playback/nowplaying",autoFocus:!1,transition:"fade",fullscreen:!0,supportsThemeMedia:!0,enableMediaControl:!1}),defineRoute({path:"/configurationpage",autoFocus:!1,enableCache:!1,enableContentQueryString:!0,roles:"admin"}),defineRoute({path:"/",isDefaultRoute:!0,autoFocus:!1}),defineRoute({path:"/index.html",autoFocus:!1,isDefaultRoute:!0})}));