
export default class Button {
    constructor({ container, className, number, text }) {
        this.button = document.createElement('button');
        this.button.className = className;
        if (number)
            this.button.dataset.number = number;
        this.button.innerText = text;
        
        this.button.addEventListener('mousedown', () => this.button.classList.add('active'))
        this.button.addEventListener('mouseup', () => this.button.classList.remove('active'))
        this.button.addEventListener('mouseout', () => this.button.classList.remove('active'))

        container.appendChild(this.button);
    }

    get element() {
        return this.button;
    }
}