
export default class Output {
    constructor(container) {
        this.output = document.createElement('output');
        this.output.classList.add('output');

        container.appendChild(this.output);
    }

    render = (result) => {
        this.output.innerText = result;
    }
}