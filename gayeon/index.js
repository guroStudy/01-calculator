const number = document.querySelectorAll('.btnNum');
const curNum = document.querySelector('.curNum');
const inputNum = document.querySelector('.textNum');
const operation = document.querySelectorAll('.op');
const operN = document.querySelectorAll('.opN');
const resultNum = document.querySelector('.resNum');
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
        if(numTurn){
            if(this.textContent === '.'){
                if(dot){
                    if(!opTurn){
                        inputNum.value = `0${this.textContent}`;
                        curNum.innerHTML += inputNum.value;
                        dot = false;
                        opTurn = true;
                    }
                    else{
                        inputNum.value = this.textContent;
                        curNum.innerHTML += this.textContent;
                        dot = false;
                    }
                }
            } else{
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
            }
            
        }
    });
}

//%,+/-
function opNumFunc(e){
    e.addEventListener('click', function(){
        op = this.textContent;

        switch(op){
            case '%':
                inputNum.value = Number(inputNum.value) * 0.01;
                break;
            case '+/-':
                inputNum.value = Number(inputNum.value) * (-1);
                break;   
        }

        curNum.innerHTML = inputNum.value;
        opTurn = true;

    });
}


//op 버튼 클릭
function calculate(e){
    e.addEventListener('click', function(){
        numTurn = true;
        if(opTurn){

            curNum.innerHTML += ` ${this.textContent} `;
                
            //처음 값
            if(num1 === ''){
                num1 = inputNum.value;
            } 
            
            //처음 값이 아닐경우 연산
            else{
                num2 = inputNum.value;
                num1 = opFunc(op, num1, num2); 
                num2 = '';                
            }
            
            op = this.textContent;
            inputNum.value = num1;
           
            numTurn = true;
            opTurn = false;
            dot = true;
            console.log(op);
        }
    })
}

//연산버튼 클릭
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
        case '^' :
            re = Math.pow(Number(num1), Number(num2));
            return re;
    }
}

//=클릭
function resultN(e){
    num2 = inputNum.value;
    num1 = opFunc(op, num1, num2);
    inputNum.value = num1;
    curNum.innerHTML = num1;
    op = '';
    num1 = '';
    numTurn = false;
}

//지우기
function fullDelFunc(e){
    inputNum.value = 0;
    curNum.innerHTML = '';
    num1 = '';
    num2 = '';
    opTurn = false;
    numTurn = true;
    dot = true;
}


number.forEach(btnNum);
operN.forEach(opNumFunc);
operation.forEach(calculate);
resultNum.addEventListener('click', resultN);
fullDelNum.addEventListener('click',fullDelFunc);