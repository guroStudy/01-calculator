import Button from "./Button.js";

export default function CalculatorKeypad(
  $target,
  _className,
  btnsLayout,
  btnsHandlers
) {
  this.$target = $target;

  this.$el = document.createElement("div");
  this.$el.className = _className;

  this.btnsLayout = btnsLayout;
  this.btns = {};

  this.render = () => {
    Object.entries(this.btnsLayout).forEach(([id, btnInfo]) => {
      const { type } = btnInfo;
      if (type) {
        // type이 있는 info만 사용해 버튼 생성
        this.btns[id] = new Button(this.$el, btnInfo, btnsHandlers[type]);
        // common className 추가
        const commonClassName = this.btnsLayout.common.commonClassName;
        let originClassName = console.log(commonClassName);
        commonClassName &&
          (this.btns[id].$el.className = !this.btns[id].$el.className
            ? commonClassName
            : this.btns[id].$el.className + " " + commonClassName);
        // 생성된 버튼 렌더링
        this.btns[id].render();
      }
    });

    this.$target.appendChild(this.$el);
  };

  this.bindEvent = () => {
    Object.values(this.btns).forEach((btn) => btn.bindEvent());
  };
}
