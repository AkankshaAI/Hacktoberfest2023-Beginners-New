let num1 = "";
let num2 = "";
let operator = "";
let result = document.getElementById("result");

function number(num) {
  if (operator === "") {
    num1 += num;
    result.value = num1;
  } else {
    num2 += num;
    result.value = num2;
  }
}

function add() {
  operator = "+";
}

function subtract() {
  operator = "-";
}

function multiply() {
  operator = "*";
}

function divide() {
  operator = "/";
}

function clear() {
  num1 = "";
  num2 = "";
  operator = "";
  result.value = "";
}

function calculate() {
  let answer;
  switch (operator) {
    case "+":
      answer = parseInt(num1) + parseInt(num2);
      break;
    case "-":
      answer = parseInt(num1) - parseInt(num2);
      break;
    case "*":
      answer = parseInt(num1) * parseInt(num2);
      break;
    case "/":
      answer = parseInt(num1) / parseInt(num2);
      break;
  }
  result.value = answer;
}