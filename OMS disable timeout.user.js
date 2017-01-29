// ==UserScript==
// @name         OMS disable timeout
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Disables 30 seconds timer and removes ad banners on ru.onlinemschool.com (use with Ublock Origin or Adblock Plus)
// @author       hant0508
// @include      http://ru.onlinemschool.com/*
// @grant        none
// @ran-at       document-idle
// ==/UserScript==

function f() {
  var path = "/html/body//div[@id and div [@style and (@onclick and img[@style]) or @style and div[@class and @style]] and @id != \"oms_r_center_2\"]";
  var ad = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if (ad.snapshotLength > 0) clearInterval(timer);
  oms.ads = true;

  for (var i = ad.snapshotLength - 1; i >= 0; i--){
    var elm = ad.snapshotItem(i);
    console.log(elm);
    elm.parentNode.removeChild(elm);
  }
}

var timer = window.setInterval(f, 50);
