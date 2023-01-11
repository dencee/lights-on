const NUM_ROWS = 5;
const NUM_COLS = 5;
const LIGHTS_OFF_COLOR = 'gray';
const LIGHTS_ON_COLOR = 'orange';
const grid = []

const gameTableEl = document.getElementById('game-table');


function initializeGameTable() {

    for (let row = 0; row < NUM_ROWS; row++) {
        const tableRowEl = document.createElement('tr');

        for (let col = 0; col < NUM_COLS; col++) {

            const lightNumber = (row * NUM_ROWS) + col;

            const tableDataEl = document.createElement('td');
            tableDataEl.style.backgroundColor = LIGHTS_OFF_COLOR;
            tableDataEl.setAttribute('id', lightNumber.toFixed());
            tableRowEl.appendChild(tableDataEl);
            
            grid.push(tableDataEl);
        }

        gameTableEl.appendChild(tableRowEl);
    }
}

function randomizeLights(){
    for(eachLight of grid){
        if( Math.random() < 0.5 ){
            toggleSingleLight(eachLight);
        }
    }
}

/**
 * Check if all lights are ON!
 */
function checkWin() {
    const offLights = grid.filter( (eachLightEl) => {
        return eachLightEl.style.backgroundColor === LIGHTS_OFF_COLOR;
    });

    if(offLights.length === 0){
        alert('YOU WIN!');
    }
}

/**
 * Toggle all lights and check if you won!
 * @param {object} event 
 */
function toggleLights(event) {
    const clickedLightCellEl = event.target;
    const lightNumber = parseInt(clickedLightCellEl.getAttribute('id'));

    // Toggle color for selected td element
    toggleSingleLight(grid[lightNumber]);

    // NOT first row, toggle color for TOP td element
    if(lightNumber >= NUM_COLS){
        toggleSingleLight(grid[lightNumber - NUM_COLS]);
    }

    // NOT right edge, toggle color for RIGHT td element
    if(lightNumber % NUM_COLS !== (NUM_COLS - 1) ){
        toggleSingleLight(grid[lightNumber + 1]);
    }

    // NOT on left edge, toggle color for LEFT td element
    if(lightNumber % 5 !== 0){
        toggleSingleLight(grid[lightNumber - 1]);
    }

    // NOT last row, toggle color for BOTTOM td element
    if(lightNumber + NUM_COLS <= (NUM_COLS * NUM_ROWS) - 1){
        toggleSingleLight(grid[lightNumber + NUM_COLS]);
    }

    checkWin();
}

/**
 * Toggle a single light on/off
 * @param {element object} lightCellEl 
 */
function toggleSingleLight(lightCellEl) {
    const style = lightCellEl.style;
    const color = style.backgroundColor;
    style.backgroundColor = (color === LIGHTS_ON_COLOR) ? LIGHTS_OFF_COLOR : LIGHTS_ON_COLOR;
}

document.addEventListener('DOMContentLoaded', () => {
    const lightElements = document.querySelectorAll('td');

    for (let i = 0; i < lightElements.length; i++) {
        lightElements[i].addEventListener('click', toggleLights);
    }

    const button = document.querySelector('button');
    button.addEventListener('click', randomizeLights);
});

initializeGameTable();