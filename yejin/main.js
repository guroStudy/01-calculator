var numberClicked = false;

function add(char) {
  let display = document.getElementById('display');
  if(numberClicked === false) {  // 이전에 입력받은게 연산자인데 또 연산자가 나온 경우
    if(isNaN(char) === false) {
      display.value += char;
    }
  } else {
    display.value += char;
  }

  if(isNaN(char) === true) {  // 연산자인 경우
    numberClicked = false;
  } else {  // 숫자인 경우
    numberClicked = true;
  }
}

function calculate() {
  let display = document.getElementById('display');
  let result = eval(display.value);
  document.getElementById('result').value = result;
}

function reset() {
  document.getElementById('display').value = '';
  document.getElementById('result').value = '';
}