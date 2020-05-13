export default class Button {
  constructor($target, className, text) {
    this.button = document.createElement('button');
    this.button.className = className;
    this.button.textContent = text;

    this.button.addEventListener('mousedown', () =>
      this.button.classList.add('active')
    );
    this.button.addEventListener('mouseup', () =>
      this.button.classList.remove('active')
    );
    this.button.addEventListener('mouseout', () =>
      this.button.classList.remove('active')
    );

    $target.appendChild(this.button);
  }
  get el() {
    return this.button;
  }
}
