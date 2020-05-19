export default function CalculatorView($target) {
  this.$target = $target;

  this.render = () => {
    this.$target.innerHTML = `
    <p class="calculator__view__equation"></p>
    <p class="calculator__view__result"></p>
    `;
    this.equation = this.$target.querySelector(".calculator__view__equation");
    this.result = this.$target.querySelector(".calculator__view__result");
  };

  this.setState = (states) => {
    const { equation, result } = states;
    equation &&
      (this.$target.querySelector(
        ".calculator__view__equation"
      ).textContent = equation);
    result &&
      (this.$target.querySelector(
        ".calculator__view__equation"
      ).textContent = result);
  };
}
