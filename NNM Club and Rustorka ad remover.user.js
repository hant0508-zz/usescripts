// ==UserScript==
// @name         NNM Club and Rustorka ad remover
// @namespace    http://tampermonkey.net/
// @version      1.0.3
// @description  Removes ad banners by marketgid/tovarro on nnmclub.to and rustorka.com (use with Ublock Origin or Adblock Plus)
// @author       hant0508
// @include      /^https?://nnmclub.to/*/
// @include      /^https?://nnm-club.to/*/
// @include      /^https?://nnm-club.me/*/
// @include      /^https?://rustorka.com/*/
// @grant        none
// ==/UserScript==

var tries = 0;
var snapResults = [];

function rem()
{
    for (var i = 0; i < snapResults.length; i++)
        for (var k = snapResults[i].snapshotLength - 1; k >= 0; k--)
        {
            var elm = snapResults[i].snapshotItem(k);
            elm.parentNode.removeChild(elm);
        }
}

function xpath()
{
    var time;
    var regex1 = "/html/body//div[@id!="body_container" and ./div/div/div/div/a[contains(@href, 'marketgid') or contains(@href, 'tovarro')]]";
    var regex2 = "/html/body/*[1 and .//a[contains(@href, 'bgrndi.com') or contains(@href, 'traforet.com')]]";
    var regex3 = "/html/body//div[@id=\"page_container\"]/div//opan[a]";
    var regex = [regex1, regex2, regex3];

    for (var i = 0; i < regex.length; i++)
        snapResults[i] = document.evaluate(regex[i], document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    if (tries <= 100) time = 200;
    else time = 1000;

    window.setTimeout (xpath,time);
    for (var i = 0; i < snapResults.length; i++)
        if (snapResults[i].snapshotLength)
        {
            tries = 0;
            break;
        }
    tries++;

    rem();
}

xpath();
