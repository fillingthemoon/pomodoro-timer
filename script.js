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
const clickedPlay = buttons.addEventListener('click', clickedPlayEvent);
const clickedPause = buttons.addEventListener('click', clickedPauseEvent);
let paused = false;

function clickedPlayEvent(e) {
    if (e.target.classList.contains('start')) {
        console.log('start');
        paused = false;
        let minutes = 25;
        let seconds = 0;
        let theInterval = setInterval(function() { 
            minutes--;
            display.textContent = minutes + ':00';
            console.log('hi');
            if (minutes == 0 || paused == true) {
                clearInterval(theInterval);
            }
        }, 1000);
    }
}

function clickedPauseEvent(e) {
    if (e.target.classList.contains('pause')) {
        console.log('pause');
        paused = true;
    }
}
