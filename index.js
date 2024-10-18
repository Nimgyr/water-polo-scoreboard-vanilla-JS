let periodElementDisplay;
let periodElementDisplayDev;

let scoreLeftElementDisplay;
let scoreLeftElementDisplayDev;

let scoreRightElementDisplay;
let scoreRightElementDisplayDev;

let newChildWindow;

let countdownTimerElementDisplay;
let countdownTimerElementDisplayDev;

let clock;
let clockDev;

let allDisabled = document.getElementById("all-disabled");

function doSetup() {
    allDisabled.classList.remove("disabled");
    let openChange = document.getElementById("open-change");
    openChange.classList.remove("disabled");
    newChildWindow = window.open(
        "./scoreboard.html",
        "New Child Window",
        `popup,fullscreen,left=0,top=0`
    );
    setTimeout(() => {
        getLinks();
    }, "1000");
}

periodElementDisplayDev = document.getElementById("period-el");
scoreLeftElementDisplayDev = document.getElementById("score-left");
scoreRightElementDisplayDev = document.getElementById("score-right");
countdownTimerElementDisplayDev = document.getElementById("timer_count");
clockDev = document.getElementById("clock");

function getLinks() {
    periodElementDisplay = newChildWindow.document.getElementById("period-el");

    scoreLeftElementDisplay =
        newChildWindow.document.getElementById("score-left");

    scoreRightElementDisplay =
        newChildWindow.document.getElementById("score-right");

    countdownTimerElementDisplay =
        newChildWindow.document.getElementById("timer_count");

    clock = newChildWindow.document.getElementById("clock");
}

// adding game periods

let period = 1;

function incrementPeriod() {
    if (period < 4) {
        period += 1;
        periodElementDisplayDev.textContent = ("00" + period).slice(-2);
        periodElementDisplay.textContent = ("00" + period).slice(-2);
    }
}
function decrementPeriod() {
    if (period > 1) {
        period -= 1;
        periodElementDisplayDev.textContent = ("00" + period).slice(-2);
        periodElementDisplay.textContent = ("00" + period).slice(-2);
    }
}

// change game score

let scoreLeft = 0;

function incrementLeftScore() {
    scoreLeft += 1;
    scoreLeftElementDisplayDev.textContent = ("00" + scoreLeft).slice(-2);
    scoreLeftElementDisplay.textContent = ("00" + scoreLeft).slice(-2);
}
function decrementLeftScore() {
    if (scoreLeft > 0) {
        scoreLeft -= 1;
        scoreLeftElementDisplayDev.textContent = ("00" + scoreLeft).slice(-2);
        scoreLeftElementDisplay.textContent = ("00" + scoreLeft).slice(-2);
    }
}

let scoreRight = 0;

function incrementRightScore() {
    scoreRight += 1;
    scoreRightElementDisplay.textContent = ("00" + scoreRight).slice(-2);
    scoreRightElementDisplayDev.textContent = ("00" + scoreRight).slice(-2);
}
function decrementRightScore() {
    if (scoreRight > 0) {
        scoreRight -= 1;
        scoreRightElementDisplay.textContent = ("00" + scoreRight).slice(-2);
        scoreRightElementDisplayDev.textContent = ("00" + scoreRight).slice(-2);
    }
}

// Function for countdown timer
let timerD;
let startingMinutes = 10;
let time = startingMinutes * 60;
let k = 0;
let isPaused = true;

function toggleStartPauseDev() {
    const startPauseBtn = document.getElementById("startPauseDev");
    if (!isPaused) {
        clearInterval(timerD);
        startPauseBtn.textContent = "Старт";
    } else {
        timerD = setInterval(function () {
            if (time > 0) {
                time--;
                const minute = Math.floor(time / 60);
                let seconds = time % 60;
                countdownTimerElementDisplayDev.textContent = `${(
                    "00" + minute
                ).slice(-2)}:${("00" + seconds).slice(-2)}`;
                countdownTimerElementDisplay.textContent = `${(
                    "00" + minute
                ).slice(-2)}:${("00" + seconds).slice(-2)}`;
            }
            if (time == 0) {
                clearInterval(timerD);
                isPaused = true;
                startPauseBtn.textContent = "Старт";
                countdownTimerElementDisplay.style.color = "red";
                countdownTimerElementDisplayDev.style.color = "red";
                const buzzer = document.getElementById("buzzer");
                buzzer.play();
            }
        }, 1000);
        startPauseBtn.textContent = "Пауза";
    }
    if (isPaused) {
        if (!isRunning) {
            toggleStartPause();
        }
        countdownTimerElementDisplayDev.style.color = "lime";
        countdownTimerElementDisplay.style.color = "lime";
    } else {
        if (isRunning) {
            toggleStartPause();
        }
        countdownTimerElementDisplay.style.color = "red";
        countdownTimerElementDisplayDev.style.color = "red";
    }

    isPaused = !isPaused;
}

function resetTimer() {
    clearInterval(timerD);
    document.getElementById("startPauseDev").textContent = "Старт";

    countdownTimerElementDisplayDev.textContent = `${(
        "00" + startingMinutes
    ).slice(-2)}:00`;
    countdownTimerElementDisplay.textContent = `${(
        "00" + startingMinutes
    ).slice(-2)}:00`;
    time = startingMinutes * 60;
    isPaused = true;
    countdownTimerElementDisplay.style.color = "white";
    countdownTimerElementDisplayDev.style.color = "white";
}
function changeTime() {
    clearInterval(timerD);
    let newTime = document.getElementById("new-time").value;

    startingMinutes = newTime;
    time = startingMinutes * 60;
    isPaused = true;
    countdownTimerElementDisplay.style.color = "white";
    countdownTimerElementDisplayDev.style.color = "white";

    countdownTimerElementDisplayDev.textContent = `${(
        "00" + startingMinutes
    ).slice(-2)}:00`;
    countdownTimerElementDisplay.textContent = `${(
        "00" + startingMinutes
    ).slice(-2)}:00`;
}

document
    .getElementById("startPauseDev")
    .addEventListener("click", toggleStartPauseDev);
document.getElementById("resetDev").addEventListener("click", resetTimer);

// let startingMinutes = 10;
// let time = startingMinutes * 60;
// let k = 0;

// let isPaused = true;

// var timerCount = setInterval(() => {
//     if (!isPaused && time >= 0) {
//         const minute = Math.floor(time / 60);
//         let seconds = time % 60;

//         seconds = seconds < 10 ? "0" + seconds : seconds;

//         countdownTimerElementDisplayDev.textContent = `${("00" + minute).slice(
//             -2
//         )}:${("00" + seconds).slice(-2)}`;
//         countdownTimerElementDisplay.textContent = `${("00" + minute).slice(
//             -2
//         )}:${("00" + seconds).slice(-2)}`;
//         time--;
//     }
//     if (time < 0 && k == 0) {
//         // clearInterval(timerCount);
//         isRunning = false;
//         countdownTimerElementDisplay.style.color = "red";
//         countdownTimerElementDisplayDev.style.color = "red";
//         const buzzer = document.getElementById("buzzer");
//         buzzer.play();
//         k++;
//     }
// }, 1000);

// function startTimer() {
//     if (!isRunning) {
//         toggleStartPause();
//     }

//     isPaused = false;
//     countdownTimerElementDisplayDev.style.color = "lime";
//     countdownTimerElementDisplay.style.color = "lime";
// }

// function pauseTimer() {
//     if (isRunning) {
//         toggleStartPause();
//     }
//     isPaused = true;
//     countdownTimerElementDisplayDev.style.color = "red";
//     countdownTimerElementDisplay.style.color = "red";
// }

// function resetTimer() {
//     countdownTimerElementDisplayDev.textContent = `${(
//         "00" + startingMinutes
//     ).slice(-2)}:00`;
//     countdownTimerElementDisplay.textContent = `${(
//         "00" + startingMinutes
//     ).slice(-2)}:00`;
//     time = startingMinutes * 60;
//     isPaused = true;
//     k = 0;
//     countdownTimerElementDisplay.style.color = "white";
//     countdownTimerElementDisplayDev.style.color = "white";
// }

// время атаки

let timer;
let isRunning = false;
let isBuzzerPlay = false;

function toggleStartPause() {
    if (isBuzzerPlay && parseInt(clockDev.textContent) == 0) {
        resetClock30();
    }
    const startPauseBtn = document.getElementById("startPause");
    if (isRunning) {
        clearInterval(timer);
        startPauseBtn.textContent = "Старт";
    } else {
        timer = setInterval(function () {
            let currentTime = parseInt(clockDev.textContent);
            if (currentTime > 0) {
                clock.textContent = ("00" + (currentTime - 1)).slice(-2);
                clockDev.textContent = ("00" + (currentTime - 1)).slice(-2);
            }
            if (parseInt(clockDev.textContent) == 0) {
                clearInterval(timer);
                isRunning = false;
                startPauseBtn.textContent = "Старт";
                clock.style.color = "red";
                clockDev.style.color = "red";
                const buzzer = document.getElementById("buzzer");
                buzzer.play();
                isBuzzerPlay = true;
            }
        }, 1000);
        startPauseBtn.textContent = "Пауза";
    }
    if (!isRunning) {
        clock.style.color = "lime";
        clockDev.style.color = "lime";
    } else {
        clock.style.color = "red";
        clockDev.style.color = "red";
    }

    isRunning = !isRunning;
}

function resetClock() {
    clearInterval(timer);
    clock.textContent = "30";
    clock.style.color = "white";
    clockDev.textContent = "30";
    clockDev.style.color = "white";
    document.getElementById("startPause").textContent = "Старт";
    isRunning = false;
    isBuzzerPlay = false;
}

function resetClock20() {
    isBuzzerPlay = false;
    clock.textContent = "20";
    clockDev.textContent = "20";
}
function resetClock30() {
    isBuzzerPlay = false;
    clock.textContent = "30";
    clockDev.textContent = "30";
}
function shotClock() {
    isBuzzerPlay = false;
    clock.textContent = "30";
    clockDev.textContent = "30";

    newChildWindow.document.getElementById("left-time").textContent =
        "Время атаки";
    document.getElementById("left-time").textContent = "Время атаки";
}
function timeout() {
    isBuzzerPlay = false;
    clock.textContent = "60";
    clockDev.textContent = "60";

    newChildWindow.document.getElementById("left-time").textContent =
        "Тайм-аут";
    document.getElementById("left-time").textContent = "Тайм-аут";
}

document
    .getElementById("startPause")
    .addEventListener("click", toggleStartPause);
document.getElementById("reset").addEventListener("click", resetClock);

function changeLeftTeamName() {
    let leftTeamName = document.getElementById("left-team").value;
    newChildWindow.document.getElementById("left-team-name").textContent =
        leftTeamName;
    document.getElementById("left-team-name").textContent = leftTeamName;
}
function changeRightTeamName() {
    let rightTeamName = document.getElementById("right-team").value;
    newChildWindow.document.getElementById("right-team-name").textContent =
        rightTeamName;
    document.getElementById("right-team-name").textContent = rightTeamName;
}

function newGame() {
    period = 1;
    periodElementDisplayDev.textContent = ("00" + period).slice(-2);
    periodElementDisplay.textContent = ("00" + period).slice(-2);

    scoreLeft = 0;
    scoreLeftElementDisplayDev.textContent = ("00" + scoreLeft).slice(-2);
    scoreLeftElementDisplay.textContent = ("00" + scoreLeft).slice(-2);

    scoreRight = 0;
    scoreRightElementDisplay.textContent = ("00" + scoreRight).slice(-2);
    scoreRightElementDisplayDev.textContent = ("00" + scoreRight).slice(-2);
    // for timer
    resetTimer();

    resetClock();
}

function openChangeNameOfCompetition() {
    let changeCompetitionName = document.getElementById("change-comp-name");
    let saveCompetitionName = document.getElementById("save-comp-name");
    let openChange = document.getElementById("open-change");
    openChange.classList.add("none");
    changeCompetitionName.classList.remove("none");
    saveCompetitionName.classList.remove("none");
}
function changeNameOfCompetition() {
    let changeCompetitionName = document.getElementById("change-comp-name");
    let saveCompetitionName = document.getElementById("save-comp-name");
    let openChange = document.getElementById("open-change");
    openChange.classList.remove("none");
    changeCompetitionName.classList.add("none");
    saveCompetitionName.classList.add("none");

    let competitionName = document.getElementById("change-comp-name").value;
    newChildWindow.document.getElementById("competition-name").textContent =
        competitionName;
}
