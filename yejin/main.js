var numberClicked = false;

function add(char) {
  let display = document.getElementById('display');
  if(numberClicked === false) {  // ������ �Է¹����� �������ε� �� �����ڰ� ���� ���
    if(isNaN(char) === false) {
      display.value += char;
    }
  } else {
    display.value += char;
  }

  if(isNaN(char) === true) {  // �������� ���
    numberClicked = false;
  } else {  // ������ ���
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