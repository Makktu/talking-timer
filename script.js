"use strict";
// ! convert 'the timer' variable into mins and secs and do a custom algorithm

// 20 mins 0 secs
// 19 mins 59
// 19 min 58..
// if secs = 59 mins--
// if mins = -1 stop times up etc

let displayTime = "00:00";
let timerOn = false;
let theTimer = 0;
let theMins = 0;
let theSecs = 0;

let alarmChosen = 1;

const timerBtn = document.querySelectorAll(".timerBtn");
const resetBtn = document.querySelector(".reset");
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

timerBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        theTimer = +e.target.className.split(" ")[0];

        console.log(theTimer);
        theMins = theTimer;

        document.getElementById(`${theTimer}-mins`).play();
        startTimer(theTimer);
    });
});

// resetBtn.addEventListener("click", () => {
//     if (timerOn) {
//         console.log("timer stopped");
//         stopTimer();
//     } else {
//         startTimer(100);
//     }
// });

const startTimer = function (theTimer) {
    const countdownClock = setInterval(function () {
        timerArea.textContent = `${theMins}m ${theTimer}s`;

        theTimer--;
        console.log(theTimer);
        if (theTimer == 2 || theTimer == 4 || theTimer == 6) {
            tickingClock.play();
        }
        if (theTimer < 0) {
            if (alarmChosen == 1) {
                timesUpSound1.play();
            } else {
                timesUpSound2.play();
            }
            clearInterval(countdownClock);
            displayTime = "0m 0s";
            timerArea.textContent = displayTime;
        }
    }, 1000);
};

// ******************************************************

// displayTime = "00:00";
//     if (theTimer > 59) {
//         // need to work out mins and secs
//         // in a way that can be inserted into timer
//     }
//     const theInterval = setInterval(function () {
//         const stopTimer = function () {
//             clearInterval(theInterval);
//             alert("stopped");
//             return;
//         };
//         if (theTimer < 60) {
//             displayTime = `00:${theTimer > 9 ? theTimer : "0" + theTimer}`;
//         } else {
//             // work out the minutes
//             let minutes = (theTimer / 60 + "").split(".")[0];
//             let seconds = (theTimer / 60 + "").split(".")[1];
//             displayTime = `${minutes}:${seconds}`;
//         }
//         timerArea.textContent = displayTime;
//         theTimer--;
//         if (theTimer < 0) {
//             clearInterval(theInterval);
//             timerArea.textContent = "00:00";

//             timerOn = false;
//             console.log("time's up");
//         }

//         if (theTimer == 0) {
//             console.log("zero");
//         }
//     }, 1000);
