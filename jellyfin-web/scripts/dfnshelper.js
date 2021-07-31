define(["exports","date-fns/locale","globalize"],(function(_exports,_locale,_globalize){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.getLocale=getLocale,_exports.default=_exports.localeWithSuffix=void 0,_globalize=function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}(_globalize);function getLocale(){return function dateLocales(locale){return{ar:_locale.ar,"be-by":_locale.be,"bg-bg":_locale.bg,ca:_locale.ca,cs:_locale.cs,da:_locale.da,de:_locale.de,el:_locale.el,"en-gb":_locale.enGB,"en-us":_locale.enUS,es:_locale.es,"es-ar":_locale.es,"es-mx":_locale.es,fa:_locale.faIR,fi:_locale.fi,fr:_locale.fr,"fr-ca":_locale.frCA,gsw:_locale.de,he:_locale.he,"hi-in":_locale.hi,hr:_locale.hr,hu:_locale.hu,id:_locale.id,it:_locale.it,ja:_locale.ja,kk:_locale.kk,ko:_locale.ko,"lt-lt":_locale.lt,ms:_locale.ms,nb:_locale.nb,nl:_locale.nl,pl:_locale.pl,"pt-br":_locale.ptBR,"pt-pt":_locale.pt,ro:_locale.ro,ru:_locale.ru,sk:_locale.sk,"sl-si":_locale.sl,sv:_locale.sv,tr:_locale.tr,uk:_locale.uk,vi:_locale.vi,"zh-cn":_locale.zhCN,"zh-hk":_locale.zhCN,"zh-tw":_locale.zhTW}[locale]}(_globalize.default.getCurrentLocale())||_locale.enUS}var localeWithSuffix={addSuffix:!0,locale:getLocale()};_exports.localeWithSuffix=localeWithSuffix;var _default={getLocale:getLocale,localeWithSuffix:localeWithSuffix};_exports.default=_default}));