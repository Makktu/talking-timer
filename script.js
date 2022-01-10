"use strict";
let timerOn = false;
let theTimer = 20;

const timers = [20, 25, 30, 35, 40];

const timerBtn = document.querySelectorAll(".timerBtn");
const resetBtn = document.querySelector(".reset");

timerBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        theTimer = +e.target.className.split(" ")[0];
        if (!timerOn) {
            timerOn = true;
            startTimer(theTimer);
        }
    });
});

resetBtn.addEventListener("click", () => {
    if (timerOn) {
        console.log("timer stopped");
    }
});

const startTimer = function (theTimer) {
    const theInterval = setInterval(function () {
        console.log(theTimer);
        theTimer--;
        if (theTimer < 0) {
            clearInterval(theInterval);
            timerOn = false;
            console.log("time's up");
        }
    }, 1000);
    // for (let j = 0; j < theTimer + 1; j++) {
    //     console.log(theTimer);
    //     // setTimeout(function () {}, 1000);
    //     // await new Promise((r) => setTimeout(r, 1000));
    // }
    // ! hello Monday John
    // ! isn't it scary
    // ! how the circle tightens
    // ! FIX THE TIMER
    // ! lov from Sunday John x
};

const printTime = function (secs) {
    console.log(secs);
};
