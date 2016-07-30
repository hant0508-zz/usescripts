// ==UserScript==
// @name         NNM Club and Rustorka ad remover
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Removes ad banners by marketgid/tovarro on nnmclub.to and rustorka.com (use with Ublock Origin or Adblock Plus)
// @author       hant0508
// @include      /^https?://nnmclub.to/*/
// @include      /^https?://nnm-club.to/*/
// @include      /^https?://nnm-club.me/*/
// @include      /^https?://rustorka.com/*/
// @grant        none
// ==/UserScript==

var snapResults1;
var snapResults2;
var tries = 0;

function rem()
{
    for (var i = snapResults1.snapshotLength - 1; i >= 0; i--)
    {
        var elm = snapResults1.snapshotItem(i);
        elm.parentNode.removeChild(elm);
    }

    for (var i = snapResults2.snapshotLength - 1; i >= 0; i--)
    {
        var elm = snapResults2.snapshotItem(i);
        elm.parentNode.removeChild(elm);
    }

    for (var i = snapResults3.snapshotLength - 1; i >= 0; i--)
    {
        var elm = snapResults3.snapshotItem(i);
        elm.parentNode.removeChild(elm);
    }
}

function xpath()
{
    var time;
    var regex1 = "/html/body//div[./div/div/div/div/a[contains(@href, 'marketgid') or contains(@href, 'tovarro')]]";
    var regex2 = "/html/body/*[1 and .//a[contains(@href, 'bgrndi.com') or contains(@href, 'traforet.com')]]";
    var regex3 = "/html/body//div[@id=\"page_container\"]/div//opan[a]";
    snapResults1 = document.evaluate(regex1, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    snapResults2 = document.evaluate(regex2, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    snapResults3 = document.evaluate(regex3, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    if (tries <= 100) time = 200;
    else time = 1000;

    window.setTimeout(xpath,time);
    if (snapResults1.snapshotLength !== 0 || snapResults2.snapshotLength !== 0 || snapResults3.snapshotLength !== 0) tries = 0;
    tries++;
    console.log(tries);

    rem();
}

xpath();
