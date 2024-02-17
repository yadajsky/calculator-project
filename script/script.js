const inputField = document.getElementById("result");
const operationButtons = document.querySelectorAll(".operations");
const numberButtons = document.querySelectorAll(".numbers");
const equalButton = document.querySelector("#equalButton");
const decimalButton = document.querySelector("#decimalButton");
const clearButton = document.querySelector("#clearButton");
const addButton = document.querySelector("#addButton");
const subtractButton = document.querySelector("#subtractButton");
const multiplyButton = document.querySelector("#multiplyButton");
const divideButton = document.querySelector("#divideButton");
const backspaceButton = document.querySelector("#backspaceButton");

let currentDisplayValue = "0";
let firstNumber = "";
let operator = "";
let haveDot = false;
let previousResult = "";

const isAllowedCharacter = (char) => /[0-9\.]/.test(char);

const displayNumber = (value) => {
  if (inputField.innerText.length >= 14) {
    inputField.innerText = "Err";
    currentDisplayValue = inputField.innerText;
  } else if (inputField.innerText === "0" || inputField.innerText === "Err") {
    inputField.innerText = value;
    currentDisplayValue = inputField.innerText;
  } else {
    inputField.innerText += value;
    currentDisplayValue = inputField.innerText;
  }
};

const add = (num1, num2) => num1 + num2;

const subtract = (num1, num2) => num1 - num2;

const multiply = (num1, num2) => num1 * num2;

const divide = (num1, num2) => {
  if (num2 === 0) {
    inputField.innerText = "Error: Division by zero";
    currentDisplayValue = inputField.innerText;
    return NaN;
  }
  return num1 / num2;
};

const operate = () => {
  let result;
  currentDisplayValue = inputField.innerText.split(operator)[1];
  switch (operator) {
    case "+":
      result = add(parseFloat(firstNumber), parseFloat(currentDisplayValue));
      break;
    case "-":
      result = subtract(
        parseFloat(firstNumber),
        parseFloat(currentDisplayValue)
      );
      break;
    case "*":
      result = multiply(
        parseFloat(firstNumber),
        parseFloat(currentDisplayValue)
      );
      break;
    case "/":
      result = divide(parseFloat(firstNumber), parseFloat(currentDisplayValue)).toFixed(6);
      break;
    default:
      result = NaN;
  }
  if (!isNaN(result)) {
    inputField.innerText = result;
    previousResult = result;
    currentDisplayValue = result.toString();
    firstNumber = "";
  }
};

const handleOperation = (clickOperator) => {
    haveDot = false
  if (firstNumber === "") {
    firstNumber = inputField.innerText;
  } else {
    operate();
  }
  operator = clickOperator;
  if (operator !== "" || operate !== null) {
    currentDisplayValue = numberButtons.forEach((button) => {
      button.addEventListener("click", () => {
        currentDisplayValue = "";
        currentDisplayValue += button.innerText;
      });
    });
  }
};

const clearDisplay = () => {
  inputField.innerText = "0";
  currentDisplayValue = "";
  firstNumber = "";
  operator = "";
  haveDot = false;
};

numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
        haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    currentDisplayValue = e.target.innerText;
    if(inputField.innerText === previousResult.toString()){
        inputField.innerText = e.target.innerText;
    }else if(inputField.innerText === '0'){
    inputField.innerText = currentDisplayValue;
    }else{
    inputField.innerText += currentDisplayValue;
    }

  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.innerText === "=") {
      handleOperation(button.innerText);
    }else {
      handleOperation(button.innerText);
      if(inputField.innerText.includes(operator)){
        let newValue = inputField.innerText.split(operator)[0];
        console.log(newValue);
        inputField.innerText = newValue + button.innerText
        console.log(inputField.innerText);
      }else{
        inputField.innerText += button.innerText;  
      }
    }
  });
});

equalButton.addEventListener("click", () => {
  if (firstNumber !== "" && currentDisplayValue !== "") {
    operate();
  }
});

clearButton.addEventListener("click", () => {
  clearDisplay();
});

addButton.addEventListener("click", () => {
  if (currentDisplayValue !== "") {
    handleOperation("+");
  }
  currentDisplayValue = "";
});

subtractButton.addEventListener("click", () => {
  if (currentDisplayValue !== "") {
    handleOperation("-");
  }
  currentDisplayValue = "";
});

multiplyButton.addEventListener("click", () => {
  if (currentDisplayValue !== "") {
    handleOperation("*");
  }
  currentDisplayValue = "";
});

divideButton.addEventListener("click", () => {
  if (currentDisplayValue !== "") {
    handleOperation("/");
  }
  currentDisplayValue = "";
});

backspaceButton.addEventListener("click", () => {
  if (inputField.innerText !== "0") {
    inputField.innerText = inputField.innerText.slice(0, -1);
    if (inputField.innerText === "") {
      inputField.innerText = "0";
    }
    currentDisplayValue = inputField.innerText;
  }
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (!isNaN(parseInt(key))) {
    displayNumber(key);
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    handleOperation(key);
  } else if (key === ".") {
    if (!currentDisplayValue.includes(".")) {
      displayNumber(".");
    }
  } else if (key === "Enter") {
    handleOperation();
  } else if (key === "Escape") {
    clearDisplay();
  } else if (key === "Backspace") {
    inputField.innerText = inputField.innerText.slice(0, -1);
    currentDisplayValue = inputField.innerText;
  }
});
