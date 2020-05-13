const number = document.querySelectorAll('.btnNum');
const curNum = document.querySelector('.curNum');
const inputNum = document.querySelector('.textNum');
const operation = document.querySelectorAll('.op');
const result = document.getElementById('#result');
const fullDelNum = document.querySelector('.fullDel');

let num1 = '';
let num2 = '';
let op = '';

let opTurn = false;
let numTurn = true;
let dot = true;

//숫자 버튼 클릭
function btnNum(e){
    e.addEventListener('click', function(){

        //처음 입력하는 숫자인지 아닌지 판단
        if(!opTurn){
            inputNum.value = this.textContent;
            curNum.innerHTML += this.textContent;
            
            opTurn = true;
        }
        else{
            inputNum.value += this.textContent;
            curNum.innerHTML += this.textContent;
        }  
        
        
    });
}

number.forEach(btnNum);

//op 버튼 클릭
function calculate(e){
    e.addEventListener('click', function(){
        if(opTurn){
            
            curNum.innerHTML += ' '+this.textContent+' ';

            //처음 값
            if(num1 === ''){
                num1 = inputNum.value;
            } 
            
            //처음 값이 아닐경우 연산
            else{
                num2 = inputNum.value;
                num1 = opFunc(op, num1, num2); 
                num2 = '';
                console.log(num1,num2);
            }
            op = this.textContent;
            inputNum.value = num1;
            numTurn = true;
            opTurn = false;

            // = 을 클릭했을 때
            if(this.textContent === '='){
                curNum.innerHTML = num1;
                inputNum.value = num1;
               
                op = '';
                numTurn = false;
                opTurn = true;
            }

        }
    })
}

function opFunc(op, num1, num2){
    let re = 0;
    switch(op){
        case '+' :
            re = Number(num1) + Number(num2);
            return re;
        case '-' :
            re = Number(num1) - Number(num2);
            return re;
        case 'x' :
            re = Number(num1) * Number(num2);
            return re;
        case '/' :
            re = Number(num1) / Number(num2);
            return re;
    }
}

operation.forEach(calculate);


//지우기
function fullDelFunc(e){
    inputNum.value = '';
    curNum.innerHTML = '';
    num1 = '';
    num2 = '';
    op = '';
    opTurn = false;
    numTurn = true;
    dot = true;
}

fullDelNum.addEventListener('click',fullDelFunc);