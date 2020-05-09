
/**
 * 상수, 기본값
 */
const DEFAULT_RESULT = '0';


/**
 * 입력 버튼
 */
const clearBtn = document.querySelector('.clear');
const invertBtn = document.querySelector('.invert');
const plusBtn = document.querySelector('.plus');
const minusBtn = document.querySelector('.minus');
const percentBtn = document.querySelector('.percent');
const divisionBtn = document.querySelector('.division');
const multBtn = document.querySelector('.multiplication');
const dotBtn = document.querySelector('.dot');
const equalBtn = document.querySelector('.equal');
const numberBtns = document.querySelectorAll('.number');


/**
 * 결과 출력 영역
 */
const output = document.querySelector('#output');


/**
 * 상태변수
 */
let operandL = '', operandR = '', operator = '';
let operandStatus = 1;
let shouldOverwrite = true;


/**
 * 계산결과 구하기
 */
function getCalculatedResult(left, right) {
    return eval(`${left}${operator}${right}`).toString();
}


/**
 * clear
 */
function clearExpression() {
    operandL = '';
    operandR = '';
    operator = '';
}

function handleClear() {
    clearExpression();
    operandStatus = 1;
    shouldOverwrite = true;
    display();
}

/**
 * number input
 */
function replaceNumber(num) {
    if (operandStatus === 1)
        operandL = num;
    else
        operandR = num; 

    shouldOverwrite = false;
}

function appendNumber(num) {
    if (operandStatus === 1)
        operandL += num;
    else
        operandR += num; 
}

function handleNumber() {
    if (shouldOverwrite) 
        replaceNumber(this.dataset.number);
    else
        appendNumber(this.dataset.number);

    display();
}


/**
 * operator
 */
function handleOperator(op) {
    if (operandStatus === 1) {
        operandStatus = 2;

        if (shouldOverwrite)
            operandL = '0';
    }
    else if (!shouldOverwrite) {
        operandL = getCalculatedResult(operandL, operandR);
        operandR = '';
    }

    shouldOverwrite = true;
    operator = op;

    display();
}




/**
 * percent
 */
function handlePercent() {
    if (operandStatus === 1 && shouldOverwrite) 
        return;
    else if (operandStatus === 1 || shouldOverwrite)
        operandL = eval(`${operandL}/100`).toString();
    else
        operandR = eval(`${operandR}/100`).toString();

    display();
}


/**
 * invert
 */
function handleInvert() {
    if (operandStatus === 1 && shouldOverwrite) 
        return;
    else if (operandStatus === 1 || shouldOverwrite)
        operandL = operandL.startsWith('-') ? operandL.slice(1) : `-${operandL}`;
    else
        operandR = operandR.startsWith('-') ? operandL.slice(1) : `-${operandR}`;
    
    display();
}

function handleEqual() {
    if (operator === '') 
        return;
    else if (shouldOverwrite)
        operandL = getCalculatedResult(operandL, operandL);
    else {
        operandL = getCalculatedResult(operandL, operandR);
        operandR = '';
        shouldOverwrite = true;
    }
        
    display();
}


/**
 * display
 */
function display() {
    let result;

    if (operandStatus === 1 && shouldOverwrite) 
        result = DEFAULT_RESULT;
    else if (operandStatus === 1 || shouldOverwrite)
        result = operandL;
    else
        result = operandR;
    
    output.innerText = result;
}





/**
 * 숫자버튼 이벤트 바인딩
 */
numberBtns.forEach(btn => {
    btn.addEventListener('click', handleNumber);
})

/**
 * AC버튼 이벤트 바인딩
 */
clearBtn.addEventListener('click', handleClear);

/**
 * invert버튼 이벤트 바인딩
 */
invertBtn.addEventListener('click', handleInvert);

/**
 *  % 버튼 이벤트 바인딩
 */
percentBtn.addEventListener('click', handlePercent);


/**
 * +,-,x,÷ 버튼 이벤트 바인딩
 */
plusBtn.addEventListener('click', function() { 
    handleOperator('+') 
});

minusBtn.addEventListener('click', function() { 
    handleOperator('-') 
});

multBtn.addEventListener('click', function() { 
    handleOperator('*') 
});

divisionBtn.addEventListener('click', function() { 
    handleOperator('/') 
});

/**
 * (=)버튼 이벤트 바인딩
 */
equalBtn.addEventListener('click', handleEqual);


display();



