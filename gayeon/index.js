const number = document.querySelectorAll('.btnNum');
const curNum = document.querySelector('.curNum');
const inputNum = document.querySelector('.textNum');
const operation = document.querySelectorAll('.op');
const result = document.getElementById('#result');

let num1 = '';
let num2 = '';
let op = '';


//숫자 버튼 클릭
function btnNum(e){
    e.addEventListener('click', function(){
        inputNum.value += this.textContent;
        curNum.innerHTML += this.textContent;
    });
}

number.forEach(btnNum);

//op 버튼 클릭
function calculate(e){
    e.addEventListener('click', function(){
        op = this.textContent;
        curNum.innerHTML += ' '+this.textContent+' ';
        num1 = inputNum.value;
        inputNum.value = '';
        console.log(num1);
        console.log(op);
    })
}

operation.forEach(calculate);
