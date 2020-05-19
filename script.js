// design
const timerContainer = document.querySelector('.timer-container');

// display container and display
const displayContainer = document.createElement('div');
displayContainer.classList.add('display-container');

// status
const status = document.createElement('div');
status.classList.add('status');
status.textContent = 'In session';
displayContainer.appendChild(status);

// display
const display = document.createElement('div');
display.classList.add('display');
display.textContent = '25:00';
displayContainer.appendChild(display);


// controls container and controls
const controlsContainer = document.createElement('div');
controlsContainer.classList.add('controls-container');
let controlsArr = ['start', 'pause', 'stop', 'reset'];
for (i of controlsArr) {
    const control = document.createElement('button');
    control.classList.add('control');
    const img = document.createElement('img');
    img.classList.add(i);
    img.classList.add('control');
    if (i == 'start') {
        img.src = 'icons/start.svg';
    } else if (i == 'pause') {
        img.src = 'icons/pause.svg';
    } else if (i == 'stop') {
        img.src = 'icons/stop.svg';
    } else if (i == 'reset') {
        img.src = 'icons/reset.svg';
    }
    control.appendChild(img);
    controlsContainer.appendChild(control);
}
timerContainer.appendChild(controlsContainer);

const adjustContainer = document.createElement('div');
adjustContainer.classList.add('adjust-container');

const adjustSessionContainer = document.createElement('div');
adjustSessionContainer.classList.add('adjust-session-container');
let sessionArr = ['inc', 'session-duration', '25:00', 'dec'];
for (i of sessionArr) {
    const adjustSession = i == 'inc' || i == 'dec' ? document.createElement('button') : document.createElement('div');
    adjustSession.classList.add('adjust-session');
    adjustSession.id = i == '25:00' ? 'twenty-five' : i;
    adjustSession.textContent = i;
    if (i == 'inc' || i == 'dec') {
        adjustSession.textContent = '';
        let img = document.createElement('img');
        img.src = i == 'inc' ? 'icons/inc.svg' : 'icons/dec.svg';
        img.classList.add('adjust-session');
        img.id = i;
        adjustSession.appendChild(img);
    } 
    adjustSessionContainer.appendChild(adjustSession);
}

const adjustBreakContainer = document.createElement('div');
adjustBreakContainer.classList.add('adjust-break-container');
let breakArr = ['inc', 'break-duration', '5:00', 'dec'];
for (i of breakArr) { 
    const adjustBreak = i == 'inc' || i == 'dec' ? document.createElement('button') : document.createElement('div');
    adjustBreak.classList.add('adjust-break');
    adjustBreak.id = i == '5:00' ? 'five' : i;
    adjustBreak.textContent = i;
    if (i == 'inc' || i == 'dec') {
        adjustBreak.textContent = '';
        let img = document.createElement('img');
        img.src = i == 'inc' ? 'icons/inc.svg' : 'icons/dec.svg';
        img.classList.add('adjust-break');
        img.id = i;
        adjustBreak.appendChild(img);
    } 
    adjustBreakContainer.appendChild(adjustBreak);
}

adjustContainer.appendChild(adjustSessionContainer);
adjustContainer.appendChild(displayContainer);
adjustContainer.appendChild(adjustBreakContainer);
timerContainer.appendChild(adjustContainer);

// functions
const buttons = document.querySelector('.layout-container'); 

// sounds
const notify = document.createElement('audio');
notify.classList.add('notify');
notify.src = 'sounds/notify.wav';
notify.muted = false;
const clickedMuteToggle = buttons.addEventListener('click', clickedMuteToggleEvent);

function clickedMuteToggleEvent(e) {
    if (e.target.classList.contains('mute-toggle')) {
        if (notify.muted) {
            notify.muted = false;
            e.target.src = 'icons/unmute.svg';
            notify.play();
        } else {
            notify.muted = true;
            e.target.src = 'icons/mute.svg';
        }
    }
}

const clickedSessionInc = buttons.addEventListener('mousedown', clickedIncDecEvent);
const sessionDuration = document.getElementById('twenty-five'); 
let twentyFive = 25;
const breakDuration = document.getElementById('five'); 
let five = 5;

let time = twentyFive * 60;
let breakTime = false;
let clickedStartOnceAlready = false; 

function clickedIncDecEvent(e) {
    if (e.target.classList.contains('adjust-session')) {
        if (e.target.id == 'inc') {
            twentyFive = twentyFive < 59 ? twentyFive + 1 : twentyFive;
        } else if (e.target.id == 'dec') {
            twentyFive = twentyFive > 1 ? twentyFive - 1 : twentyFive;
        }
        sessionDuration.textContent = twentyFive + ':00';
        if (breakTime == false) {
            time = twentyFive * 60;
            display.textContent = twentyFive < 10 ? '0' + twentyFive + ':00' : twentyFive + ':00';
        }
    } else if (e.target.classList.contains('adjust-break')) {
        if (e.target.id == 'inc') {
            five = five < 59 ? five + 1 : five;
        } else if (e.target.id == 'dec') {
            five = five > 1 ? five - 1 : five;
        }
        breakDuration.textContent = five + ':00';
        if (breakTime == true) {
            time = five * 60;
            display.textContent = five < 10 ? '0' + five + ':00' : five + ':00';
        }
    }
}

const clickedStart = buttons.addEventListener('click', clickedStartEvent);
const clickedPause = buttons.addEventListener('click', clickedPauseEvent);
const clickedStop = buttons.addEventListener('click', clickedStopEvent);
const clickedReset = buttons.addEventListener('click', clickedResetEvent);

let halted = false;
function clickedStartEvent(e) {
    if (e.target.classList.contains('start')) {
        if (clickedStartOnceAlready) {
            return;
        } else {
            clickedStartOnceAlready = true;
        }
        startTimer();
    }
}

function startTimer() {
    if (halted == true) {
        halted = false;
    }
    let theInterval = setInterval(function() { 
        time--;
        if (time == 0 || halted == true) {
            time = halted == true ? time + 1 : time;
            clearInterval(theInterval);
            if (time == 0) {
                breakTime = breakTime == false ? true : false;
                endOfTime();
            }
        }
        minutes = Math.floor(time / 60);
        seconds = time % 60;
        if (minutes < 10) {
            if (seconds < 10) {
                display.textContent = '0' + minutes + ':0' + seconds;
            } else {
                display.textContent = '0' + minutes + ':' + seconds; 
            }   
        } else {
            if (seconds < 10) {
                display.textContent = minutes + ':0' + seconds;
            } else {
                display.textContent = minutes + ':' + seconds;
            }   
        }
    }, 1000);
}

function clickedPauseEvent(e) {
    if (e.target.classList.contains('pause')) {
        clickedStartOnceAlready = false;
        halted = true;
    }
}

function clickedStopEvent(e) {
    if (e.target.classList.contains('stop')) {
        clickedStartOnceAlready = false;
        halted = true;
        time = breakTime == true ? five * 60 : twentyFive * 60;
        display.textContent = breakTime == true ? five + ':00' : twentyFive + ':00';
    }
}

function clickedResetEvent(e) {
    if (e.target.classList.contains('reset')) {
        clickedStartOnceAlready = false;
        halted = true;
        breakTime = false;
        time = 25*60;
        display.textContent = '25:00';
        twentyFive = 25;
        five = 5;
        sessionDuration.textContent = '25:00';
        breakDuration.textContent = '5:00';
    }
}

function endOfTime() {
    notify.play()
    halted = true;
    if (breakTime == true) {
        time = five * 60;
        display.textContent = five + ':00';
        status.textContent = 'On break';
        status.style.color = '#ff5858';
    } else {
        time = twentyFive * 60;
        display.textContent = twentyFive + ':00';
        status.textContent = 'In session';
        status.style.color = '#47e4bb';
    }
    startTimer();
}

/*
* add holding down of inc/dec
*/
