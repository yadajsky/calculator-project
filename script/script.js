const inputField = document.getElementById('result');
const operationButtons = document.querySelectorAll('.operations');
const numberButtons  = document.querySelectorAll('.numbers');
const equalButton = document.querySelector('.operations [value = "="]');

const displayNumber = value => {
    if(inputField.value.length >= 14){
        inputField.value = 'Err';
    }else if(inputField.value !== 'Err' &&((inputField.value === '0' && value ==='.') || inputField.value !== '0')){
        let inputFieldValueArray = inputField.value.split('');
        console.log(inputFieldValueArray[-1]);
        inputField.value += value;
    }else{
        inputField.value = value;
    }
}

const add = numberInput => {
    let displayValues = numberInput.split('+');
    let num1 = parseFloat(displayValues[0]);
    let num2 = parseFloat(displayValues[1]);
    inputField.value = num1 + num2;
    console.log(inputField.value);
}

const substract = numberInput => {
    let displayValues = numberInput.split('-');
    let num1 = parseFloat(displayValues[0]);
    let num2 = parseFloat(displayValues[1]);
    inputField.value = num1 - num2;
    console.log(inputField.value);
}

const multiply = numberInput => {
    let displayValues = numberInput.split('×');
    let num1 = parseFloat(displayValues[0]);
    let num2 = parseFloat(displayValues[1]);
    inputField.value = num1 * num2;
    console.log(inputField.value);
}

const divide = numberInput => {
    let displayValues = numberInput.split('/');
    let num1 = parseFloat(displayValues[0]);
    let num2 = parseFloat(displayValues[1]);
    inputField.value = num1 / num2;
    console.log(inputField.value);
}

const operate = () => {
    for(let i = 0; i<= inputField.value.length; i++){
        if(inputField.value.includes('+')){
            add(inputField.value);
        }
        else if(inputField.value.includes('-')){
            substract(inputField.value);
        }else if(inputField.value.includes('×')){
            multiply(inputField.value);
        }else if(inputField.value.includes('/')){
            divide(inputField.value);
        }
    }
}

