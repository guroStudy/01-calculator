export default class Calculator {

    constructor(target) {
        /**
         * 상수, 기본값
         */
        this.DEFAULT_RESULT = '0';
        this.OPRND_STATUS_L = 1;
        this.OPRND_STATUS_R = 2;

        /**
         * 입력 버튼
         */
        this.clearBtn = document.querySelector('.clear');
        this.invertBtn = document.querySelector('.invert');
        this.plusBtn = document.querySelector('.plus');
        this.minusBtn = document.querySelector('.minus');
        this.percentBtn = document.querySelector('.percent');
        this.divisionBtn = document.querySelector('.division');
        this.multBtn = document.querySelector('.multiplication');
        this.dotBtn = document.querySelector('.dot');
        this.equalBtn = document.querySelector('.equal');
        this.numberBtns = document.querySelectorAll('.number');


        /**
         * 결과 출력 영역
         */
        this.output = document.querySelector('#output');


        /**
         * 상태변수
         */
        this.operandL = '';
        this.operandR = '';
        this.operator = '';
        this.operandStatus = this.OPRND_STATUS_L;
        this.shouldOverwrite = true;

        /**
         * 이벤트 바인딩
         */
        this.init();
    }

    /**************************************
     * methods
     **************************************/

    /**
     * 계산결과 구하기
     */
    getCalculatedResult = (left, right) => {
        return eval(`${left}${this.operator}${right}`).toString();
    }


    /**
     * clear
     */
    clearExpression = () => {
        this.operandL = '';
        this.operandR = '';
        this.operator = '';
    }

    handleClear = () => {
        this.clearExpression();
        this.operandStatus = this.OPRND_STATUS_L;
        this.shouldOverwrite = true;
        this.display();
    }

    /**
     * number input
     */
    replaceNumber = (num) => {
        if (this.operandStatus === this.OPRND_STATUS_L)
            this.operandL = num;
        else
            this.operandR = num; 

        this.shouldOverwrite = false;
    }

    appendNumber = (num) => {
        if (this.operandStatus === this.OPRND_STATUS_L)
            this.operandL += num;
        else
            this.operandR += num; 
    }

    handleNumber = (num) => {
        if (this.shouldOverwrite) 
            this.replaceNumber(num);
        else
            this.appendNumber(num);

        this.display();
    }


    /**
     * operator
     */
    handleOperator = (op) => {
        if (this.operandStatus === this.OPRND_STATUS_L) {
            this.operandStatus = this.OPRND_STATUS_R;

            if (this.shouldOverwrite)
                this.operandL = '0';
        }
        else if (!this.shouldOverwrite) {
            this.operandL = this.getCalculatedResult(this.operandL, this.operandR);
            this.operandR = '';
        }

        this.shouldOverwrite = true;
        this.operator = op;

        this.display();
    }


    /**
     * percent
     */
    handlePercent = () => {
        if (this.operandStatus === this.OPRND_STATUS_L && this.shouldOverwrite) 
            return;
        else if (this.operandStatus === this.OPRND_STATUS_L || this.shouldOverwrite)
            this.operandL = eval(`${this.operandL}/100`).toString();
        else
            this.operandR = eval(`${this.operandR}/100`).toString();

        this.display();
    }


    /**
     * invert
     */
    handleInvert = () => {
        if (this.operandStatus === this.OPRND_STATUS_L && this.shouldOverwrite) 
            return;
        else if (this.operandStatus === this.OPRND_STATUS_L || this.shouldOverwrite)
            this.operandL = this.operandL.startsWith('-') ? this.operandL.slice(1) : `-${this.operandL}`;
        else
            this.operandR = this.operandR.startsWith('-') ? this.operandL.slice(1) : `-${this.operandR}`;
        
        this.display();
    }


    /**
     * equal
     */
    handleEqual = () => {
        if (this.operator === '') 
            return;
        else if (this.shouldOverwrite)
            this.operandL = this.getCalculatedResult(this.operandL, this.operandL);
        else {
            this.operandL = this.getCalculatedResult(this.operandL, this.operandR);
            this.operandR = '';
            this.shouldOverwrite = true;
        }
            
        this.display();
    }


    /**
     * dot
     */
    handleDot = () => {
        if (this.operandStatus === this.OPRND_STATUS_L && this.shouldOverwrite) 
            return;
        else if (this.operandStatus === this.OPRND_STATUS_L || this.shouldOverwrite)
            this.operandL = this.getDot(this.operandL);
        else
            this.opernadR = this.getDot(this.operandR);
        
        this.display();
    }

    getDot = (operand) => {
        if (!this.hasDot(operand))
            return operand + '.';
        
        return operand;        
    }

    hasDot = (num) => {
        return num.includes('.');
    }


    /**
     * display
     */
    display = () => {
        let result;

        if (this.operandStatus === this.OPRND_STATUS_L && this.shouldOverwrite) 
            result = this.DEFAULT_RESULT;
        else if (this.operandStatus === this.OPRND_STATUS_L || this.shouldOverwrite)
            result = this.operandL;
        else
            result = this.operandR;
        
        this.output.innerText = result;
    }

    init = () => {
        /**
         * 숫자버튼 이벤트 바인딩
         */
        this.numberBtns.forEach(btn => btn.addEventListener('click', (e) => this.handleNumber(e.target.dataset.number)));

        /**
         * AC버튼 이벤트 바인딩
         */
        this.clearBtn.addEventListener('click', this.handleClear);

        /**
         * invert버튼 이벤트 바인딩
         */
        this.invertBtn.addEventListener('click', this.handleInvert);

        /**
         *  % 버튼 이벤트 바인딩
         */
        this.percentBtn.addEventListener('click', this.handlePercent);


        /**
         * +,-,x,÷ 버튼 이벤트 바인딩
         */
        this.plusBtn.addEventListener('click', () => this.handleOperator('+'));
        this.minusBtn.addEventListener('click', () => this.handleOperator('-'));
        this.multBtn.addEventListener('click', () => this.handleOperator('*'));
        this.divisionBtn.addEventListener('click', () => this.handleOperator('/'));

        /**
         * (=)버튼 이벤트 바인딩
         */
        this.equalBtn.addEventListener('click', this.handleEqual);

        /**
         * (.)버튼 이벤트 바인딩
         */
        this.dotBtn.addEventListener('click', this.handleDot);

        this.display();
    }
}


