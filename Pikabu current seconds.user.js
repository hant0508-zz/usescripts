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
    var comments = document.getElementsByClassName('b-comment__time');
    for (var i = 0; i < comments.length; ++i)
    {
        var time = now - comments[i].getAttribute('datetime');
        var sec = ' секунд';

        if (time % 100 < 10 || time % 100 > 20) {
            if (time % 10 == 1) sec += "a";
            else if (time % 10 < 5 && time % 10) sec += "ы";
        }
        
        sec += ' назад';
        comments[i].innerHTML += ' (' + time + sec + ')';
    }
}

window.setTimeout (setTime(Math.floor(Date.now()/1000)), 1000);
