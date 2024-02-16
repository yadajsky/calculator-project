const inputField = document.getElementById('result');
const operationButtons = document.querySelectorAll('.operations');
const numberButtons  = document.querySelectorAll('.numbers');
const equalButton = document.querySelector('#equalButton');
const decimalButton = document.querySelector('#decimalButton');
const clearButton = document.querySelector('#clearButton');
const addButton = document.querySelector('#addButton');
const subtractButton = document.querySelector('#subtractButton');
const multiplyButton = document.querySelector('#multiplyButton');
const divideButton = document.querySelector('#divideButton');
const backspaceButton = document.querySelector('#backspaceButton');

let currentDisplayValue = '';
let firstNumber = '';
let operator = '';

const isAllowedCharacter = (char) => /[0-9\.]/.test(char);

const displayNumber = (value) => {
    if(inputField.value.length >= 14){
        inputField.value = 'Err';
        currentDisplayValue = inputField.value;
    } else if (inputField.value === '0' || inputField.value === 'Err'){
        inputField.value = value;
        currentDisplayValue = inputField.value;
    } else {
        inputField.value += value;
        currentDisplayValue = inputField.value;
    }
};

const add =(num1, num2) => num1 + num2;

const subtract = (num1, num2) => num1 - num2;

const multiply = (num1, num2)=> num1 * num2;

const divide = (num1, num2) => {
    if(num2 === 0) {
        inputField.value = 'Error: Division by zero';
        currentDisplayValue = inputField.value;
        return NaN;
    }
    return num1 / num2;
};

const operate = () => {
    let result;
    switch (operator) {
        case '+':
            result = add(parseFloat(firstNumber), parseFloat(currentDisplayValue));
            console.log(firstNumber);
            console.log(currentDisplayValue);
            break;
        case '-':
            result = subtract(parseFloat(firstNumber), parseFloat(currentDisplayValue));
            break;
        case '*':
            result = multiply(parseFloat(firstNumber), parseFloat(currentDisplayValue));
            break;
        case '/':
            result = divide(parseFloat(firstNumber), parseFloat(currentDisplayValue));
            break;
        default:
            result = NaN;
    }
    if (!isNaN(result)){
        inputField.value = result;
        currentDisplayValue = result.toString();
        firstNumber = '';
    } else {
        // inputField.value = 'Error: Invalid operation';
    }
};

const handleOperation = (clickOperator) => {
    if (firstNumber === '') {
        firstNumber = inputField.value;
    } else {
        operate();
    }
    operator = clickOperator;
    console.log(operator);
    if(operator!== '' || operate!==null){
        currentDisplayValue = numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                currentDisplayValue = '';
                currentDisplayValue += button.value;
                console.log(currentDisplayValue);
            });
        });
    }
};

const clearDisplay = () => {
    inputField.value = '0';
    currentDisplayValue = '';
    firstNumber = '';
    operator = '';
};

//Event listeners for number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        displayNumber(button.value);
    });
});

//Event listener for decimal button 
decimalButton.addEventListener('click', () => {
    if (!currentDisplayValue.includes('.')) {
        displayNumber('.');
    }
});

//Event listener for operation buttons 
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
            // handleOperation(button.value);
            if(button.value==='='){
                handleOperation(button.value);
            }else{
                handleOperation(button.value);
                inputField.value += button.value;
            }   
    });
});

// Event listener for equals button
equalButton.addEventListener('click', () => {
    if (firstNumber !== '' && currentDisplayValue !== '') {
        operate();
    }
});

// Event listener for clear button
clearButton.addEventListener('click', () => {
    clearDisplay();
});

// Event listeners for add, subtract, multiply, and divide buttons
addButton.addEventListener('click', () => {
    if (currentDisplayValue !== '') {
        handleOperation('+');
    }
    currentDisplayValue = '';
});

subtractButton.addEventListener('click', () => {
    if (currentDisplayValue !== '') {
        handleOperation('-');
    }
    currentDisplayValue = '';
});

multiplyButton.addEventListener('click', () => {
    if (currentDisplayValue !== '') {
        handleOperation('*');
    }
    currentDisplayValue = '';
});

divideButton.addEventListener('click', () => {
    if (currentDisplayValue !== '') {
        handleOperation('/');
    }
    currentDisplayValue = '';
});

//Event listener for backspace button 
backspaceButton.addEventListener('click', () => {
    if (inputField.value !== '0') {
        inputField.value = inputField.value.slice(0, -1);
        if(inputField.value === ''){
            inputField.value = '0';
        }
        currentDisplayValue = inputField.value;
    }
});

//Keyboard support 
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (!isNaN(parseInt(key))) {
        displayNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            handleOperation(key);
    } else if (key === '.') {
        if (!currentDisplayValue.includes('.')) {
            displayNumber('.');
        }
    } else if (key === 'Enter') {
        handleOperation();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        inputField.value = inputField.value.slice(0, -1);
        currentDisplayValue = inputField.value;
    }
});


