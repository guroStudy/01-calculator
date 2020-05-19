// const btnLayout =
// [
//     [{value: 'c',className:'allClear',text:'AC'}, {value: 'delete', text:'del'},{value:'/',text:'&divides'}],
//     [{value: '7'},{value: '8'},{value: '9'}],
//     [{value: '*',text:'&times'},{value: '4'},{value: '5'},{value: '6'}]
// ];

import CalculatorKeypad from "./CalculatorKeypad.js";
import CalculatorView from "./CalculatorView.js";
import btnsLayout from "./btnsLayout.js";
import btnsHandlers from "./btnsHandlers.js";

export default function App($target) {
  const calculate = (operator, before, after) => {
    switch (operator) {
      case "+":
        return before + after;
      case "-":
        return before - after;
      case "*":
        return before * after;
      case "/":
        return before / after;
    }
  };
  this.$target = $target;

  this.init = () => {
    this.$target.innerHTML = `
      <div id="calculator-view-container"></div>
      <div id="calculator-keypad-container"></div>
      `;

    // this.calculatorView = new CalculatorView(
    //   document.getElementById("calculator-view-container")
    // );

    // this.calculatorKeypad = new CalculatorKeypad(
    //   document.getElementById("calculator-keypad-container"),
    //   "calculator__keypad",
    //   btnsLayout,
    //   btnsHandlers.call(this)
    // );

    this.components = {
      calculatorView: new CalculatorView(
        document.getElementById("calculator-view-container")
      ),
      calculatorKeypad: new CalculatorKeypad(
        document.getElementById("calculator-keypad-container"),
        "calculator__keypad",
        btnsLayout,
        btnsHandlers.call(this)
      ),
    };

    // this.components = {
    //   calculatorView: this.calculatorView,
    //   calculatorKeypad: this.calculatorKeypad,
    // };
  };

  this.render = () => {
    Object.values(this.components).forEach((component) => component.render());
    this.equation = this.components.calculatorView.equation;
    this.result = this.components.calculatorView.result;
  };

  this.bindEvent = () => this.components.calculatorKeypad.bindEvent();

  this.setState = (states) => {
    this.components.calculatorView.setState(states);
  };
}
