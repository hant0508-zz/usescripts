// ==UserScript==
// @name         Etarg ad remover
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Removes ad banners by etarg (use with Ublock Origin or Adblock Plus)
// @author       hant0508
// @include      *
// @grant        none
// ==/UserScript==

var snapResults;
var tries = 0;

function rem()
{
    for (var i = snapResults.snapshotLength - 1; i >= 0; i--)
    {
        var elm = snapResults.snapshotItem(i);
        elm.parentNode.removeChild(elm);
    }
}

function xpath()
{
    var regex = "/html/body//div[@onclick and ./table/tr/td/a[contains(@href, 'et-code.ru')]]";
    snapResults = document.evaluate(regex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    if (tries <= 20)
    {
        window.setTimeout(xpath,100);
        if (snapResults.snapshotLength !== 0) tries = 0;
        tries++;
    }

    rem();
}

xpath();