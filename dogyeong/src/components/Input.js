import Button from './Button.js';
import ButtonInfo from './ButtonInfo.js';

export default class Input {
    constructor(container, handlers) {

        /**
         * 버튼 생성
         */
        this.numberBtns = [];

        this.clearBtn = new Button({ container, ...ButtonInfo.clearBtn });
        this.invertBtn = new Button({ container, ...ButtonInfo.invertBtn });
        this.percentBtn = new Button({ container, ...ButtonInfo.percentBtn });
        this.divisionBtn = new Button({ container, ...ButtonInfo.divisionBtn });

        this.numberBtns.push(new Button({ container, ...ButtonInfo[7] }))
        this.numberBtns.push(new Button({ container, ...ButtonInfo[8] }))
        this.numberBtns.push(new Button({ container, ...ButtonInfo[9] }))
        this.multBtn = new Button({ container, ...ButtonInfo.multBtn });

        this.numberBtns.push(new Button({ container, ...ButtonInfo[4] }))
        this.numberBtns.push(new Button({ container, ...ButtonInfo[5] }))
        this.numberBtns.push(new Button({ container, ...ButtonInfo[6] }))
        this.minusBtn = new Button({ container, ...ButtonInfo.minusBtn });

        this.numberBtns.push(new Button({ container, ...ButtonInfo[1] }))
        this.numberBtns.push(new Button({ container, ...ButtonInfo[2] }))
        this.numberBtns.push(new Button({ container, ...ButtonInfo[3] }))
        this.plusBtn = new Button({ container, ...ButtonInfo.plusBtn });
        
        this.numberBtns.push(new Button({ container, ...ButtonInfo[0] }))
        this.dotBtn = new Button({ container, ...ButtonInfo.dotBtn });
        this.equalBtn = new Button({ container, ...ButtonInfo.equalBtn });


        /**
         * 버튼 이벤트 바인딩
         */
    
        // AC
        this.clearBtn.element.addEventListener('click', handlers.handleClear);
        // 숫자
        this.numberBtns.forEach(btn => btn.element.addEventListener('click', (e) => handlers.handleNumber(e.target.dataset.number)));
        // invert
        this.invertBtn.element.addEventListener('click', handlers.handleInvert);
        // %
        this.percentBtn.element.addEventListener('click', handlers.handlePercent);
        // +,-,x,÷
        this.plusBtn.element.addEventListener('click', () => handlers.handleOperator('+'));
        this.minusBtn.element.addEventListener('click', () => handlers.handleOperator('-'));
        this.multBtn.element.addEventListener('click', () => handlers.handleOperator('*'));
        this.divisionBtn.element.addEventListener('click', () => handlers.handleOperator('/'));
        // =
        this.equalBtn.element.addEventListener('click', handlers.handleEqual);
        // .
        this.dotBtn.element.addEventListener('click', handlers.handleDot);

    }
        
}