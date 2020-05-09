/**
 * 버튼에 클릭 이벤트 걸기
 */
const buttons = document.querySelectorAll('.button');

const setButtonActive = function(e) {
    e.target.classList.add('active');
}

const setButtonDefault = function(e) {
    e.target.classList.remove('active');
}

buttons.forEach(el => {
    el.addEventListener('mousedown', setButtonActive);
    el.addEventListener('mouseup', setButtonDefault);
    el.addEventListener('mouseout', setButtonDefault);
})

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
        operandL = getCalculateResult();
        operandR = '';
    }

    shouldOverwrite = true;
    operator = op;

    display();
}

/**
 * 계산결과 구하기
 */
function getCalculateResult() {
    return eval(`${operandL}${operator}${operandR}`).toString();
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


display();



