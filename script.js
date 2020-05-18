// design
const timerContainer = document.querySelector('.timer-container');

const display = document.createElement('div');
display.classList.add('display');
display.textContent = '25:00';

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
adjustContainer.appendChild(display);
adjustContainer.appendChild(adjustBreakContainer);
timerContainer.appendChild(adjustContainer);

// function
const buttons = document.querySelector('.layout-container'); 

const clickedSessionInc = buttons.addEventListener('mousedown', clickedIncDecEvent);
const sessionDuration = document.getElementById('twenty-five'); 
let twentyFive = 25;
const breakDuration = document.getElementById('five'); 
let five = 5;

let time = twentyFive * 60;
let breakTime = false;

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
            display.textContent = twentyFive + ':00';
        }
    } else if (e.target.classList.contains('adjust-break')) {
        if (e.target.id == 'inc') {
            five = five < 59 ? five + 1 : five;
        } else if (e.target.classList.contains('adjust-break') && e.target.id == 'dec') {
            five = five > 1 ? five - 1 : five;
        }
        breakDuration.textContent = five + ':00';
        if (breakTime == true) {
            time = five * 60;
            display.textContent = five + ':00';
        }
    }
}

const clickedPlay = buttons.addEventListener('click', clickedStartEvent);
const clickedPause = buttons.addEventListener('click', clickedPauseEvent);
const clickedStop = buttons.addEventListener('click', clickedStopEvent);
const clickedReset = buttons.addEventListener('click', clickedResetEvent);

let halted = false;
function clickedStartEvent(e) {
    if (e.target.classList.contains('start')) {
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
        display.textContent = seconds < 10 ? minutes + ':0' + seconds : minutes + ':' + seconds;
    }, 1000);
}

function clickedPauseEvent(e) {
    if (e.target.classList.contains('pause')) {
        halted = true;
    }
}

function clickedStopEvent(e) {
    if (e.target.classList.contains('stop')) {
        halted = true;
        time = twentyFive * 60;
        display.textContent = twentyFive + ':00';
    }
}

function clickedResetEvent(e) {
    if (e.target.classList.contains('reset')) {
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
    console.log('end of time');
    halted = true;
    if (breakTime == true) {
        time = five * 60;
        display.textContent = five + ':00';
    } else {
        time = twentyFive * 60;
        display.textContent = twentyFive + ':00';
    }
    startTimer();
}

/*
* add break time
* fix double clicking of start
* add holding down of inc/dec
* reset timer if reaches 0
*/
