define(["exports"],(function(_exports){"use strict";var data;Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.enableMultiServer=function enableMultiServer(){return function getConfig(){return data?Promise.resolve(data):fetch("config.json?nocache="+(new Date).getUTCMilliseconds()).then((function(response){return data=response.json()})).catch((function(error){return console.warn("web config file is missing so the template will be used"),function getDefaultConfig(){return fetch("config.template.json").then((function(response){return data=response.json()}))}()}))}().then((function(config){return config.multiserver})).catch((function(error){return console.log("cannot get web config:",error),!1}))}}));