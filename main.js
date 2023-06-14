const display = document.querySelector("#output");
const keys = document.querySelector("#input");
let displayValue = "0";
let firstOperand = null;
let operator = null;
let awaitingNextOperand = false;

function inputDigits(digit) {
    if (displayValue === "0" || awaitingNextOperand) {
        displayValue = digit;
        awaitingNextOperand = false;
    } else {
        displayValue += digit;
    }
}

function inputDecimal() {
    if (!displayValue.includes(".")) {
        displayValue += ".";
    }
}

function clearDisplay() {
    displayValue = "0";
    firstOperand = null;
    operator = null;
    awaitingNextOperand = false;
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (operator && awaitingNextOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        displayValue = `${parseFloat(result.toFixed(5))}`;
        firstOperand = result;
    }

    operator = nextOperator;
    awaitingNextOperand = true;
}

function calculate(numberOne, numberTwo, operator) {
    if (operator === "+") {
        return numberOne + numberTwo;
    } else if (operator === "-") {
        return numberOne - numberTwo;
    } else if (operator === "*") {
        return numberOne * numberTwo;
    } else if (operator === "/") {
        return numberOne / numberTwo;
    }
    return numberTwo;
}

function maxDisplayValue() {
    const maxLength = 10;

    if (displayValue.length > maxLength) {
        displayValue = displayValue.slice(0, maxLength);
    }
}


function updateDisplay() {
    display.textContent = displayValue;
}

function listenToKeys() {
    keys.addEventListener("click", (e) => {
        if (e.target.matches(".grid")) {
            const key = e.target;
            const action = key.dataset.action;
            const keyValue = key.dataset.value;

            if (!action) {
                inputDigits(keyValue);
            } else if (
                action === "+" ||
                action === "-" ||
                action === "*" ||
                action === "/"
            ) {
                handleOperator(action);
            } else if (action === ".") {
                inputDecimal();
            } else if (action === "clear") {
                clearDisplay();
            } else if (action === "=") {
                handleOperator(action);
            }

            updateDisplay();
        }
    });
}

function init() {
    listenToKeys();
    updateDisplay();
}

init();
