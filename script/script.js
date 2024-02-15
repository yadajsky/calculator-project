const inputField = document.getElementById('result');
const buttons = document.querySelectorAll('.operations');
const numberButtons  = document.querySelectorAll('.numbers');
const equalButton = document.querySelector('.operations [value = "="]');

const displayNumber = value => {
    if(inputField.value.length >= 8){
        inputField.value = 'Err';
    }else if(inputField.value !== 'Err' &&((inputField.value === '0' && value ==='.') || inputField.value !== '0')){
        inputField.value += value;
    }else{
        inputField.value = value;
    }
}

const add = numberInput => {
    let displayValues = numberInput.split('+');
    inputField.value = parseFloat(displayValues[0]) + parseFloat(displayValues[1]);
    console.log(inputField.value);
}

const substract = numberInput => {
    let displayValues = numberInput.split('-');
    inputField.value = parseFloat(displayValues[0]) - parseFloat(displayValues[1]);
    console.log(inputField.value);
}

const multiply = numberInput => {
    let displayValues = numberInput.split('×');
    inputField.value = parseFloat(displayValues[0]) * parseFloat(displayValues[1]);
    console.log(inputField.value);
}

const divide = numberInput => {
    let displayValues = numberInput.split('/');
    inputField.value = parseFloat(displayValues[0]) / parseFloat(displayValues[1]);
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

