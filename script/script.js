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

let currentDisplayValue = "";
let firstNumber = "";
let operator = "";
let haveDot = false;

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
  switch (operator) {
    case "+":
      result = add(parseFloat(firstNumber), parseFloat(currentDisplayValue));
      console.log(firstNumber);
      console.log(currentDisplayValue);
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
      result = divide(parseFloat(firstNumber), parseFloat(currentDisplayValue));
      break;
    default:
      result = NaN;
  }
  if (!isNaN(result)) {
    inputField.innerText = result;
    currentDisplayValue = result.toString();
    firstNumber = "";
  } else {
    // inputField.value = 'Error: Invalid operation';
  }
};

const handleOperation = (clickOperator) => {
  if (firstNumber === "") {
    firstNumber = inputField.innerText;
  } else {
    operate();
  }
  operator = clickOperator;
  console.log(operator);
  if (operator !== "" || operate !== null) {
    currentDisplayValue = numberButtons.forEach((button) => {
      button.addEventListener("click", () => {
        currentDisplayValue = "";
        currentDisplayValue += button.innerText;
        console.log(currentDisplayValue);
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
    currentDisplayValue += e.target.innerText;
    inputField.innerText = currentDisplayValue;
  });
});

//Event listener for operation buttons
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // handleOperation(button.value);
    if (button.innerText === "=") {
      handleOperation(button.innerText);
    } else {
      handleOperation(button.innerText);
      inputField.innerText += button.innerText;
    }
  });
});

// Event listener for equals button
equalButton.addEventListener("click", () => {
  if (firstNumber !== "" && currentDisplayValue !== "") {
    operate();
  }
});

// Event listener for clear button
clearButton.addEventListener("click", () => {
  clearDisplay();
});

// Event listeners for add, subtract, multiply, and divide buttons
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

//Event listener for backspace button
backspaceButton.addEventListener("click", () => {
  if (inputField.innerText !== "0") {
    inputField.innerText = inputField.innerText.slice(0, -1);
    if (inputField.innerText === "") {
      inputField.innerText = "0";
    }
    currentDisplayValue = inputField.innerText;
  }
});

//Keyboard support
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
