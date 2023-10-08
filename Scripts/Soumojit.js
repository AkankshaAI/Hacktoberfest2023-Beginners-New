// Function to perform addition
function add(x, y) {
  return x + y;
}

// Function to perform subtraction
function subtract(x, y) {
  return x - y;
}

// Function to perform multiplication
function multiply(x, y) {
  return x * y;
}

// Function to perform division
function divide(x, y) {
  if (y === 0) {
    return "Division by zero is not allowed.";
  }
  return x / y;
}

// Get user input
const num1 = parseFloat(prompt("Enter the first number:"));
const num2 = parseFloat(prompt("Enter the second number:"));

// Perform operations
const operation = prompt("Enter the operation (+, -, *, /):");

let result;
switch (operation) {
  case "+":
    result = add(num1, num2);
    break;
  case "-":
    result = subtract(num1, num2);
    break;
  case "*":
    result = multiply(num1, num2);
    break;
  case "/":
    result = divide(num1, num2);
    break;
  default:
    result = "Invalid operation";
}

// Display the result
console.log(`Result: ${result}`);
