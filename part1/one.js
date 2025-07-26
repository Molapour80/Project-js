// DOM Elements
const display = document.querySelector('.display');
const buttonsContainer = document.querySelector('.buttons');

// Calculator state
let currentInput = '0';
let previousInput = '';
let operation = null;
let resetInput = false;

// Button values
const buttonValues = [
    { text: '7', class: '' },
    { text: '8', class: '' },
    { text: '9', class: '' },
    { text: '/', class: 'operator' },
    { text: '4', class: '' },
    { text: '5', class: '' },
    { text: '6', class: '' },
    { text: '*', class: 'operator' },
    { text: '1', class: '' },
    { text: '2', class: '' },
    { text: '3', class: '' },
    { text: '-', class: 'operator' },
    { text: 'C', class: 'clear' },
    { text: '0', class: '' },
    { text: '=', class: 'equals' },
    { text: '+', class: 'operator' }
];

// Create buttons
buttonValues.forEach(button => {
    const btn = document.createElement('button');
    btn.textContent = button.text;
    if (button.class) {
        btn.classList.add(button.class);
    }
    btn.addEventListener('click', () => handleButtonClick(button.text));
    buttonsContainer.appendChild(btn);
});

// Update display
function updateDisplay() {
    display.value = currentInput;
}

// Handle button clicks
function handleButtonClick(value) {
    if (value >= '0' && value <= '9') {
        handleNumberInput(value);
    } else if (value === '.') {
        handleDecimalInput();
    } else if (value === 'C') {
        handleClearInput();
    } else if (value === '=') {
        handleEquals();
    } else {
        handleOperation(value);
    }
    updateDisplay();
}

// Number input handler
function handleNumberInput(number) {
    if (currentInput === '0' || resetInput) {
        currentInput = number;
        resetInput = false;
    } else {
        currentInput += number;
    }
}

// Decimal input handler
function handleDecimalInput() {
    if (resetInput) {
        currentInput = '0.';
        resetInput = false;
        return;
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

// Clear input handler
function handleClearInput() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    resetInput = false;
}

// Operation handler
function handleOperation(op) {
    if (operation !== null && !resetInput) {
        calculate();
    }
    previousInput = currentInput;
    operation = op;
    resetInput = true;
}

// Equals handler
function handleEquals() {
    if (operation === null || resetInput) return;
    calculate();
    operation = null;
    resetInput = true;
}

// Calculation logic
function calculate() {
    try {
        if (operation === '/' && parseFloat(currentInput) === 0) {
            throw new Error("Can't divide by zero!");
        }
        
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        switch (operation) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '*': result = prev * current; break;
            case '/': result = prev / current; break;
            default: return;
        }
        
        // Round to 10 decimal places to avoid floating point errors
        currentInput = parseFloat(result.toFixed(10)).toString();
        previousInput = '';
    } catch (error) {
        currentInput = error.message;
        resetInput = true;
        operation = null;
    }
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        handleButtonClick(e.key);
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        handleButtonClick(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        handleButtonClick('=');
    } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
        handleButtonClick('C');
    } else if (e.key === '.') {
        handleButtonClick('.');
    }
});

// Initialize display
updateDisplay();