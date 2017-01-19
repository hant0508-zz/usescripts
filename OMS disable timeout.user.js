// ==UserScript==
// @name         OMS disable timeout
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Disables 30 seconds timer on ru.onlinemschool.com (use with Ublock Origin or Adblock Plus)
// @author       hant0508
// @include      http://ru.onlinemschool.com/*
// @grant        none
// ==/UserScript==

window.setTimeout(function(){oms.ads = true;}, 1000);
