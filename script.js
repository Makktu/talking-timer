"use strict";
let displayTime = "00:00";
let timerOn = false;
let theTimer = 20;

const timers = [20, 25, 30, 35, 40];

const timerBtn = document.querySelectorAll(".timerBtn");
const resetBtn = document.querySelector(".reset");
const timerArea = document.querySelector(".the-timer");
const twentyMinsVoice = new Audio("sounds/20Minutes.wav");

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
    } else {
        startTimer(100);
    }
});

const startTimer = function (theTimer) {
    displayTime = "00:00";
    twentyMinsVoice.play();
    const theInterval = setInterval(function () {
        if (theTimer < 60) {
            displayTime = `00:${theTimer > 9 ? theTimer : "0" + theTimer}`;
        } else {
            // work out the minutes
            let minutes = (theTimer / 60 + "").split(".")[0];
            let seconds = (theTimer / 60 + "").split(".")[1];
            displayTime = `${minutes}:${seconds}`;
        }
        timerArea.textContent = displayTime;
        theTimer--;
        if (theTimer < 0) {
            clearInterval(theInterval);
            timerArea.textContent = "00:00";

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
