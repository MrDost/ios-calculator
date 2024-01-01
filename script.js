const buttons = document.querySelectorAll('button');
const display = document.querySelector('.result')
let displayValue = '0';
let memoryValue = 0;
let action = '';
let memoryAction = '';

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

function addSpaceBeforeComma(str) {
    const parts = str.split(',');
    const beforeComma = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return beforeComma + (parts[1] !== undefined ? ',' + parts[1] : '');
  }
  

function updateDisplay() {
    if (displayValue.length >= 2 && displayValue[0] == 0) {
        displayValue = displayValue.slice(1);
    } 
    if (displayValue.length < 7) {
        display.style.fontSize = '135px';
    }
    if (displayValue.length == 7) {
        display.style.fontSize = '105px';
    }
    if (displayValue.length == 8) {
        display.style.fontSize = '90px';
    }
    if (displayValue.length == 9) {
        display.style.fontSize = '80px';
    }
    if (displayValue.length > 9) {
        displayValue = displayValue.slice(0, 9);
    } 
    if (displayValue.indexOf('.') == 0) {
        displayValue = '0' + displayValue;
    }
    display.innerText = addSpaceBeforeComma(displayValue.replace('.', ','));
    // display.innerText = displayValue.replace('.', ',');
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
    } else if (action == 'percent') {
        memoryValue *= parseFloat(displayValue)/100;
    } else if (action == '') {
        memoryValue = parseFloat(displayValue);
    }

    displayValue = memoryValue.toString();
    console.log(displayValue)
    memoryValue = 0
    action = ''
    memoryAction = ''
    updateDisplay();
}

function preCalculate(memoryAction) {
    if (memoryAction) {
        evaluate(memoryAction)
        updateDisplay()
    }
}

function setAction(symbol) {
    preCalculate(memoryAction);
    memoryValue += parseFloat(displayValue);
    action = symbol;
    memoryAction = symbol;
    displayValue = '0';
} 

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
            if (displayValue.indexOf('.') == -1) {
                displayValue += '.'
            }
        } else if (button.innerText == '+') {
            setAction('add');
        } else if (button.innerText == '=') {
            evaluate(memoryAction);
        } else if (button.innerText == '−') {
            setAction('minus');
        } else if (button.innerText == '✕') {
            setAction('multiply');
        } else if (button.innerText == '÷') {
            setAction('divide');
        } else if (button.innerText == '%') {
            setAction('percent');
        } 

        if (action == '') {
            updateDisplay();
        } 
    }); 
})

// document.addEventListener('keydown', function (event) {
//     if (!isNaN(parseInt(event.key, 10))) {
//         let key = parseInt(event.key, 10);
//         let button = buttons[getButtonId[key]];
//         displayValue += key;
//         updateDisplay();
//         playAnim(button);
//     }
// });

