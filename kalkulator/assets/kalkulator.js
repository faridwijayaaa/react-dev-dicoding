console.log("Selamat datang di Web Kalkulator")

const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    // waitingForSecondNumber: false,
};

updateDisplay = () => {
    document.querySelector('.displayNumber').innerHTML = calculator.displayNumber;
};

clearAll = () => {
    calculator.displayNumber = 0;
    calculator.operator = '';
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
    return;
};

inverseNumber = () => {
    if (calculator.displayNumber == 0) {
        return;
    }

    calculator.displayNumber = calculator.displayNumber * -1;
}

handleOperator = (operator) => {
    if(calculator.operator === '') {
        calculator.firstNumber = calculator.displayNumber;
    }
    
    calculator.operator = operator;
    calculator.displayNumber = '';
}

performCalculation = () => {
    if(calculator.operator === '' || calculator.displayNumber === '') {
        alert('Anda belum memasukkan operator');
    } else {

        let result = 0;
        switch (calculator.operator) {
            case '+':
                result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
                break;
            case '-':
                result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
                break;
            default:
                break;
        }

        calculator.displayNumber = result;
    }
}

inputDigit = (digit) => {
    if (calculator.displayNumber == 0) {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}

const buttons = document.querySelectorAll('.button');
const operators = document.querySelectorAll('.operator');

operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        handleOperator(event.target.innerHTML);
    })
})

for (const button of buttons) {
    button.addEventListener('click', (event) => {
        const target = event.target;

        if(target.classList.contains('clear')){
            clearAll();
            updateDisplay();
            return;
        }

        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }
         
        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            calculator.firstNumber = calculator.displayNumber;
            calculator.displayNumber = '';
            return;
        }
         
        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerHTML);
        updateDisplay();
    });
};


// Error terdapat apabila menekan equals lebih dari 1x
// 