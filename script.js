const buttons = document.querySelectorAll('button');
const display = document.querySelector('.result')
let displayValue = '0';
let memoryValue = 0;
let action = '';
let memoryAction = '';

console.log(buttons);

const getButtonId = {
    0: 16,
    1: 12,
    2: 13,
    3: 14,
    4: 8,
    5: 9,
    6: 10,
    7: 4,
    8: 5,
    9: 6
}

const getButtonValue = {
    12: 1,
    13: 2,
    14: 3,
    8: 4,
    9: 5,
    10: 6,
    4: 7,
    5: 8,
    6: 9,
    16: 0
}

function updateDisplay() {
    if (displayValue.length >= 2 && displayValue[0] == 0) {
        displayValue = displayValue.slice(1);
    } 
    display.innerText = displayValue.replace('.', ',');
}

function removeClicked(button) {
    button.classList.remove('clicked')
}

function playAnim(button) {
    button.classList.add('clicked');
    setTimeout(() => removeClicked(button), 1000);
}

function evaluate(action) {
    if (action == 'add') {
        memoryValue += parseFloat(displayValue);
    } else if (action == 'minus') {
        memoryValue -= parseFloat(displayValue);
    } else if (action == 'multiply') {
        memoryValue *= parseFloat(displayValue);
    } else if (action == 'divide') {
        memoryValue /= parseFloat(displayValue);
    }

    displayValue = memoryValue.toString();
    console.log(displayValue)
    memoryValue = 0
    action = ''
    updateDisplay();
}

function add() {
    memoryValue += parseFloat(displayValue);
    action = 'add';
    memoryAction = 'add';
    displayValue = '0';
}

function minus() {
    memoryValue += parseFloat(displayValue);
    action = 'minus';
    memoryAction = 'minus';
    displayValue = '0';
}

function multiply() {
    memoryValue += parseFloat(displayValue);
    action = 'multiply';
    memoryAction = 'multiply';
    displayValue = '0';
}

function divide() {
    memoryValue += parseFloat(displayValue);
    action = 'divide';
    memoryAction = 'divide';
    displayValue = '0';
}

// after pressing -> displayValue snapshots to memory
// new entered key instead of old displayValue 
// after clicking equals or another -> action and result

// plain
// plain + action key

// Enter numbers
// click plus
// nothing changes
// start entering another -> clears old display
// click equals -> displays result

buttons.forEach((button, index) => {
    button.addEventListener('click', e => {
        playAnim(button);
        
        if (index in getButtonValue) {
            action = '';
            displayValue += getButtonValue[index];
        }

        if (button.innerText == 'C') {
            displayValue = '0';

        } else if (button.innerText == '±' && displayValue != '0') {
            if (displayValue[0] != '-') {
                displayValue = "-" + displayValue; 
            } else {
                displayValue = displayValue.slice(1);
            }
        } else if (button.innerText == ',') {
            displayValue += '.'
        } else if (button.innerText == '+') {
            add()
        } else if (button.innerText == '=') {
            evaluate(memoryAction);
        } else if (button.innerText == '−') {
            minus()
        } else if (button.innerText == '✕') {
            multiply()
        } else if (button.innerText == '÷') {
            divide()
        } 



        if (action == '') {
            updateDisplay();
        }
    }); 
})

document.addEventListener('keydown', function (event) {
    if (!isNaN(parseInt(event.key, 10))) {
        let key = parseInt(event.key, 10);
        let button = buttons[getButtonId[key]];
        displayValue += key;
        updateDisplay();
        playAnim(button);
    }
});

