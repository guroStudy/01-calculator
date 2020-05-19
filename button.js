export default function Button($target, btnInfo = {}, btnHandler = undefined) {
  this.$target = $target;
  this.$el = document.createElement("button");

  const { className, value, text = value } = btnInfo;
  className && (this.$el.className = className);
  value && (this.$el.value = value);
  text && (this.$el.innerHTML = text);
  // this.$target.innerHTML = `` target el에서 layout을 잡아줘야됨
  // 여러 개의 button을 생성할 것을 고려해 button DOM을 button에서 생성하고, target에 append하는 방식을 선택

  this.bindEvent = () => {
    btnHandler && this.$el.addEventListener("click", btnHandler);
  };

  this.render = () => {
    this.$target.appendChild(this.$el);
  };
}
