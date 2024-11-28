const display = document.getElementById('display');

const powerButton = document.getElementById('power');
const buttons = document.querySelectorAll('button');
let isPoweredOn = false;


powerButton.addEventListener('click', () => {
    isPoweredOn = !isPoweredOn;
    if (isPoweredOn) {
        display.value = '0';
        buttons.forEach((button) => {
            if (button !== powerButton) {
                button.disabled = false; 
            }
        });
    } else {
        display.value = ''; 
        buttons.forEach((button) => {
            if (button !== powerButton) {
                button.disabled = true;
            }
        });
    }
});


const numberButtons = document.querySelectorAll('[data-number]');
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const number = button.getAttribute('data-number');
        if (display.value === '0') {
            display.value = number;
        } else {
            display.value += number;
        }
    });
});


const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => {
    display.value = '0';
});


const clearLastNumberButton = document.getElementById('clearLastNumber');
clearLastNumberButton.addEventListener('click', () => {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1); 
    } else {
        display.value = '0';
    }
});


const openButton = document.getElementById('open');
openButton.addEventListener('click', () => {
    const lastChar = display.value[display.value.length - 1]; 
    if (display.value === '0') {
        display.value = '(';
    } else if (
        !lastChar || 
        ['+', '-', '*', '/'].includes(lastChar) || 
        !isNaN(lastChar) 
    ) {
        display.value += '(';
    }
});


const closeButton = document.getElementById('close');
closeButton.addEventListener('click', () => {
    const openCount = display.value.split('(').length - 1;
    const closeCount = display.value.split(')').length - 1; 
    if (closeCount < openCount) {
        display.value += ')';
    }
});


const decimalButton = document.getElementById('decimal');
decimalButton.addEventListener('click', () => {
    const lastChar = display.value[display.value.length - 1];
    const numbers = display.value.split(/[\+\-\*\/\%]/);
    const currentNumber = numbers[numbers.length - 1];

    if (!display.value || isNaN(lastChar)) {
        display.value += '0.';
    } else if (!currentNumber.includes('.')) {
        display.value += '.';
    }
});


function getLastChar() {
    return display.value[display.value.length - 1];
}

// Aquí las operaciones
const operationsButtons = document.querySelectorAll('[data-operation]');
operationsButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const operation = button.getAttribute('data-operation');
        const lastChar = display.value[display.value.length - 1];
           if (lastChar && !isNaN(lastChar)) {
           display.value += operation;
           } else if (['+', '-', '*', '/', '%'].includes(lastChar)) {
           display.value = display.value.slice(0, -1) + operation;
           } else if (lastChar === ')') {
            display.value += operation;
           } else if (!display.value) {
            display.value = '0';
           }
    });
});      


const equalButton = document.getElementById('equal');
equalButton.addEventListener('click', () => {
    try {
        const lastChar = display.value[display.value.length - 1];
        if (!isNaN(lastChar) || lastChar === ')') {
            const result = new Function(`return ${display.value}`)(); 
            display.value = result;
        } else {
            alert('not valid');
        }
    } catch (error) {
        alert('error');
    }
});