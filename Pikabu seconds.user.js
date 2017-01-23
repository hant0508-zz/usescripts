// ==UserScript==
// @name         Pikabu seconds
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Сколько секунд?
// @author       hant0508
// @match        http://pikabu.ru/story/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

function getTime() {
    var post = document.getElementsByClassName('story__date')[0];
    if (post === undefined)
    {
        window.setTimeout(getTime, 1);
        return;
    }
    console.log(post.title);
    window.addEventListener('load', setTime(post.title), false);
}

function setTime(postTime) {
    var comments = document.getElementsByClassName('b-comment__time');
    for (var i = 0; i < comments.length; ++i)
    {
        var time = comments[i].getAttribute('datetime') - postTime;
        var sec = ' секунд';

        if (time % 100 < 10 || time % 100 > 20) {
            if (time % 10 == 1) sec += "a";
            else if (time % 10 < 5 && time % 10) sec += "ы";
        }
        comments[i].innerHTML += ' (' + time + sec + ')';
    }
}

getTime();
