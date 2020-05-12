import Output from './Output.js';
import Input from './Input.js';

export default class Calculator {

    constructor(target) {
        this.container = document.querySelector('.calculator');
        
        /**
         * 상수, 기본값
         */
        this.DEFAULT_RESULT = '0';
        this.OPRND_STATUS_L = 1;
        this.OPRND_STATUS_R = 2;

        /**
         * 결과 출력
         */
        this.Output = new Output(this.container);

        /**
         * 입력
         */
        this.Input = new Input(this.container, {
            handleClear: this.handleClear,
            handleDot: this.handleDot,
            handleEqual: this.handleEqual,
            handleInvert: this.handleInvert,
            handleNumber: this.handleNumber,
            handleOperator: this.handleOperator,
            handlePercent: this.handlePercent,
        });

        /**
         * 상태변수
         */
        this.operandL = '';
        this.operandR = '';
        this.operator = '';
        this.operandStatus = this.OPRND_STATUS_L;
        this.shouldOverwrite = true;

        /**
         * 초기값 출력
         */
        this.display();
    }

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
        
        this.Output.render(result);
    }
}


