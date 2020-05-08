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
 * 결과 출력 영역, 계산결과
 */
const output = document.querySelector('#output');
let result = DEFAULT_RESULT;
let operandL = '', operandR = '', operator = '';
let shouldOverwrite = true;


function clearExpression() {
    operandL = '';
    operandR = '';
    operator = '';
}

function allClear() {
    clearExpression();
    display();
}



/**
 * 숫자버튼 이벤트 바인딩
 */
numberBtns.forEach(btn => {
    btn.addEventListener('click', appendNumber);
})

/**
 * AC버튼 이벤트 바인딩
 */
clearBtn.addEventListener('click', allClear);

/**
 * 
 */
function appendNumber() {
    if (shouldOverwrite) {
        result = this.dataset.number;
        shouldOverwrite = false;
    }
    else {
        result += this.dataset.number;
    }
    display();
}

/**
 * 
 */
function display() {
    output.innerText = result;
}

display();



