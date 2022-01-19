"use strict";
let displayTime;
let timerOn = false;
let theTimer = 0;
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
const owlBtn = document.querySelector(".alarm1");
const beepBtn = document.querySelector(".alarm2");

const timerArea = document.querySelector(".the-timer");
const timesUpSound1 = new Audio("sounds/sf_tawny_owl.mp3");
const timesUpSound2 = new Audio("sounds/alarm.ogg");
const tickingClock = new Audio("sounds/clock-1.wav");

owlBtn.addEventListener("click", () => {
    alarmChosen = 1;
    owlBtn.classList.add("alarm-chosen");
    beepBtn.classList.remove("alarm-chosen");
    if (voiceOn) document.getElementById("owl-alm").play();
});

beepBtn.addEventListener("click", () => {
    alarmChosen = 2;
    beepBtn.classList.add("alarm-chosen");
    owlBtn.classList.remove("alarm-chosen");
    if (voiceOn) document.getElementById("beep-alm").play();
});

voiceToggleBtn.addEventListener("click", () => {
    if (voiceOn) {
        if (voiceOn) document.getElementById("voice-off").play();
        voiceOn = false;
        voiceToggleBtn.textContent = "Turn Voice ON";
    } else {
        voiceOn = true;
        voiceToggleBtn.textContent = "Turn Voice OFF";
        if (voiceOn) document.getElementById("voice-on").play();
    }
});

timerBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        if (!inProgress) {
            theTimer = +e.target.className.split(" ")[0];
            if (voiceOn) document.getElementById(`${theTimer}-mins`).play();
            startTimer(theTimer);
        } else console.log("bad start");
    });
});

pauseBtn.addEventListener("click", () => {
    if (timerArea.textContent !== "00:00") {
        if (!pauseTimer && inProgress) {
            pauseTimer = true;
            if (voiceOn) document.getElementById("pause-on").play();
        } else {
            if (voiceOn) document.getElementById("pause-off").play();
            if (inProgress) startTimer(pausedMins, pausedSecs);
            pausedMins = null;
            pausedSecs = null;
        }
    } else console.log("bad pause");
});

resetBtn.addEventListener("click", () => {
    if (inProgress) {
        if (voiceOn) document.getElementById("reset").play();
        resetCount = true;
    }

    if (resetCount && inProgress) {
        startTimer(pausedMins, pausedSecs);
    }
});

customBtn.addEventListener("click", () => {
    if (!inProgress) {
        let customTime = prompt("Enter time (in mins):");
        if (Number.isInteger(+customTime)) {
            startTimer(+customTime);
        } else {
            alert("Not a valid number.");
        }
    } else console.log("bad custom");
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
