 function handleKeyPress(event) {
    var keyCode = event.keyCode || event.which; 
    var allowedKeyCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57,  // 0-9
                           96, 97, 98, 99, 100, 101, 102, 103, 104, 105,  // numpad 0-9
                           106, 107, 109, 111,  // *, +, -, /
                           8, 46, 37, 39];  // Backspace, Delete, Left Arrow, Right Arrow
    if (allowedKeyCodes.indexOf(keyCode) === -1) {
        // Prevent the default behavior (i.e., do not allow input)
        event.preventDefault();
    }
}

 const input=document.querySelector(".input"),
       output=document.querySelector(".output"),
       deniedOperators ="*/.+-",
       Allowed ="0123456789";
       let expression; 
function appendToDisplay(value) {
  //check valid expression
    let LastInputValue = input.value.charAt(input.value.length - 1);
    let secondOfToLastInputValue = input.value.charAt(input.value.length - 2);
    if(deniedOperators.includes(LastInputValue) && (value=="*" || value=="/")) {  
         input.focus();
    }else if(deniedOperators.includes(LastInputValue) && deniedOperators.includes(secondOfToLastInputValue) && !Allowed.includes(value)) {  
        input.focus();
    }else {
        if(LastInputValue=="%" && Allowed.includes(value)){
            input.value += "*"+value;
        }else{
            input.value += value;
        }
         expression=input.value;
         input.focus();
         output.innerHTML=evaluateExpression(expression);
    }  
}
     
function clearDisplay() { 
    input.value = "";
    output.innerHTML="";
    input.focus();
}

function calculate() {
    if(expression!=""){
        input.value=evaluateExpression(expression);
    }else{
        input.value="";
    } 
    output.innerHTML="";
}

function deleteNumber() {  
    input.value = input.value.slice(0, -1);
    input.focus(); 
    expression=input.value;
    if(expression!=""){
        output.innerHTML=evaluateExpression(expression);
    }else{
        output.innerHTML="";
    }
}
function evaluateExpression(expression) {
//Evaluate percentages.
    while (expression.match(/(\d*\.?\d+)%/)) {
        let matches = expression.match(/(\d*\.?\d+)%/);
        let persentResult = matches[1]/100;
        expression = expression.replace(matches[0], persentResult);
    }
//Evaluate multiplication/division expressions.
    while (expression.match(/([-]?\d*\.?\d+)\s*([\/\*])\s*([-+]?\d*\.?\d+)/)) {
        let matches = expression.match(/([-]?\d*\.?\d+)\s*([\/\*])\s*([-+]?\d*\.?\d+)/);
        let result = (matches[2] == '*') ?  matches[1] * matches[3] : matches[1] / matches[3];
        expression = expression.replace(matches[0], result);
    }
//Evaluate addition/subtraction expressions.
    while (expression.match(/([-+]?\d*\.?\d+)\s*([-+])\s*([-+]?\d*\.?\d+)/)) {
        let matches = expression.match(/([-+]?\d*\.?\d+)\s*([-+])\s*([-+]?\d*\.?\d+)/);
        let operator = matches[2];
        let result = (operator == '+') ?  parseFloat(matches[1]) + parseFloat(matches[3]) : matches[1] - matches[3];
        expression = expression.replace(matches[0], result);
    }
    return parseFloat(expression);
}

/* 
The regular expression above captures segments of the given expression.
let expration = 2.3 + 3
- ([-+]?\d*\.?\d+):  This part matches a number, which may have an optional sign (+ or -), 
   followed by zero or more digits (\d*), optionally followed by a decimal point (\.?), and then followed by one or more digits (\d+).
   This captures the first number in the expression.  (2.3)
- \s*: This part matches zero or more whitespace characters. It allows for optional whitespace between the numbers and the operator.  matches the space before '+'.
- ([-+]) or % or ([\/\*]) :  It captures the operator. (+)
-\s*  matches the space after '+'.
after that use again this methods for left expration
*/


