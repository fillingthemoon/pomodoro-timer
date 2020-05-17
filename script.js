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
    control.classList.add(i);
    control.id = i;
    control.textContent = i;
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
    adjustBreakContainer.appendChild(adjustBreak);
}

adjustContainer.appendChild(adjustSessionContainer);
adjustContainer.appendChild(display);
adjustContainer.appendChild(adjustBreakContainer);
timerContainer.appendChild(adjustContainer);

// bottom chunk
const bottom = document.createElement('div');
bottom.classList.add('bottom');
timerContainer.appendChild(bottom);


// function
