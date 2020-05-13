import Button from './Button.js';
import Output from './Output.js';

export default class Calculator {
  constructor($target) {
    this.leftNumber = '';
    this.rightNumber = '';
    this.operator = '';

    const calculator = document.createElement('section');
    calculator.className = 'calculator';

    this.numberButtons = [];
    this.output = new Output(calculator);
    this.clear = new Button(calculator, 'clear', 'C');
    this.invert = new Button(calculator, 'invert', '+/-');
    this.percent = new Button(calculator, 'percent', '%');
    this.divide = new Button(calculator, 'divide orange', '÷');
    this.numberButtons.push(new Button(calculator, 'number', '7'));
    this.numberButtons.push(new Button(calculator, 'number', '8'));
    this.numberButtons.push(new Button(calculator, 'number', '9'));
    this.multiply = new Button(calculator, 'multiply orange', '×');
    this.numberButtons.push(new Button(calculator, 'number', '4'));
    this.numberButtons.push(new Button(calculator, 'number', '5'));
    this.numberButtons.push(new Button(calculator, 'number', '6'));
    this.subtract = new Button(calculator, 'subtract orange', '-');
    this.numberButtons.push(new Button(calculator, 'number', '1'));
    this.numberButtons.push(new Button(calculator, 'number', '2'));
    this.numberButtons.push(new Button(calculator, 'number', '3'));
    this.plus = new Button(calculator, 'plus orange', '+');
    this.numberButtons.push(new Button(calculator, 'number zero', '0'));
    this.dot = new Button(calculator, 'dot', '.');
    this.equal = new Button(calculator, 'equal orange', '=');

    this.numberButtons.forEach(({ el }) => {
      el.addEventListener('click', this.handleNumber);
    });
    this.percent.el.addEventListener('click', this.handlePercent);
    this.clear.el.addEventListener('click', this.handleClear);
    this.invert.el.addEventListener('click', this.handleInvert);
    this.plus.el.addEventListener('click', () => this.handleOperator('+'));
    this.subtract.el.addEventListener('click', () => this.handleOperator('-'));
    this.multiply.el.addEventListener('click', () => this.handleOperator('*'));
    this.divide.el.addEventListener('click', () => this.handleOperator('/'));
    this.equal.el.addEventListener('click', this.handleEqual);
    this.dot.el.addEventListener('click', this.handleDot);

    $target.appendChild(calculator);
  }
  handleNumber = ({ target: { textContent: number } }) => {
    if (this.operator) {
      this.rightNumber += number;
      this.output.render(this.rightNumber);
    } else {
      this.leftNumber += number;
      this.output.render(this.leftNumber);
    }
  };
  handlePercent = () => {
    if (this.operator) {
      this.rightNumber = Number(this.rightNumber) / 100;
      this.output.render(this.rightNumber);
    } else {
      this.leftNumber = Number(this.leftNumber) / 100;
      this.output.render(this.leftNumber);
    }
  };
  handleClear = () => {
    this.leftNumber = '';
    this.rightNumber = '';
    this.operator = '';
    this.operatingLeft = true;
    this.output.render('0');
  };
  handleInvert = () => {
    if (this.operator) {
      this.rightNumber = -this.rightNumber;
      this.output.render(this.rightNumber);
    } else {
      this.leftNumber = -this.leftNumber;
      this.output.render(this.leftNumber);
    }
  };
  handleOperator = (operator) => {
    if (this.rightNumber) {
      this.leftNumber = this.calculate(this.leftNumber, this.rightNumber);
      this.rightNumber = '';
      this.output.render(this.leftNumber);
    }
    this.operator = operator;
  };
  handleEqual = () => {
    if (this.rightNumber) {
      this.leftNumber = this.calculate(this.leftNumber || 0, this.rightNumber);
      this.rightNumber = '';
    } else {
      this.leftNumber = this.calculate(this.leftNumber, this.leftNumber);
    }
    this.output.render(this.leftNumber);
  };
  calculate = (left, right) => {
    return eval(`${left}${this.operator}${right}`).toString();
  };
  handleDot = () => {
    if (!this.leftNumber) {
      return;
    }

    if (this.operator) {
      if (!this.rightNumber.includes('.')) {
        this.rightNumber = this.rightNumber + '.';
        this.output.render(this.rightNumber);
      }
    } else {
      if (!this.leftNumber.includes('.')) {
        this.leftNumber = this.leftNumber + '.';
        this.output.render(this.leftNumber);
      }
    }
  };
}
