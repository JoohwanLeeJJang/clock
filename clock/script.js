const todayDiv = document.getElementById("today");
const timeDiv = document.getElementById("time");
const clockDiv = document.getElementById("clock");
const stopwatchDiv = document.getElementById("stopwatch");
const stopwatchDisplay = document.getElementById("stopwatchDisplay");
const staartStopButton = document.getElementById("startStopButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");

let stopwatchRunning = false;
let startTime = 0;
let elapsedTime = 0;
let stopwatchInterval;

function getTime() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    let week = now.getDay();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    hour = hour < 10 ? `0${hour}` : hour;
    minute = minute < 10 ? `0${minute}` : minute;
    second = second < 10 ? `0${second}` : second;
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

    todayDiv.textContent = `${year}-${month}-${day} (${weekdays[week]})`;
    timeDiv.textContent = `${hour}:${minute}:${second}`;
}

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    stopwatchInterval = setInterval(updateStopwatch, 10);
    stopwatchRunning = true;
    startStopButton.textContent = "Stop";
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    startStopButton.textContent = "Start";
}

function pauseStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    elapsedTime = Date.now() - startTime;
    startStopButton.textContent = "Resume";
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    elapsedTime = 0;
    stopwatchDisplay.textContent = "00:00:00";
    startStopButton.textContent = "Start";
}

function updateStopwatch() {
    let currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let minutes = Math.floor(elapsedTime / (1000 * 60));
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    milliseconds = milliseconds.toString().padStart(2, '0');

    stopwatchDisplay.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

button1.addEventListener("click", function() {
    getTime();
    clockDiv.style.display = "block";
    stopwatchDiv.style.display = "none";
    stopwatchDisplay.textContent = "00:00:00";
});

button2.addEventListener("click", function() {
    stopwatchDiv.style.display = "block";
    clockDiv.style.display = "none";
});

startStopButton.addEventListener("click", function() {
    if (!stopwatchRunning) {
        startStopwatch();
    } else {
        stopStopwatch();
    }
});


resetButton.addEventListener("click", function() {
    resetStopwatch();
});

setInterval(getTime, 1000);
