/**************************************
 * constants, variables, elements
 **************************************/

/**
 * 상수, 기본값
 */
const DEFAULT_RESULT = '0';
const OPRND_STATUS_L = 1;
const OPRND_STATUS_R = 2;


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
let operandStatus = OPRND_STATUS_L;
let shouldOverwrite = true;


/**************************************
 * functions
 **************************************/

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
    operandStatus = OPRND_STATUS_L;
    shouldOverwrite = true;
    display();
}

/**
 * number input
 */
function replaceNumber(num) {
    if (operandStatus === OPRND_STATUS_L)
        operandL = num;
    else
        operandR = num; 

    shouldOverwrite = false;
}

function appendNumber(num) {
    if (operandStatus === OPRND_STATUS_L)
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
    if (operandStatus === OPRND_STATUS_L) {
        operandStatus = OPRND_STATUS_R;

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
    if (operandStatus === OPRND_STATUS_L && shouldOverwrite) 
        return;
    else if (operandStatus === OPRND_STATUS_L || shouldOverwrite)
        operandL = eval(`${operandL}/100`).toString();
    else
        operandR = eval(`${operandR}/100`).toString();

    display();
}


/**
 * invert
 */
function handleInvert() {
    if (operandStatus === OPRND_STATUS_L && shouldOverwrite) 
        return;
    else if (operandStatus === OPRND_STATUS_L || shouldOverwrite)
        operandL = operandL.startsWith('-') ? operandL.slice(1) : `-${operandL}`;
    else
        operandR = operandR.startsWith('-') ? operandL.slice(1) : `-${operandR}`;
    
    display();
}


/**
 * equal
 */
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
 * dot
 */
function handleDot() {
    if (operandStatus === OPRND_STATUS_L && shouldOverwrite) 
        return;
    else if (operandStatus === OPRND_STATUS_L || shouldOverwrite)
        operandL = getDot(operandL);
    else
        opernadR = getDot(operandR);
      
    display();
}

function getDot(operand) {
    if (!hasDot(operand))
        return operand + '.';
    
    return operand;        
}

function hasDot(num) {
    return num.includes('.');
}


/**
 * display
 */
function display() {
    let result;

    if (operandStatus === OPRND_STATUS_L && shouldOverwrite) 
        result = DEFAULT_RESULT;
    else if (operandStatus === OPRND_STATUS_L || shouldOverwrite)
        result = operandL;
    else
        result = operandR;
    
    output.innerText = result;
}



/**************************************
 * event binding
 **************************************/

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

/**
 * (.)버튼 이벤트 바인딩
 */
dotBtn.addEventListener('click', handleDot);


display();



