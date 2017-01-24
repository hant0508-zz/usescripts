// ==UserScript==
// @name         Pikabu current seconds
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Сколько прошло секунд?
// @author       hant0508
// @match        http://pikabu.ru/story/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

function setTime(now) {
    for (var i = 0; i < comments.length; ++i)
    {
        var time = now - seconds[i];
        var sec = ' секунд';

        if (time % 100 < 10 || time % 100 > 20) {
            if (time % 10 == 1) sec += "a";
            else if (time % 10 < 5 && time % 10) sec += "ы";
        }
        
        sec += ' назад';
        comments[i].firstChild.innerHTML = ' (' + time + sec + ')';
    }
    window.setTimeout (setTime(Math.floor(Date.now()/1000)), 1000);
}

var seconds = [];
var comments = document.getElementsByClassName('b-comment__time');
var span = document.createElement('span');
for (var i = 0; i < comments.length; ++i)
{
    seconds[i] = comments[i].getAttribute('datetime');
    comments[i].appendChild(span);
}

setTime(Math.floor(Date.now()/1000));
