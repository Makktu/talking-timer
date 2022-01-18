"use strict";
let displayTime = "00:00";
let timerOn = false;
let theTimer = 0;
let theMins = 0;
let theSecs = 0;
let pausedMins;
let pausedSecs;
let isItZeroYet;
let secs;
let resetCount = false;

let alarmChosen = 1;

let voiceOn = true;
let pauseTimer = false;

let inProgress = false;

const timerBtn = document.querySelectorAll(".timerBtn");
const resetBtn = document.querySelector(".reset");
const voiceToggleBtn = document.querySelector(".voice-toggle");
const pauseBtn = document.querySelector(".pause");
const customBtn = document.querySelector(".custom");

const timerArea = document.querySelector(".the-timer");
const timesUpSound1 = new Audio("sounds/sf_tawny_owl.mp3");
const timesUpSound2 = new Audio("sounds/alarm.ogg");
const tickingClock = new Audio("sounds/clock-1.wav");

const owlBtn = document.querySelector(".alarm1");
const beepBtn = document.querySelector(".alarm2");

owlBtn.addEventListener("click", () => {
    alarmChosen = 1;
    owlBtn.classList.add("alarm-chosen");
    beepBtn.classList.remove("alarm-chosen");
});
beepBtn.addEventListener("click", () => {
    alarmChosen = 2;
    beepBtn.classList.add("alarm-chosen");
    owlBtn.classList.remove("alarm-chosen");
});

voiceToggleBtn.addEventListener("click", () => {
    if (voiceOn) {
        voiceOn = false;
        voiceToggleBtn.textContent = "Turn Voice ON";
    } else {
        voiceOn = true;
        voiceToggleBtn.textContent = "Turn Voice OFF";
    }
});

timerBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        theTimer = +e.target.className.split(" ")[0];
        if (voiceOn) document.getElementById(`${theTimer}-mins`).play();
        startTimer(theTimer);
    });
});

pauseBtn.addEventListener("click", () => {
    if (!pauseTimer && inProgress) {
        pauseTimer = true;
    } else {
        pauseTimer = false;
        if (inProgress) startTimer(pausedMins, pausedSecs);
        pausedMins = null;
        pausedSecs = null;
    }
});

resetBtn.addEventListener("click", () => {
    if (inProgress) {
        resetCount = true;
    }
});

customBtn.addEventListener("click", () => {
    let customTime = prompt("Enter time (in mins):");
    if (Number.isInteger(+customTime)) {
        startTimer(+customTime);
    } else {
        alert("Not a valid number.");
    }
});

const startTimer = function (theTimer, secs) {
    if (pauseTimer) {
        pauseTimer = false;
        isItZeroYet = theTimer * 60 + secs;
    } else {
        isItZeroYet = theTimer * 60;
        secs = 0;
    }

    inProgress = true;
    const countdownClock = setInterval(function () {
        timerArea.textContent = `${theTimer > 9 ? theTimer : "0" + theTimer}:${
            secs > 9 ? secs : "0" + secs
        }`;

        if (secs == 0) {
            theTimer--;
            secs = 59;
        } else {
            secs--;
        }

        isItZeroYet--;

        if (isItZeroYet < 0) {
            clearInterval(countdownClock);
            displayTime = "00:00";
            timerArea.textContent = displayTime;
            if (alarmChosen == 1) {
                timesUpSound1.play();
            } else {
                timesUpSound2.play();
            }
        }

        if (isItZeroYet == 6) {
            tickingClock.play();
        }
        if (pauseTimer) {
            pausedMins = theTimer;
            pausedSecs = secs;

            clearInterval(countdownClock);
        }

        if (resetCount) {
            pausedMins = null;
            pausedSecs = null;
            inProgress = false;
            displayTime = "00:00";
            timerArea.textContent = displayTime;
            resetCount = false;
            clearInterval(countdownClock);
        }
    }, 1000);
};
