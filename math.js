// set element
const result = document.getElementById("result");
const expression = document.getElementById("expression");
const buttons = document.querySelectorAll(".btn");

// cal state
let firstNumber = null;
let operator = null;
let waitingForSecond = false;

// helper function 
function calculate(a, b, op) {
  
  switch(op) {
    case "divide":
      return b === 0 ? "Error" : a / b;

    case "multiply":
      return a * b;
      
    case "subtract":
      return a -b;
      
    case "add":
      return a + b;
      
    case "percent":
      return a * (b / 100);
      
    default:
      return b;
  }
}

// main logic
buttons.forEach(btn => {

  btn.addEventListener("click", () => {

    // clear
    if(btn.dataset.action === "clear") {
      result.value = "0";
      expression.textContent = "";
      firstNumber = null;
      operator = null;
      waitingForSecond = false;
      return;
    }

    // number
    if(btn.dataset.value){

      if(waitingForSecond) {
        result.value = btn.dataset.value;
        waitingForSecond = false;
        return;
      }
      else {
        result.value =
          result.value === "0"
          ? btn.dataset.value
          :result.value + btn.dataset.value;
      }
      return;
    }

    // operator logic
    if(btn.dataset.action && btn.dataset.action !== "equals") {
      firstNumber = Number(result.value);
      operator = btn.dataset.action;
      waitingForSecond = true;
      // create expression text
      expression.textContent = `${firstNumber} ${btn.innerText}`;
      return;
    }

    // equals
    if(btn.dataset.action === "equals"){
      if(operator === null) return;
      const secondNumber = Number(result.value);
      const finalResult = calculate(firstNumber, secondNumber, operator);

      // UI Update f -> op -> s
      expression.textContent = `${firstNumber} ${expression.textContent.split(" ")[1]} ${secondNumber} =`;


      // 
      if (finalResult === "Error") {
        result.value = "Error";
        firstNumber = null;
        operator = null;
        waitingForSecond = true;
        return;
      };
    }
    
  });
});