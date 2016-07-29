// ==UserScript==
// @name         NNM Club and Rustorka ad remover
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Removes ad banners by marketgid/tovarro on nnmclub.to and rustorka.com (use with Ublock Origin or Adblock Plus)
// @author       hant0508
// @include      /^https?://nnmclub.to/*/
// @include      /^https?://nnm-club.to/*/
// @include      /^https?://nnm-club.me/*/
// @include      /^https?://rustorka.com/*/
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
    var regex = "/html/body//div[./div/div/div/div/a[contains(@href, 'marketgid') or contains(@href, 'tovarro')]]";
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
