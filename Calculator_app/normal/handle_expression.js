const input=document.querySelector(".input"),
       output=document.querySelector(".output"),
       history_list = document.querySelector(".lists"),
       deniedOperators ="(*/.+-)",
       Allowed ="0123456789!%[]lge,"; 
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
function send_expressions(expressions) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "calculator_process.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let data = xhr.responseText;
            if(output.style.display=='none'){
                output.innerHTML=data;
            }else{
                output.innerHTML="= "+data;
            }
        }
    };
    xhr.send("expressions=" + encodeURIComponent(expressions));
}

function appendToDisplay(value) {
     // Save the current caret position and Update the value of the input
    let caretPosition = input.selectionStart;
    let currentValue = input.value;
    let  newValue = currentValue.slice(0, caretPosition) + value + currentValue.slice(caretPosition);
     //capture the value of before and after caret
    let lastCharBeforeCaret = input.value.charAt(caretPosition - 1);
    let secondOfToLastCharBeforeCaret = input.value.charAt(caretPosition - 2);
    let firstCharAfterCaret = input.value.charAt(caretPosition);
    let secondOfTofirstCharAfterCaret = input.value.charAt(caretPosition +1);
//check valid expression

    if(value=="open") {
        if(lastCharBeforeCaret=="(" || (lastCharBeforeCaret=="" && (Allowed.includes(firstCharAfterCaret) || firstCharAfterCaret=="+" || firstCharAfterCaret=="-"))){
            input.value =currentValue.slice(0, caretPosition) + "(" + currentValue.slice(caretPosition);
            input.setSelectionRange(caretPosition + 1, caretPosition + 1);
            send_expressions(input.value);
           
        }else if(Allowed.includes(lastCharBeforeCaret) && Allowed.includes(firstCharAfterCaret)
        && firstCharAfterCaret!="!" && firstCharAfterCaret!="%" && firstCharAfterCaret!=","){
            if(lastCharBeforeCaret=="["){
                input.value =currentValue.slice(0, caretPosition) + "(" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }else{
                input.value =currentValue.slice(0, caretPosition) + "*(" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                send_expressions(input.value);
            }
        }else if(Allowed.includes(secondOfToLastCharBeforeCaret) && lastCharBeforeCaret==" " && Allowed.includes(firstCharAfterCaret)
        && firstCharAfterCaret!="!" && firstCharAfterCaret!="%" && firstCharAfterCaret!=","){
            if(secondOfToLastCharBeforeCaret=="["){
                input.value =currentValue.slice(0, caretPosition) + "(" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }else{
                input.value =currentValue.slice(0, caretPosition) + "*(" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                send_expressions(input.value);
            }
        }else if(Allowed.includes(lastCharBeforeCaret) && firstCharAfterCaret==" " && Allowed.includes(secondOfTofirstCharAfterCaret)
            && secondOfTofirstCharAfterCaret!="!" && secondOfTofirstCharAfterCaret!="%"){
                if(lastCharBeforeCaret=="[" || lastCharBeforeCaret==","){
                    input.value =currentValue.slice(0, caretPosition) + "(" + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                    send_expressions(input.value);
                }else{
                    input.value =currentValue.slice(0, caretPosition) + "*(" + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                    send_expressions(input.value);
                }
            }else if(Allowed.includes(lastCharBeforeCaret) && deniedOperators.includes(firstCharAfterCaret)
            && (firstCharAfterCaret=="+" || firstCharAfterCaret=="-")){
                if(lastCharBeforeCaret=="]"){
                    input.value =currentValue.slice(0, caretPosition) + "*(" + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                    send_expressions(input.value);
                }else{
                    input.value =currentValue.slice(0, caretPosition) + "(" + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                    send_expressions(input.value);
                }
            }else if(Allowed.includes(lastCharBeforeCaret) && firstCharAfterCaret==" " && deniedOperators.includes(secondOfTofirstCharAfterCaret)
            && (secondOfTofirstCharAfterCaret=="+" || secondOfTofirstCharAfterCaret=="-")){
                input.value =currentValue.slice(0, caretPosition) + "(" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }else if(Allowed.includes(secondOfToLastCharBeforeCaret) && lastCharBeforeCaret==" " && deniedOperators.includes(firstCharAfterCaret)
            && (firstCharAfterCaret=="+" || firstCharAfterCaret=="-")){
                input.value =currentValue.slice(0, caretPosition) + "(" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }else if(deniedOperators.includes(lastCharBeforeCaret) && Allowed.includes(firstCharAfterCaret) && lastCharBeforeCaret!="."
            && firstCharAfterCaret!="!" && firstCharAfterCaret!="%" && firstCharAfterCaret!=","){
                if(lastCharBeforeCaret==")"){
                    input.value =currentValue.slice(0, caretPosition) + "*(" + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                    send_expressions(input.value);
                }else{
                    input.value =currentValue.slice(0, caretPosition) + "(" + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                    send_expressions(input.value);
                }
            }else if(deniedOperators.includes(secondOfToLastCharBeforeCaret) && lastCharBeforeCaret==" " && Allowed.includes(firstCharAfterCaret) && secondOfToLastCharBeforeCaret!="."
            && firstCharAfterCaret!="!" && firstCharAfterCaret!="%" && firstCharAfterCaret!=","){
                if(secondOfToLastCharBeforeCaret==")"){
                    input.value =currentValue.slice(0, caretPosition) + "*(" + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                    send_expressions(input.value);
                }else{
                    input.value =currentValue.slice(0, caretPosition) + "(" + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                    send_expressions(input.value);
                }
            }else if(deniedOperators.includes(lastCharBeforeCaret) && firstCharAfterCaret==" " && Allowed.includes(secondOfTofirstCharAfterCaret) && lastCharBeforeCaret!="."
            && secondOfTofirstCharAfterCaret!="!" && secondOfTofirstCharAfterCaret!="%"){
                if(lastCharBeforeCaret==")"){
                    input.value =currentValue.slice(0, caretPosition) + "*(" + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                    send_expressions(input.value);
                }else{
                    input.value =currentValue.slice(0, caretPosition) + "(" + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                    send_expressions(input.value);
                }
            }else if(deniedOperators.includes(lastCharBeforeCaret) && deniedOperators.includes(firstCharAfterCaret)
            && lastCharBeforeCaret!=")" && lastCharBeforeCaret!="."){
                input.value =currentValue.slice(0, caretPosition) + "(" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }else if(deniedOperators.includes(secondOfToLastCharBeforeCaret) && lastCharBeforeCaret==" " && deniedOperators.includes(firstCharAfterCaret)
            && secondOfToLastCharBeforeCaret!=")"){
                input.value =currentValue.slice(0, caretPosition) + "(" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }else if(deniedOperators.includes(lastCharBeforeCaret) && firstCharAfterCaret==" " && deniedOperators.includes(secondOfTofirstCharAfterCaret)
            && lastCharBeforeCaret!=")"){
                input.value =currentValue.slice(0, caretPosition) + "(" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
    }else if(value=="closed"){
        if(Allowed.includes(lastCharBeforeCaret) && Allowed.includes(firstCharAfterCaret) && lastCharBeforeCaret!="" 
        && lastCharBeforeCaret!="," && lastCharBeforeCaret!="["){
            if(firstCharAfterCaret!="!" && firstCharAfterCaret!="%" && firstCharAfterCaret!="," && firstCharAfterCaret!="" && firstCharAfterCaret!="]"){
                input.value =currentValue.slice(0, caretPosition) + ")*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                send_expressions(input.value);
            }else{
                input.value =currentValue.slice(0, caretPosition) + ")" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
            
        }else if(Allowed.includes(secondOfToLastCharBeforeCaret) && Allowed.includes(firstCharAfterCaret) && lastCharBeforeCaret==" " 
        && secondOfToLastCharBeforeCaret!="," && secondOfToLastCharBeforeCaret!="["){
            if(firstCharAfterCaret!="!" && firstCharAfterCaret!="%" && firstCharAfterCaret!="," && firstCharAfterCaret!="]"){
                input.value =currentValue.slice(0, caretPosition) + ")*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                send_expressions(input.value);
            }else{
                input.value =currentValue.slice(0, caretPosition) + ")" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
            
        }else if(Allowed.includes(lastCharBeforeCaret) && Allowed.includes(secondOfTofirstCharAfterCaret) && firstCharAfterCaret==" " 
        && lastCharBeforeCaret!="," && lastCharBeforeCaret!="["){
            if(secondOfTofirstCharAfterCaret!="!" && secondOfTofirstCharAfterCaret!="%" && secondOfTofirstCharAfterCaret!=","  && secondOfTofirstCharAfterCaret!="]"){
                input.value =currentValue.slice(0, caretPosition) + ")*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                send_expressions(input.value);
            }else{
                input.value =currentValue.slice(0, caretPosition) + ")" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
            
        }else if(Allowed.includes(lastCharBeforeCaret) && deniedOperators.includes(firstCharAfterCaret) && lastCharBeforeCaret!="" && lastCharBeforeCaret!="[" && lastCharBeforeCaret!=","){
            if(firstCharAfterCaret=="("){
                input.value =currentValue.slice(0, caretPosition) + ")*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                send_expressions(input.value);
            }else{
                input.value =currentValue.slice(0, caretPosition) + ")" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
            
        }else if(Allowed.includes(secondOfToLastCharBeforeCaret) && deniedOperators.includes(firstCharAfterCaret) && lastCharBeforeCaret==" " && secondOfToLastCharBeforeCaret!="[" && secondOfToLastCharBeforeCaret!=","){
            if(firstCharAfterCaret=="("){
                input.value =currentValue.slice(0, caretPosition) + ")*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                send_expressions(input.value);
            }else{
                input.value =currentValue.slice(0, caretPosition) + ")" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
            
        }else if(Allowed.includes(lastCharBeforeCaret) && deniedOperators.includes(secondOfTofirstCharAfterCaret) && firstCharAfterCaret==" " && lastCharBeforeCaret!="[" && lastCharBeforeCaret!=","){
            if(secondOfTofirstCharAfterCaret=="("){
                input.value =currentValue.slice(0, caretPosition) + ")*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                send_expressions(input.value);
            }else{
                input.value =currentValue.slice(0, caretPosition) + ")" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
            
        }else if(lastCharBeforeCaret==")"){
                input.value =currentValue.slice(0, caretPosition) + ")" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
        }

    }else if(value=="/"){
        if(Allowed.includes(lastCharBeforeCaret) && Allowed.includes(firstCharAfterCaret) && firstCharAfterCaret!="%"
        && firstCharAfterCaret!="!" && firstCharAfterCaret!="0"  && lastCharBeforeCaret!="[" && lastCharBeforeCaret!=","  && lastCharBeforeCaret!=""){
            if(firstCharAfterCaret!="]" && firstCharAfterCaret!=","){
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }else{
                input.value =currentValue.slice(0, caretPosition) + "/ " + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }else if(Allowed.includes(secondOfToLastCharBeforeCaret) && Allowed.includes(firstCharAfterCaret) && firstCharAfterCaret!="%"
        && firstCharAfterCaret!="!" && firstCharAfterCaret!="0"  && secondOfToLastCharBeforeCaret!="[" && secondOfToLastCharBeforeCaret!="," && lastCharBeforeCaret==" "){
            if(firstCharAfterCaret!="]" && firstCharAfterCaret!=","){
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }else{
                input.value =currentValue.slice(0, caretPosition-1) + "/ " + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition, caretPosition);
                send_expressions(input.value);
            }
        }else if(Allowed.includes(lastCharBeforeCaret) && Allowed.includes(secondOfTofirstCharAfterCaret) && secondOfTofirstCharAfterCaret!="%"
        && secondOfTofirstCharAfterCaret!="!" && secondOfTofirstCharAfterCaret!="0"  && lastCharBeforeCaret!="[" && lastCharBeforeCaret!="," && firstCharAfterCaret==" "){
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
        }else if(Allowed.includes(lastCharBeforeCaret) && (firstCharAfterCaret=="+"
        || firstCharAfterCaret=="-" || firstCharAfterCaret==")") && lastCharBeforeCaret!="[" && lastCharBeforeCaret!="," && lastCharBeforeCaret!=""){
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
        }else if(Allowed.includes(secondOfToLastCharBeforeCaret) && (firstCharAfterCaret=="+"
        || firstCharAfterCaret=="-" || firstCharAfterCaret==")") && secondOfToLastCharBeforeCaret!="[" && secondOfToLastCharBeforeCaret!="," && lastCharBeforeCaret==" "){
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
        }else if(Allowed.includes(lastCharBeforeCaret) && (secondOfTofirstCharAfterCaret=="+"
        || secondOfTofirstCharAfterCaret=="-" || secondOfTofirstCharAfterCaret==")") && lastCharBeforeCaret!="[" && lastCharBeforeCaret!="," && firstCharAfterCaret==" "){
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
        }else if(Allowed.includes(firstCharAfterCaret)&& firstCharAfterCaret!="0"  && lastCharBeforeCaret==")" 
         && firstCharAfterCaret!="%" && firstCharAfterCaret!="!"){
            if(firstCharAfterCaret=="]" || firstCharAfterCaret==","){
                input.value =currentValue.slice(0, caretPosition) + "/ " + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }else if(Allowed.includes(firstCharAfterCaret) && firstCharAfterCaret!="0"  && secondOfToLastCharBeforeCaret==")" && lastCharBeforeCaret==" " 
        && firstCharAfterCaret!="%" && firstCharAfterCaret!="!"){
           if(firstCharAfterCaret=="]" || firstCharAfterCaret==","){
               input.value =currentValue.slice(0, caretPosition-1) + "/ " + currentValue.slice(caretPosition);
               input.setSelectionRange(caretPosition, caretPosition);
               send_expressions(input.value);
           }else{
               input.value=newValue;
               input.setSelectionRange(caretPosition + 1, caretPosition + 1);
               send_expressions(input.value);
           }
       }else if(Allowed.includes(secondOfTofirstCharAfterCaret)&& secondOfTofirstCharAfterCaret!="0"  && lastCharBeforeCaret==")" && firstCharAfterCaret==" " 
       && secondOfTofirstCharAfterCaret!="%" && secondOfTofirstCharAfterCaret!="!"){
              input.value=newValue;
              input.setSelectionRange(caretPosition + 1, caretPosition + 1);
              send_expressions(input.value);
      }else if(lastCharBeforeCaret==")" && (firstCharAfterCaret=="+" || firstCharAfterCaret=="-")){
        input.value=newValue;
        input.setSelectionRange(caretPosition + 1, caretPosition + 1);
        send_expressions(input.value);
      }else if(secondOfToLastCharBeforeCaret==")"  && lastCharBeforeCaret==" " && (firstCharAfterCaret=="+" || firstCharAfterCaret=="-")){
        input.value=newValue;
        input.setSelectionRange(caretPosition + 1, caretPosition + 1);
        send_expressions(input.value);
      }else if(lastCharBeforeCaret==")"  && firstCharAfterCaret==" " && (secondOfTofirstCharAfterCaret=="+" || secondOfTofirstCharAfterCaret=="-")){
        input.value=newValue;
        input.setSelectionRange(caretPosition + 1, caretPosition + 1);
        send_expressions(input.value);
      }
    }else if(value=="*"){
        if(Allowed.includes(lastCharBeforeCaret) && Allowed.includes(firstCharAfterCaret) && firstCharAfterCaret!="%"
        && firstCharAfterCaret!="!" && lastCharBeforeCaret!="[" && lastCharBeforeCaret!=","  && lastCharBeforeCaret!=""){
            if(firstCharAfterCaret!="]" && firstCharAfterCaret!=","){
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }else{
                input.value =currentValue.slice(0, caretPosition) + "* " + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }else if(Allowed.includes(secondOfToLastCharBeforeCaret) && Allowed.includes(firstCharAfterCaret) && firstCharAfterCaret!="%"
        && firstCharAfterCaret!="!" && secondOfToLastCharBeforeCaret!="[" && secondOfToLastCharBeforeCaret!="," && lastCharBeforeCaret==" "){
            if(firstCharAfterCaret!="]" && firstCharAfterCaret!=","){
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }else{
                input.value =currentValue.slice(0, caretPosition-1) + "* " + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition, caretPosition);
                send_expressions(input.value);
            }
        }else if(Allowed.includes(lastCharBeforeCaret) && Allowed.includes(secondOfTofirstCharAfterCaret) && secondOfTofirstCharAfterCaret!="%"
        && secondOfTofirstCharAfterCaret!="!" && lastCharBeforeCaret!="[" && lastCharBeforeCaret!="," && firstCharAfterCaret==" "){
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
        }else if(Allowed.includes(lastCharBeforeCaret) && (firstCharAfterCaret=="+"
        || firstCharAfterCaret=="-" || firstCharAfterCaret==")") && lastCharBeforeCaret!="[" && lastCharBeforeCaret!="," && lastCharBeforeCaret!=""){
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
        }else if(Allowed.includes(secondOfToLastCharBeforeCaret) && (firstCharAfterCaret=="+"
        || firstCharAfterCaret=="-" || firstCharAfterCaret==")") && secondOfToLastCharBeforeCaret!="[" && secondOfToLastCharBeforeCaret!="," && lastCharBeforeCaret==" "){
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
        }else if(Allowed.includes(lastCharBeforeCaret) && (secondOfTofirstCharAfterCaret=="+"
        || secondOfTofirstCharAfterCaret=="-" || secondOfTofirstCharAfterCaret==")") && lastCharBeforeCaret!="[" && lastCharBeforeCaret!="," && firstCharAfterCaret==" "){
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
        }else if(Allowed.includes(firstCharAfterCaret) && lastCharBeforeCaret==")" 
         && firstCharAfterCaret!="%" && firstCharAfterCaret!="!"){
            if(firstCharAfterCaret=="]" || firstCharAfterCaret==","){
                input.value =currentValue.slice(0, caretPosition) + "* " + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }else if(Allowed.includes(firstCharAfterCaret) && secondOfToLastCharBeforeCaret==")" && lastCharBeforeCaret==" " 
        && firstCharAfterCaret!="%" && firstCharAfterCaret!="!"){
           if(firstCharAfterCaret=="]" || firstCharAfterCaret==","){
               input.value =currentValue.slice(0, caretPosition-1) + "* " + currentValue.slice(caretPosition);
               input.setSelectionRange(caretPosition, caretPosition);
               send_expressions(input.value);
           }else{
               input.value=newValue;
               input.setSelectionRange(caretPosition + 1, caretPosition + 1);
               send_expressions(input.value);
           }
       }else if(Allowed.includes(secondOfTofirstCharAfterCaret) && lastCharBeforeCaret==")" && firstCharAfterCaret==" " 
       && secondOfTofirstCharAfterCaret!="%" && secondOfTofirstCharAfterCaret!="!"){
              input.value=newValue;
              input.setSelectionRange(caretPosition + 1, caretPosition + 1);
              send_expressions(input.value);
      }else if(lastCharBeforeCaret==")" && (firstCharAfterCaret=="+" || firstCharAfterCaret=="-")){
        input.value=newValue;
        input.setSelectionRange(caretPosition + 1, caretPosition + 1);
        send_expressions(input.value);
      }else if(secondOfToLastCharBeforeCaret==")"  && lastCharBeforeCaret==" " && (firstCharAfterCaret=="+" || firstCharAfterCaret=="-")){
        input.value=newValue;
        input.setSelectionRange(caretPosition + 1, caretPosition + 1);
        send_expressions(input.value);
      }else if(lastCharBeforeCaret==")"  && firstCharAfterCaret==" " && (secondOfTofirstCharAfterCaret=="+" || secondOfTofirstCharAfterCaret=="-")){
        input.value=newValue;
        input.setSelectionRange(caretPosition + 1, caretPosition + 1);
        send_expressions(input.value);
      }
    }else if(value =="+"){
        if(Allowed.includes(lastCharBeforeCaret) && Allowed.includes(firstCharAfterCaret) && firstCharAfterCaret!="!" && firstCharAfterCaret!="%"){
            if(firstCharAfterCaret=="," || firstCharAfterCaret=="]"){
                input.value =currentValue.slice(0, caretPosition) + "+ " + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }else if(Allowed.includes(secondOfToLastCharBeforeCaret)  && lastCharBeforeCaret==" " && Allowed.includes(firstCharAfterCaret) && firstCharAfterCaret!="!" && firstCharAfterCaret!="%"){
            if(firstCharAfterCaret=="," || firstCharAfterCaret=="]"){
                input.value =currentValue.slice(0, caretPosition-1) + "+ " + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition, caretPosition);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }else if(Allowed.includes(lastCharBeforeCaret)  && firstCharAfterCaret==" " && Allowed.includes(secondOfTofirstCharAfterCaret) 
            && secondOfTofirstCharAfterCaret!="!" && secondOfTofirstCharAfterCaret!="%"){
            input.value=newValue;
            input.setSelectionRange(caretPosition + 1, caretPosition + 1);
            send_expressions(input.value);
        }else if(Allowed.includes(lastCharBeforeCaret)  && firstCharAfterCaret==")"){
            input.value =currentValue.slice(0, caretPosition) + "+ " + currentValue.slice(caretPosition);
            input.setSelectionRange(caretPosition + 1, caretPosition + 1);
            send_expressions(input.value);
        }else if(Allowed.includes(secondOfToLastCharBeforeCaret) && lastCharBeforeCaret==" "  && firstCharAfterCaret==")"){
            input.value =currentValue.slice(0, caretPosition-1) + "+ " + currentValue.slice(caretPosition);
            input.setSelectionRange(caretPosition, caretPosition);
            send_expressions(input.value);
        }else if(Allowed.includes(lastCharBeforeCaret) && firstCharAfterCaret==" "  && secondOfTofirstCharAfterCaret==")"){
            input.value=newValue;
            input.setSelectionRange(caretPosition + 1, caretPosition + 1);
            send_expressions(input.value);
        }else if(deniedOperators.includes(lastCharBeforeCaret) && Allowed.includes(firstCharAfterCaret) && lastCharBeforeCaret!="." 
        && lastCharBeforeCaret!="+" && lastCharBeforeCaret!="-" && firstCharAfterCaret!="%" && firstCharAfterCaret!="!"){
            if(firstCharAfterCaret=="," || firstCharAfterCaret=="]"){
                input.value =currentValue.slice(0, caretPosition) + "+ " + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
            
        }else if(deniedOperators.includes(secondOfToLastCharBeforeCaret) && Allowed.includes(firstCharAfterCaret) && lastCharBeforeCaret==" " && secondOfToLastCharBeforeCaret!="." 
        &&secondOfToLastCharBeforeCaret!="+" && secondOfToLastCharBeforeCaret!="-" && firstCharAfterCaret!="%" && firstCharAfterCaret!="!"){
            if(firstCharAfterCaret=="," || firstCharAfterCaret=="]"){
                input.value =currentValue.slice(0, caretPosition-1) + "+ " + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition, caretPosition);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
            
        }else if(deniedOperators.includes(lastCharBeforeCaret) && Allowed.includes(secondOfTofirstCharAfterCaret) && firstCharAfterCaret==" " && lastCharBeforeCaret!="." 
        &&lastCharBeforeCaret!="+" && lastCharBeforeCaret!="-" && secondOfTofirstCharAfterCaret!="%" && secondOfTofirstCharAfterCaret!="!"){
            input.value=newValue;
            input.setSelectionRange(caretPosition + 1, caretPosition + 1);
            send_expressions(input.value);
            
        }else if((lastCharBeforeCaret=="(" && firstCharAfterCaret=="(") || (lastCharBeforeCaret==")" && firstCharAfterCaret==")")){
            if(lastCharBeforeCaret==")" && firstCharAfterCaret==")"){
                    input.value =currentValue.slice(0, caretPosition) + "+ " + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition+1, caretPosition+1);
                    send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }else if(((secondOfToLastCharBeforeCaret=="(" && firstCharAfterCaret=="(") || (secondOfToLastCharBeforeCaret==")" && firstCharAfterCaret==")")) && lastCharBeforeCaret==" "){
            if(secondOfToLastCharBeforeCaret==")" && firstCharAfterCaret==")"){
                    input.value =currentValue.slice(0, caretPosition-1) + "+ " + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition, caretPosition);
                    send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }else if(((lastCharBeforeCaret=="(" && secondOfTofirstCharAfterCaret=="(") || (lastCharBeforeCaret==")" && secondOfTofirstCharAfterCaret==")")) && firstCharAfterCaret==" "){
            if(lastCharBeforeCaret==")" && secondOfTofirstCharAfterCaret==")"){
                    input.value =currentValue.slice(0, caretPosition) + "+" + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition+1, caretPosition+1);
                    send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }
    }else if(value =="-"){
        if(Allowed.includes(lastCharBeforeCaret) && Allowed.includes(firstCharAfterCaret) && firstCharAfterCaret!="!" && firstCharAfterCaret!="%"){
            if(firstCharAfterCaret=="," || firstCharAfterCaret=="]"){
                input.value =currentValue.slice(0, caretPosition) + "- " + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }else if(Allowed.includes(secondOfToLastCharBeforeCaret)  && lastCharBeforeCaret==" " && Allowed.includes(firstCharAfterCaret) && firstCharAfterCaret!="!" && firstCharAfterCaret!="%"){
            if(firstCharAfterCaret=="," || firstCharAfterCaret=="]"){
                input.value =currentValue.slice(0, caretPosition-1) + "- " + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition, caretPosition);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }else if(Allowed.includes(lastCharBeforeCaret)  && firstCharAfterCaret==" " && Allowed.includes(secondOfTofirstCharAfterCaret) 
            && secondOfTofirstCharAfterCaret!="!" && secondOfTofirstCharAfterCaret!="%"){
            input.value=newValue;
            input.setSelectionRange(caretPosition + 1, caretPosition + 1);
            send_expressions(input.value);
        }else if(Allowed.includes(lastCharBeforeCaret)  && firstCharAfterCaret==")"){
            input.value =currentValue.slice(0, caretPosition) + "- " + currentValue.slice(caretPosition);
            input.setSelectionRange(caretPosition + 1, caretPosition + 1);
            send_expressions(input.value);
        }else if(Allowed.includes(secondOfToLastCharBeforeCaret) && lastCharBeforeCaret==" "  && firstCharAfterCaret==")"){
            input.value =currentValue.slice(0, caretPosition-1) + "- " + currentValue.slice(caretPosition);
            input.setSelectionRange(caretPosition, caretPosition);
            send_expressions(input.value);
        }else if(Allowed.includes(lastCharBeforeCaret) && firstCharAfterCaret==" "  && secondOfTofirstCharAfterCaret==")"){
            input.value=newValue;
            input.setSelectionRange(caretPosition + 1, caretPosition + 1);
            send_expressions(input.value);
        }else if(deniedOperators.includes(lastCharBeforeCaret) && Allowed.includes(firstCharAfterCaret) && lastCharBeforeCaret!="." 
        && lastCharBeforeCaret!="+" && lastCharBeforeCaret!="-" && firstCharAfterCaret!="%" && firstCharAfterCaret!="!"){
            if(firstCharAfterCaret=="," || firstCharAfterCaret=="]"){
                input.value =currentValue.slice(0, caretPosition) + "- " + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
            
        }else if(deniedOperators.includes(secondOfToLastCharBeforeCaret) && Allowed.includes(firstCharAfterCaret) && lastCharBeforeCaret==" " && secondOfToLastCharBeforeCaret!="." 
        &&secondOfToLastCharBeforeCaret!="+" && secondOfToLastCharBeforeCaret!="-" && firstCharAfterCaret!="%" && firstCharAfterCaret!="!"){
            if(firstCharAfterCaret=="," || firstCharAfterCaret=="]"){
                input.value =currentValue.slice(0, caretPosition-1) + "- " + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition, caretPosition);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
            
        }else if(deniedOperators.includes(lastCharBeforeCaret) && Allowed.includes(secondOfTofirstCharAfterCaret) && firstCharAfterCaret==" " && lastCharBeforeCaret!="." 
        &&lastCharBeforeCaret!="+" && lastCharBeforeCaret!="-" && secondOfTofirstCharAfterCaret!="%" && secondOfTofirstCharAfterCaret!="!"){
            input.value=newValue;
            input.setSelectionRange(caretPosition + 1, caretPosition + 1);
            send_expressions(input.value);
            
        }else if((lastCharBeforeCaret=="(" && firstCharAfterCaret=="(") || (lastCharBeforeCaret==")" && firstCharAfterCaret==")")){
            if(lastCharBeforeCaret==")" && firstCharAfterCaret==")"){
                    input.value =currentValue.slice(0, caretPosition) + "- " + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition+1, caretPosition+1);
                    send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }else if(((secondOfToLastCharBeforeCaret=="(" && firstCharAfterCaret=="(") || (secondOfToLastCharBeforeCaret==")" && firstCharAfterCaret==")")) && lastCharBeforeCaret==" "){
            if(secondOfToLastCharBeforeCaret==")" && firstCharAfterCaret==")"){
                    input.value =currentValue.slice(0, caretPosition-1) + "- " + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition, caretPosition);
                    send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }else if(((lastCharBeforeCaret=="(" && secondOfTofirstCharAfterCaret=="(") || (lastCharBeforeCaret==")" && secondOfTofirstCharAfterCaret==")")) && firstCharAfterCaret==" "){
            if(lastCharBeforeCaret==")" && secondOfTofirstCharAfterCaret==")"){
                    input.value =currentValue.slice(0, caretPosition) + "-" + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition+1, caretPosition+1);
                    send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }
    }else if(value=="^"){
        if(Allowed.includes(lastCharBeforeCaret) && Allowed.includes(firstCharAfterCaret) && lastCharBeforeCaret!="[" 
        && lastCharBeforeCaret!="" && lastCharBeforeCaret!="," && firstCharAfterCaret!="!" && firstCharAfterCaret!="%"){
            if(firstCharAfterCaret=="]" || firstCharAfterCaret==","){
                input.value =currentValue.slice(0, caretPosition) + "^ " + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition+1, caretPosition+1);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }else if(Allowed.includes(secondOfToLastCharBeforeCaret) && lastCharBeforeCaret==" " && Allowed.includes(firstCharAfterCaret) && secondOfToLastCharBeforeCaret!="[" 
         && secondOfToLastCharBeforeCaret!="," &&  firstCharAfterCaret!="!" && firstCharAfterCaret!="%"){
            if(firstCharAfterCaret=="]" || firstCharAfterCaret==","){
                input.value =currentValue.slice(0, caretPosition-1) + "^ " + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition, caretPosition);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }else if(Allowed.includes(lastCharBeforeCaret) && firstCharAfterCaret==" " && Allowed.includes(secondOfTofirstCharAfterCaret) && lastCharBeforeCaret!="[" 
        && lastCharBeforeCaret!="," &&  secondOfTofirstCharAfterCaret!="!" && secondOfTofirstCharAfterCaret!="%"){
           input.value=newValue;
           input.setSelectionRange(caretPosition + 1, caretPosition + 1);
           send_expressions(input.value);
        }else if(Allowed.includes(lastCharBeforeCaret) && lastCharBeforeCaret!="[" 
        && lastCharBeforeCaret!="," && firstCharAfterCaret==")"){
            input.value =currentValue.slice(0, caretPosition) + "^ " + currentValue.slice(caretPosition);
            input.setSelectionRange(caretPosition +1, caretPosition +1);
            send_expressions(input.value);
        }else if(Allowed.includes(secondOfToLastCharBeforeCaret) && secondOfToLastCharBeforeCaret!="[" 
        && secondOfToLastCharBeforeCaret!=","  && lastCharBeforeCaret==" " && firstCharAfterCaret==")"){
           input.value =currentValue.slice(0, caretPosition-1) + "^ " + currentValue.slice(caretPosition);
           input.setSelectionRange(caretPosition, caretPosition);
           send_expressions(input.value);
        }else if(Allowed.includes(lastCharBeforeCaret) && lastCharBeforeCaret!="[" 
        && lastCharBeforeCaret!=","  && firstCharAfterCaret==" " && secondOfTofirstCharAfterCaret==")"){
           input.value=newValue;
           input.setSelectionRange(caretPosition + 1, caretPosition + 1);
           send_expressions(input.value);
        }else if(lastCharBeforeCaret==")" && Allowed.includes(firstCharAfterCaret) && firstCharAfterCaret!="!" && firstCharAfterCaret!="%"){
            if(firstCharAfterCaret=="]" || firstCharAfterCaret==","){
                input.value =currentValue.slice(0, caretPosition) + "^ " + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition+1, caretPosition+1);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }else if(secondOfToLastCharBeforeCaret==")"  &&  lastCharBeforeCaret==" " && Allowed.includes(firstCharAfterCaret) && firstCharAfterCaret!="!" && firstCharAfterCaret!="%"){
            if(firstCharAfterCaret=="]" || firstCharAfterCaret==","){
                input.value =currentValue.slice(0, caretPosition-1) + "^ " + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition, caretPosition);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }else if(lastCharBeforeCaret==")" && firstCharAfterCaret==" " && Allowed.includes(secondOfTofirstCharAfterCaret) 
            && secondOfTofirstCharAfterCaret!="!" && secondOfTofirstCharAfterCaret!="%"){
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
        }else if(lastCharBeforeCaret==")" && (firstCharAfterCaret=="+" || firstCharAfterCaret=="-" || firstCharAfterCaret==")")){
            if(firstCharAfterCaret==")"){
                input.value =currentValue.slice(0, caretPosition) + "^" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition +1, caretPosition +1);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }else if(secondOfToLastCharBeforeCaret==")" && lastCharBeforeCaret==" " && (firstCharAfterCaret=="+" || firstCharAfterCaret=="-" || firstCharAfterCaret==")")){
            if(firstCharAfterCaret==")"){
                input.value =currentValue.slice(0, caretPosition-1) + "^" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition, caretPosition);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }else if(lastCharBeforeCaret==")" && firstCharAfterCaret==" " && (secondOfTofirstCharAfterCaret=="+" || secondOfTofirstCharAfterCaret=="-" || secondOfTofirstCharAfterCaret==")")){
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
        }
    }else if(value=="!"){
        if(Allowed.includes(lastCharBeforeCaret) && Allowed.includes(firstCharAfterCaret) && lastCharBeforeCaret!="[" && lastCharBeforeCaret!="," && lastCharBeforeCaret!=""){
            if(firstCharAfterCaret!="]" && firstCharAfterCaret!="" && firstCharAfterCaret!="," && firstCharAfterCaret!="!" && firstCharAfterCaret!="%"){
                input.value =currentValue.slice(0, caretPosition) + "!*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition +2, caretPosition +2);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }else if(Allowed.includes(secondOfToLastCharBeforeCaret) && lastCharBeforeCaret==" " && Allowed.includes(firstCharAfterCaret) && secondOfToLastCharBeforeCaret!="[" && secondOfToLastCharBeforeCaret!=","){
            if(firstCharAfterCaret!="]" && firstCharAfterCaret!="," && firstCharAfterCaret!="!" && firstCharAfterCaret!="%"){
                input.value =currentValue.slice(0, caretPosition-1) + "!* " + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition +1, caretPosition +1);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }else if(Allowed.includes(lastCharBeforeCaret) && firstCharAfterCaret==" " && Allowed.includes(secondOfTofirstCharAfterCaret) && lastCharBeforeCaret!="[" && lastCharBeforeCaret!=","){
            if(secondOfTofirstCharAfterCaret!="]" && secondOfTofirstCharAfterCaret!="," && secondOfTofirstCharAfterCaret!="!" && secondOfTofirstCharAfterCaret!="%"){
                input.value =currentValue.slice(0, caretPosition) + "!*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition +2, caretPosition +2);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }else if(Allowed.includes(lastCharBeforeCaret) && deniedOperators.includes(firstCharAfterCaret) && lastCharBeforeCaret!="[" && lastCharBeforeCaret!="," && lastCharBeforeCaret!=""){
            input.value=newValue;
            input.setSelectionRange(caretPosition + 1, caretPosition + 1);
            send_expressions(input.value);
        }else if(lastCharBeforeCaret==")"){
            input.value=newValue;
            input.setSelectionRange(caretPosition + 1, caretPosition + 1);
            send_expressions(input.value);
        }
    }else if(value=="%"){
        if(Allowed.includes(lastCharBeforeCaret) && Allowed.includes(firstCharAfterCaret) && lastCharBeforeCaret!="[" && lastCharBeforeCaret!="," && lastCharBeforeCaret!=""){
            if(firstCharAfterCaret!="]" && firstCharAfterCaret!="" && firstCharAfterCaret!="," && firstCharAfterCaret!="!" && firstCharAfterCaret!="%"){
                input.value =currentValue.slice(0, caretPosition) + "%*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition +2, caretPosition +2);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }else if(Allowed.includes(secondOfToLastCharBeforeCaret) && lastCharBeforeCaret==" " && Allowed.includes(firstCharAfterCaret) && secondOfToLastCharBeforeCaret!="[" && secondOfToLastCharBeforeCaret!=","){
            if(firstCharAfterCaret!="]" && firstCharAfterCaret!="," && firstCharAfterCaret!="!" && firstCharAfterCaret!="%"){
                input.value =currentValue.slice(0, caretPosition-1) + "%* " + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition +1, caretPosition +1);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }else if(Allowed.includes(lastCharBeforeCaret) && firstCharAfterCaret==" " && Allowed.includes(secondOfTofirstCharAfterCaret) && lastCharBeforeCaret!="[" && lastCharBeforeCaret!=","){
            if(secondOfTofirstCharAfterCaret!="]" && secondOfTofirstCharAfterCaret!="," && secondOfTofirstCharAfterCaret!="!" && secondOfTofirstCharAfterCaret!="%"){
                input.value =currentValue.slice(0, caretPosition) + "%*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition +2, caretPosition +2);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }else if(Allowed.includes(lastCharBeforeCaret) && deniedOperators.includes(firstCharAfterCaret) && lastCharBeforeCaret!="[" && lastCharBeforeCaret!="," && lastCharBeforeCaret!=""){
            input.value=newValue;
            input.setSelectionRange(caretPosition + 1, caretPosition + 1);
            send_expressions(input.value);
        }else if(lastCharBeforeCaret==")"){
            input.value=newValue;
            input.setSelectionRange(caretPosition + 1, caretPosition + 1);
            send_expressions(input.value);
        }
    }else if(value=="."){
        if(Allowed.includes(lastCharBeforeCaret) && lastCharBeforeCaret!="" && Allowed.includes(firstCharAfterCaret) && firstCharAfterCaret!="g" && firstCharAfterCaret!="l" && lastCharBeforeCaret!="[" && firstCharAfterCaret!="[" && lastCharBeforeCaret!="," 
        && firstCharAfterCaret!="," && lastCharBeforeCaret!="]" && firstCharAfterCaret!="]" && lastCharBeforeCaret!="!" && firstCharAfterCaret!="!" && lastCharBeforeCaret!="%" && firstCharAfterCaret!="%"){
            input.value=newValue;
            input.setSelectionRange(caretPosition + 1, caretPosition + 1);
            send_expressions(input.value);
        }else if(Allowed.includes(secondOfToLastCharBeforeCaret) && lastCharBeforeCaret==" " && firstCharAfterCaret!="g" && firstCharAfterCaret!="l" && Allowed.includes(firstCharAfterCaret) && secondOfToLastCharBeforeCaret!="[" && firstCharAfterCaret!="[" && secondOfToLastCharBeforeCaret!="," 
        && firstCharAfterCaret!="," && secondOfToLastCharBeforeCaret!="]" && firstCharAfterCaret!="]" && secondOfToLastCharBeforeCaret!="!" && firstCharAfterCaret!="!" && secondOfToLastCharBeforeCaret!="%" && firstCharAfterCaret!="%"){
            input.value=newValue;
            input.setSelectionRange(caretPosition + 1, caretPosition + 1);
            send_expressions(input.value);
        }else if(Allowed.includes(lastCharBeforeCaret) && firstCharAfterCaret==" " && Allowed.includes(secondOfTofirstCharAfterCaret) && secondOfTofirstCharAfterCaret!="g" && secondOfTofirstCharAfterCaret!="l" && lastCharBeforeCaret!="["  && lastCharBeforeCaret!="," 
        && lastCharBeforeCaret!="]"  && lastCharBeforeCaret!="!" && secondOfTofirstCharAfterCaret!="!" && lastCharBeforeCaret!="%" && secondOfTofirstCharAfterCaret!="%"){
            input.value=newValue;
            input.setSelectionRange(caretPosition + 1, caretPosition + 1);
            send_expressions(input.value);
        }
    }else if(value=="right"){
        if(firstCharAfterCaret=="g" || firstCharAfterCaret=="l"){
            input.setSelectionRange(caretPosition + 4, caretPosition + 4);
        }else{
            input.setSelectionRange(caretPosition + 1, caretPosition + 1);
        }
        
    }else if(value=="left"){
        if(lastCharBeforeCaret=="["){
            input.setSelectionRange(caretPosition - 4, caretPosition - 4); 
        }else{
            input.setSelectionRange(caretPosition - 1, caretPosition - 1); 
        }
        
    }else if(value=="gcd[ , ]"){
        if(Allowed.includes(lastCharBeforeCaret) && Allowed.includes(firstCharAfterCaret)){
            if((lastCharBeforeCaret=="[" || lastCharBeforeCaret=="," || lastCharBeforeCaret=="") && (firstCharAfterCaret=="]" 
                || firstCharAfterCaret=="," || firstCharAfterCaret=="" || firstCharAfterCaret=="%" || firstCharAfterCaret=="!")){
                    input.value=newValue;
                    input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                    send_expressions(input.value);
                }else if((lastCharBeforeCaret=="[" || lastCharBeforeCaret=="," || lastCharBeforeCaret=="") && (firstCharAfterCaret!="]" 
                    && firstCharAfterCaret!="," && firstCharAfterCaret!="" && firstCharAfterCaret!="%" && firstCharAfterCaret!="!")){
                        input.value =currentValue.slice(0, caretPosition) + "gcd[ , ]*" + currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                        send_expressions(input.value);
                }else if((lastCharBeforeCaret!="[" && lastCharBeforeCaret!="," && lastCharBeforeCaret!="") && (firstCharAfterCaret=="]" 
                    || firstCharAfterCaret=="," || firstCharAfterCaret=="" || firstCharAfterCaret=="%" || firstCharAfterCaret=="!")){
                        input.value =currentValue.slice(0, caretPosition) + "*gcd[ , ]" + currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                        send_expressions(input.value);
                }else{
                    if(firstCharAfterCaret=""){
                        input.value =currentValue.slice(0, caretPosition) + "*gcd[ , ]" + currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                        send_expressions(input.value);
                    }else{
                        input.value =currentValue.slice(0, caretPosition) + "*gcd[ , ]*" + currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                        send_expressions(input.value);
                    }
                }
        }else if(Allowed.includes(secondOfToLastCharBeforeCaret) && Allowed.includes(firstCharAfterCaret) && lastCharBeforeCaret==" "){
            if((secondOfToLastCharBeforeCaret=="[" || secondOfToLastCharBeforeCaret==",") && (firstCharAfterCaret=="]" 
                || firstCharAfterCaret=="," || firstCharAfterCaret=="%" || firstCharAfterCaret=="!")){
                    input.value=newValue;
                    input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                    send_expressions(input.value);
                }else if((secondOfToLastCharBeforeCaret=="[" || secondOfToLastCharBeforeCaret==",") && (firstCharAfterCaret!="]" 
                    && firstCharAfterCaret!="," && firstCharAfterCaret!="%" && firstCharAfterCaret!="!")){
                        input.value =currentValue.slice(0, caretPosition) + "gcd[ , ]*" + currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                        send_expressions(input.value);
                }else if((secondOfToLastCharBeforeCaret!="[" && secondOfToLastCharBeforeCaret!=",") && (firstCharAfterCaret=="]" 
                    || firstCharAfterCaret=="," || firstCharAfterCaret=="%" || firstCharAfterCaret=="!")){
                        input.value =currentValue.slice(0, caretPosition-1) + "*gcd[ , ] " + currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                        send_expressions(input.value);
                }else{
                        input.value =currentValue.slice(0, caretPosition) + "*gcd[ , ]*" + currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                        send_expressions(input.value);
                }
        }else if(Allowed.includes(lastCharBeforeCaret) && Allowed.includes(secondOfTofirstCharAfterCaret) && firstCharAfterCaret==" "){
            if((lastCharBeforeCaret=="[" || lastCharBeforeCaret==",") && (secondOfTofirstCharAfterCaret=="]" 
                || secondOfTofirstCharAfterCaret=="," || secondOfTofirstCharAfterCaret=="%" || secondOfTofirstCharAfterCaret=="!")){
                    input.value=newValue;
                    input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                    send_expressions(input.value);
                }else if((lastCharBeforeCaret=="[" || lastCharBeforeCaret==",") && (secondOfTofirstCharAfterCaret!="]" 
                    && secondOfTofirstCharAfterCaret!="," && secondOfTofirstCharAfterCaret!="%" && secondOfTofirstCharAfterCaret!="!")){
                        input.value =currentValue.slice(0, caretPosition) + "gcd[ , ]*" + currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                        send_expressions(input.value);
                }else if((lastCharBeforeCaret!="[" && lastCharBeforeCaret!=",") && (secondOfTofirstCharAfterCaret=="]" 
                    || secondOfTofirstCharAfterCaret=="," || secondOfTofirstCharAfterCaret=="%" || secondOfTofirstCharAfterCaret=="!")){
                        input.value =currentValue.slice(0, caretPosition) + "*gcd[ , ]" + currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                        send_expressions(input.value);
                }else{
                        input.value =currentValue.slice(0, caretPosition) + "*gcd[ , ]*" + currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                        send_expressions(input.value);
                }
        }else if(Allowed.includes(lastCharBeforeCaret) && deniedOperators.charAt(firstCharAfterCaret) && firstCharAfterCaret!="."){
            if(lastCharBeforeCaret=="[" || lastCharBeforeCaret=="," || lastCharBeforeCaret==""){
                if(firstCharAfterCaret=="("){
                    input.value =currentValue.slice(0, caretPosition) + "gcd[ , ]*" + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                    send_expressions(input.value);
                }else{
                    input.value=newValue;
                    input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                    send_expressions(input.value);
                }  
            }else{
                input.value =currentValue.slice(0, caretPosition) + "*gcd[ , ]" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                send_expressions(input.value);
            }
        }else if(Allowed.includes(secondOfToLastCharBeforeCaret) && lastCharBeforeCaret==" " && deniedOperators.charAt(firstCharAfterCaret) && firstCharAfterCaret!="."){
            if(secondOfToLastCharBeforeCaret=="[" || secondOfToLastCharBeforeCaret=="," || secondOfToLastCharBeforeCaret==""){
                if(firstCharAfterCaret=="("){
                    input.value =currentValue.slice(0, caretPosition) + "gcd[ , ]*" + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                    send_expressions(input.value);
                }else{
                    input.value=newValue;
                    input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                    send_expressions(input.value);
                }
            }else{
                input.value =currentValue.slice(0, caretPosition-1) + "*gcd[ , ] " + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                send_expressions(input.value);
            }
        }else if(Allowed.includes(lastCharBeforeCaret) && firstCharAfterCaret==" " && deniedOperators.charAt(secondOfTofirstCharAfterCaret) && secondOfTofirstCharAfterCaret!="."){
            if(lastCharBeforeCaret=="[" || lastCharBeforeCaret=="," || lastCharBeforeCaret==""){
                if(secondOfTofirstCharAfterCaret=="("){
                    input.value =currentValue.slice(0, caretPosition) + "gcd[ , ]*" + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                    send_expressions(input.value);
                }else{
                    input.value=newValue;
                    input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                    send_expressions(input.value);
                }
            }else{
                input.value =currentValue.slice(0, caretPosition) + "*gcd[ , ]" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                send_expressions(input.value);
            }
        }else if(deniedOperators.includes(lastCharBeforeCaret) && Allowed.includes(firstCharAfterCaret) && lastCharBeforeCaret!="."){
            if(lastCharBeforeCaret==")" && (firstCharAfterCaret=="%" || firstCharAfterCaret=="!" || firstCharAfterCaret=="]" || firstCharAfterCaret==",")){
                input.value =currentValue.slice(0, caretPosition) + "*gcd[ , ]" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                send_expressions(input.value);
            }else if(lastCharBeforeCaret==")" && (firstCharAfterCaret!="%" && firstCharAfterCaret!="!" && firstCharAfterCaret!="]" && firstCharAfterCaret!=",")){
                input.value =currentValue.slice(0, caretPosition) + "*gcd[ , ]*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                send_expressions(input.value);
            }else if(lastCharBeforeCaret!=")" && (firstCharAfterCaret=="%" || firstCharAfterCaret=="!" || firstCharAfterCaret=="]" || firstCharAfterCaret==",")){
                input.value=newValue;
                input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                send_expressions(input.value);
            }else{
                if(firstCharAfterCaret==""){
                    input.value =currentValue.slice(0, caretPosition) + "gcd[ , ]" + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                    send_expressions(input.value);
                }else{
                    input.value =currentValue.slice(0, caretPosition) + "gcd[ , ]*" + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                    send_expressions(input.value);
                }
            }
        }else if(deniedOperators.includes(secondOfToLastCharBeforeCaret) && lastCharBeforeCaret==" "  && Allowed.includes(firstCharAfterCaret) && secondOfToLastCharBeforeCaret!="."){
            if(secondOfToLastCharBeforeCaret==")" && (firstCharAfterCaret=="%" || firstCharAfterCaret=="!" || firstCharAfterCaret=="]" || firstCharAfterCaret==",")){
                input.value =currentValue.slice(0, caretPosition-1) + "*gcd[ , ] " + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                send_expressions(input.value);
            }else if(secondOfToLastCharBeforeCaret==")" && (firstCharAfterCaret!="%" && firstCharAfterCaret!="!" && firstCharAfterCaret!="]" && firstCharAfterCaret!=",")){
                input.value =currentValue.slice(0, caretPosition) + "*gcd[ , ]*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                send_expressions(input.value);
            }else if(secondOfToLastCharBeforeCaret!=")" && (firstCharAfterCaret=="%" || firstCharAfterCaret=="!" || firstCharAfterCaret=="]" || firstCharAfterCaret==",")){
                input.value=newValue;
                input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                send_expressions(input.value);
            }else{
                input.value =currentValue.slice(0, caretPosition) + "gcd[ , ]*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                send_expressions(input.value);
            }
        }else if(deniedOperators.includes(lastCharBeforeCaret) && firstCharAfterCaret==" " && Allowed.includes(secondOfTofirstCharAfterCaret) && lastCharBeforeCaret!="."){
            if(lastCharBeforeCaret==")" && (secondOfTofirstCharAfterCaret=="%" || secondOfTofirstCharAfterCaret=="!" || secondOfTofirstCharAfterCaret=="]" || secondOfTofirstCharAfterCaret==",")){
                input.value =currentValue.slice(0, caretPosition) + "*gcd[ , ]" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                send_expressions(input.value);
            }else if(lastCharBeforeCaret==")" && (secondOfTofirstCharAfterCaret!="%" && secondOfTofirstCharAfterCaret!="!" && secondOfTofirstCharAfterCaret!="]" && secondOfTofirstCharAfterCaret!=",")){
                input.value =currentValue.slice(0, caretPosition) + "*gcd[ , ]*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                send_expressions(input.value);
            }else if(lastCharBeforeCaret!=")" && (secondOfTofirstCharAfterCaret=="%" || secondOfTofirstCharAfterCaret=="!" || secondOfTofirstCharAfterCaret=="]" || secondOfTofirstCharAfterCaret==",")){
                input.value=newValue;
                input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                send_expressions(input.value);
            }else{
                input.value =currentValue.slice(0, caretPosition) + "gcd[ , ]*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                send_expressions(input.value);
            }
        }else if(deniedOperators.includes(lastCharBeforeCaret) && deniedOperators.includes(firstCharAfterCaret) && lastCharBeforeCaret!="."){
            if(firstCharAfterCaret=="("){
                input.value =currentValue.slice(0, caretPosition) + "gcd[ , ]*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                send_expressions(input.value);
            }
        }else if(deniedOperators.includes(secondOfToLastCharBeforeCaret) && lastCharBeforeCaret==" " && deniedOperators.includes(firstCharAfterCaret) && secondOfToLastCharBeforeCaret!="."){
            if(firstCharAfterCaret=="("){
                input.value =currentValue.slice(0, caretPosition) + "gcd[ , ]*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                send_expressions(input.value);
            }
        }else if(deniedOperators.includes(lastCharBeforeCaret) && firstCharAfterCaret==" " && deniedOperators.includes(secondOfTofirstCharAfterCaret) && lastCharBeforeCaret!="."){
            if(secondOfTofirstCharAfterCaret=="("){
                input.value =currentValue.slice(0, caretPosition) + "gcd[ , ]*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                send_expressions(input.value);
            }
        }
    }else if(value=="lcm[ , ]"){
        if(Allowed.includes(lastCharBeforeCaret) && Allowed.includes(firstCharAfterCaret)){
            if((lastCharBeforeCaret=="[" || lastCharBeforeCaret=="," || lastCharBeforeCaret=="") && (firstCharAfterCaret=="]" 
                || firstCharAfterCaret=="," || firstCharAfterCaret=="" || firstCharAfterCaret=="%" || firstCharAfterCaret=="!")){
                    input.value=newValue;
                    input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                    send_expressions(input.value);
                }else if((lastCharBeforeCaret=="[" || lastCharBeforeCaret=="," || lastCharBeforeCaret=="") && (firstCharAfterCaret!="]" 
                    && firstCharAfterCaret!="," && firstCharAfterCaret!="" && firstCharAfterCaret!="%" && firstCharAfterCaret!="!")){
                        input.value =currentValue.slice(0, caretPosition) + "lcm[ , ]*" + currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                        send_expressions(input.value);
                }else if((lastCharBeforeCaret!="[" && lastCharBeforeCaret!="," && lastCharBeforeCaret!="") && (firstCharAfterCaret=="]" 
                    || firstCharAfterCaret=="," || firstCharAfterCaret=="" || firstCharAfterCaret=="%" || firstCharAfterCaret=="!")){
                        input.value =currentValue.slice(0, caretPosition) + "*lcm[ , ]" + currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                        send_expressions(input.value);
                }else{
                    if(firstCharAfterCaret=""){
                        input.value =currentValue.slice(0, caretPosition) + "*lcm[ , ]" + currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                        send_expressions(input.value);
                    }else{
                        input.value =currentValue.slice(0, caretPosition) + "*lcm[ , ]*" + currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                        send_expressions(input.value);
                    }
                }
        }else if(Allowed.includes(secondOfToLastCharBeforeCaret) && Allowed.includes(firstCharAfterCaret) && lastCharBeforeCaret==" "){
            if((secondOfToLastCharBeforeCaret=="[" || secondOfToLastCharBeforeCaret==",") && (firstCharAfterCaret=="]" 
                || firstCharAfterCaret=="," || firstCharAfterCaret=="%" || firstCharAfterCaret=="!")){
                    input.value=newValue;
                    input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                    send_expressions(input.value);
                }else if((secondOfToLastCharBeforeCaret=="[" || secondOfToLastCharBeforeCaret==",") && (firstCharAfterCaret!="]" 
                    && firstCharAfterCaret!="," && firstCharAfterCaret!="%" && firstCharAfterCaret!="!")){
                        input.value =currentValue.slice(0, caretPosition) + "lcm[ , ]*" + currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                        send_expressions(input.value);
                }else if((secondOfToLastCharBeforeCaret!="[" && secondOfToLastCharBeforeCaret!=",") && (firstCharAfterCaret=="]" 
                    || firstCharAfterCaret=="," || firstCharAfterCaret=="%" || firstCharAfterCaret=="!")){
                        input.value =currentValue.slice(0, caretPosition-1) + "*lcm[ , ] " + currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                        send_expressions(input.value);
                }else{
                        input.value =currentValue.slice(0, caretPosition) + "*lcm[ , ]*" + currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                        send_expressions(input.value);
                }
        }else if(Allowed.includes(lastCharBeforeCaret) && Allowed.includes(secondOfTofirstCharAfterCaret) && firstCharAfterCaret==" "){
            if((lastCharBeforeCaret=="[" || lastCharBeforeCaret==",") && (secondOfTofirstCharAfterCaret=="]" 
                || secondOfTofirstCharAfterCaret=="," || secondOfTofirstCharAfterCaret=="%" || secondOfTofirstCharAfterCaret=="!")){
                    input.value=newValue;
                    input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                    send_expressions(input.value);
                }else if((lastCharBeforeCaret=="[" || lastCharBeforeCaret==",") && (secondOfTofirstCharAfterCaret!="]" 
                    && secondOfTofirstCharAfterCaret!="," && secondOfTofirstCharAfterCaret!="%" && secondOfTofirstCharAfterCaret!="!")){
                        input.value =currentValue.slice(0, caretPosition) + "lcm[ , ]*" + currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                        send_expressions(input.value);
                }else if((lastCharBeforeCaret!="[" && lastCharBeforeCaret!=",") && (secondOfTofirstCharAfterCaret=="]" 
                    || secondOfTofirstCharAfterCaret=="," || secondOfTofirstCharAfterCaret=="%" || secondOfTofirstCharAfterCaret=="!")){
                        input.value =currentValue.slice(0, caretPosition) + "*lcm[ , ]" + currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                        send_expressions(input.value);
                }else{
                        input.value =currentValue.slice(0, caretPosition) + "*lcm[ , ]*" + currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                        send_expressions(input.value);
                }
        }else if(Allowed.includes(lastCharBeforeCaret) && deniedOperators.charAt(firstCharAfterCaret) && firstCharAfterCaret!="."){
            if(lastCharBeforeCaret=="[" || lastCharBeforeCaret=="," || lastCharBeforeCaret==""){
                if(firstCharAfterCaret=="("){
                    input.value =currentValue.slice(0, caretPosition) + "lcm[ , ]*" + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                    send_expressions(input.value);
                }else{
                    input.value=newValue;
                    input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                    send_expressions(input.value);
                }  
            }else{
                input.value =currentValue.slice(0, caretPosition) + "*lcm[ , ]" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                send_expressions(input.value);
            }
        }else if(Allowed.includes(secondOfToLastCharBeforeCaret) && lastCharBeforeCaret==" " && deniedOperators.charAt(firstCharAfterCaret) && firstCharAfterCaret!="."){
            if(secondOfToLastCharBeforeCaret=="[" || secondOfToLastCharBeforeCaret=="," || secondOfToLastCharBeforeCaret==""){
                if(firstCharAfterCaret=="("){
                    input.value =currentValue.slice(0, caretPosition) + "lcm[ , ]*" + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                    send_expressions(input.value);
                }else{
                    input.value=newValue;
                    input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                    send_expressions(input.value);
                }
            }else{
                input.value =currentValue.slice(0, caretPosition-1) + "*lcm[ , ] " + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                send_expressions(input.value);
            }
        }else if(Allowed.includes(lastCharBeforeCaret) && firstCharAfterCaret==" " && deniedOperators.charAt(secondOfTofirstCharAfterCaret) && secondOfTofirstCharAfterCaret!="."){
            if(lastCharBeforeCaret=="[" || lastCharBeforeCaret=="," || lastCharBeforeCaret==""){
                if(secondOfTofirstCharAfterCaret=="("){
                    input.value =currentValue.slice(0, caretPosition) + "lcm[ , ]*" + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                    send_expressions(input.value);
                }else{
                    input.value=newValue;
                    input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                    send_expressions(input.value);
                }
            }else{
                input.value =currentValue.slice(0, caretPosition) + "*lcm[ , ]" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                send_expressions(input.value);
            }
        }else if(deniedOperators.includes(lastCharBeforeCaret) && Allowed.includes(firstCharAfterCaret) && lastCharBeforeCaret!="."){
            if(lastCharBeforeCaret==")" && (firstCharAfterCaret=="%" || firstCharAfterCaret=="!" || firstCharAfterCaret=="]" || firstCharAfterCaret==",")){
                input.value =currentValue.slice(0, caretPosition) + "*lcm[ , ]" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                send_expressions(input.value);
            }else if(lastCharBeforeCaret==")" && (firstCharAfterCaret!="%" && firstCharAfterCaret!="!" && firstCharAfterCaret!="]" && firstCharAfterCaret!=",")){
                input.value =currentValue.slice(0, caretPosition) + "*lcm[ , ]*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                send_expressions(input.value);
            }else if(lastCharBeforeCaret!=")" && (firstCharAfterCaret=="%" || firstCharAfterCaret=="!" || firstCharAfterCaret=="]" || firstCharAfterCaret==",")){
                input.value=newValue;
                input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                send_expressions(input.value);
            }else{
                if(firstCharAfterCaret==""){
                    input.value =currentValue.slice(0, caretPosition) + "lcm[ , ]" + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                    send_expressions(input.value);
                }else{
                    input.value =currentValue.slice(0, caretPosition) + "lcm[ , ]*" + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                    send_expressions(input.value);
                }
            }
        }else if(deniedOperators.includes(secondOfToLastCharBeforeCaret) && lastCharBeforeCaret==" " && Allowed.includes(firstCharAfterCaret) && secondOfToLastCharBeforeCaret!="."){
            if(secondOfToLastCharBeforeCaret==")" && (firstCharAfterCaret=="%" || firstCharAfterCaret=="!" || firstCharAfterCaret=="]" || firstCharAfterCaret==",")){
                input.value =currentValue.slice(0, caretPosition-1) + "*lcm[ , ] " + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                send_expressions(input.value);
            }else if(secondOfToLastCharBeforeCaret==")" && (firstCharAfterCaret!="%" && firstCharAfterCaret!="!" && firstCharAfterCaret!="]" && firstCharAfterCaret!=",")){
                input.value =currentValue.slice(0, caretPosition) + "*lcm[ , ]*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                send_expressions(input.value);
            }else if(secondOfToLastCharBeforeCaret!=")" && (firstCharAfterCaret=="%" || firstCharAfterCaret=="!" || firstCharAfterCaret=="]" || firstCharAfterCaret==",")){
                input.value=newValue;
                input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                send_expressions(input.value);
            }else{
                input.value =currentValue.slice(0, caretPosition) + "lcm[ , ]*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                send_expressions(input.value);
            }
        }else if(deniedOperators.includes(lastCharBeforeCaret) && firstCharAfterCaret==" " && Allowed.includes(secondOfTofirstCharAfterCaret) && lastCharBeforeCaret!="."){
            if(lastCharBeforeCaret==")" && (secondOfTofirstCharAfterCaret=="%" || secondOfTofirstCharAfterCaret=="!" || secondOfTofirstCharAfterCaret=="]" || secondOfTofirstCharAfterCaret==",")){
                input.value =currentValue.slice(0, caretPosition) + "*lcm[ , ]" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                send_expressions(input.value);
            }else if(lastCharBeforeCaret==")" && (secondOfTofirstCharAfterCaret!="%" && secondOfTofirstCharAfterCaret!="!" && secondOfTofirstCharAfterCaret!="]" && secondOfTofirstCharAfterCaret!=",")){
                input.value =currentValue.slice(0, caretPosition) + "*lcm[ , ]*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                send_expressions(input.value);
            }else if(lastCharBeforeCaret!=")" && (secondOfTofirstCharAfterCaret=="%" || secondOfTofirstCharAfterCaret=="!" || secondOfTofirstCharAfterCaret=="]" || secondOfTofirstCharAfterCaret==",")){
                input.value=newValue;
                input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                send_expressions(input.value);
            }else{
                input.value =currentValue.slice(0, caretPosition) + "lcm[ , ]*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 5, caretPosition + 5);
                send_expressions(input.value);
            }
        }else if(deniedOperators.includes(lastCharBeforeCaret) && deniedOperators.includes(firstCharAfterCaret) && lastCharBeforeCaret!="."){
            if(firstCharAfterCaret=="("){
                input.value =currentValue.slice(0, caretPosition) + "lcm[ , ]*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                send_expressions(input.value);
            }
        }else if(deniedOperators.includes(secondOfToLastCharBeforeCaret) && lastCharBeforeCaret==" " && deniedOperators.includes(firstCharAfterCaret) && secondOfToLastCharBeforeCaret!="."){
            if(firstCharAfterCaret=="("){
                input.value =currentValue.slice(0, caretPosition) + "lcm[ , ]*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                send_expressions(input.value);
            }
        }else if(deniedOperators.includes(lastCharBeforeCaret) && firstCharAfterCaret==" " && deniedOperators.includes(secondOfTofirstCharAfterCaret) && lastCharBeforeCaret!="."){
            if(secondOfTofirstCharAfterCaret=="("){
                input.value =currentValue.slice(0, caretPosition) + "lcm[ , ]*" + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                send_expressions(input.value);
            }else{
                input.value=newValue;
                input.setSelectionRange(caretPosition + 4, caretPosition + 4);
                send_expressions(input.value);
            }
        }
    }else{
        let handle_e = 0;
        if(value=="e"){
        let i = 0;
        while (true) {
            let firstChar = currentValue.charAt(caretPosition + i);
                if (firstChar == "]" && firstChar!="[") {
                   input.focus();
                   handle_e=0;
                   break;
                }else{
                    handle_e=1;
                }
                 i++;
            // Break if we reach the end of the string to avoid infinite loop
                if (caretPosition + i >= currentValue.length) {
                   break;
                }
            }
        }
        if(Allowed.includes(lastCharBeforeCaret) && lastCharBeforeCaret!="" && Allowed.includes(firstCharAfterCaret)){
            if((lastCharBeforeCaret=="!" || lastCharBeforeCaret=="%" || lastCharBeforeCaret=="]" || lastCharBeforeCaret=="e") 
                && (firstCharAfterCaret=="l" || firstCharAfterCaret=="g" || firstCharAfterCaret=="e")){
                if(value=="e"){
                    if(handle_e!=0){
                         input.value =currentValue.slice(0, caretPosition) + "*"+value+"*" +currentValue.slice(caretPosition);
                         input.setSelectionRange(caretPosition + 3, caretPosition + 3);
                         send_expressions(input.value);
                    }
                }else{
                    input.value =currentValue.slice(0, caretPosition) + "*"+value+"*" +currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 3, caretPosition + 3);
                    send_expressions(input.value);
                }
            }else if((lastCharBeforeCaret=="!" || lastCharBeforeCaret=="%" || lastCharBeforeCaret=="]" || lastCharBeforeCaret=="e") 
                && (firstCharAfterCaret!="l" && firstCharAfterCaret!="g" && firstCharAfterCaret!="e")){
                    if(value=="e"  && handle_e!=0){
                        if(firstCharAfterCaret==""){
                            input.value =currentValue.slice(0, caretPosition) + "*"+value+ currentValue.slice(caretPosition);
                            input.setSelectionRange(caretPosition + 3, caretPosition + 3);
                            send_expressions(input.value);
                        }else{
                            input.value =currentValue.slice(0, caretPosition) + "*"+value+"*"+ currentValue.slice(caretPosition);
                            input.setSelectionRange(caretPosition + 3, caretPosition + 3);
                            send_expressions(input.value);
                        }
                    }else{
                        input.value =currentValue.slice(0, caretPosition) + "*"+value+ currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                        send_expressions(input.value);
                    }
            }else if((lastCharBeforeCaret!="!" && lastCharBeforeCaret!="%" && lastCharBeforeCaret!="]" && lastCharBeforeCaret!="e") 
                && (firstCharAfterCaret=="l" || firstCharAfterCaret=="g" || firstCharAfterCaret=="e")){
                    if(value=="e" && handle_e!=0){
                        input.value =currentValue.slice(0, caretPosition) + "*"+value+"*"+ currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 3, caretPosition + 3);
                        send_expressions(input.value);
                    }else{
                        input.value =currentValue.slice(0, caretPosition) +value+ "*"+ currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                        send_expressions(input.value);
                    }
            }else{
                if(value=="e" && handle_e!=0 && (firstCharAfterCaret=="" || firstCharAfterCaret=="," || firstCharAfterCaret=="]" || firstCharAfterCaret=="!" || firstCharAfterCaret=="%")){
                    input.value =currentValue.slice(0, caretPosition) + "*"+value+ currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                    send_expressions(input.value);
                }else if(value=="e" && handle_e!=0  && lastCharBeforeCaret!="g" && lastCharBeforeCaret!="l" && firstCharAfterCaret!=""){
                    input.value =currentValue.slice(0, caretPosition) + "*"+value+"*" + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 3, caretPosition + 3);
                    send_expressions(input.value);
                }else{
                    if(value!="e"){
                        if(lastCharBeforeCaret!="g" && lastCharBeforeCaret!="l" ){
                            input.value=newValue;
                            input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                            send_expressions(input.value);
                        }
                    }
                }
            }

        }else if(Allowed.includes(secondOfToLastCharBeforeCaret) && lastCharBeforeCaret==" " && Allowed.includes(firstCharAfterCaret) && value!="e"){
            if((secondOfToLastCharBeforeCaret=="!" || secondOfToLastCharBeforeCaret=="%" || secondOfToLastCharBeforeCaret=="]") 
                && (firstCharAfterCaret=="l" || firstCharAfterCaret=="g")){
                input.value =currentValue.slice(0, caretPosition) + "*"+value+"*" +currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 3, caretPosition + 3);
                send_expressions(input.value);
            }else if((secondOfToLastCharBeforeCaret=="!" || secondOfToLastCharBeforeCaret=="%" || secondOfToLastCharBeforeCaret=="]") 
                && (firstCharAfterCaret!="l" && firstCharAfterCaret!="g")){
                        input.value =currentValue.slice(0, caretPosition) + "*"+value+ currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                        send_expressions(input.value); 
            }else if((secondOfToLastCharBeforeCaret!="!" && secondOfToLastCharBeforeCaret!="%" && secondOfToLastCharBeforeCaret!="]") 
                && (firstCharAfterCaret=="l" || firstCharAfterCaret=="g")){
                     
                        input.value =currentValue.slice(0, caretPosition) +value+ "*"+ currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                        send_expressions(input.value); 
            }else{
                
                    if(secondOfToLastCharBeforeCaret!="g" && secondOfToLastCharBeforeCaret!="l"){
                        input.value=newValue;
                        input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                        send_expressions(input.value);
                    }
            }

        }else if(Allowed.includes(lastCharBeforeCaret) && firstCharAfterCaret==" " && Allowed.includes(secondOfTofirstCharAfterCaret) && value!="e"){
            if((lastCharBeforeCaret=="!" || lastCharBeforeCaret=="%" || lastCharBeforeCaret=="]") 
                && (secondOfTofirstCharAfterCaret=="l" || secondOfTofirstCharAfterCaret=="g")){
                input.value =currentValue.slice(0, caretPosition) + "*"+value+"*" +currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 3, caretPosition + 3);
                send_expressions(input.value);
            }else if((lastCharBeforeCaret=="!" || lastCharBeforeCaret=="%" || lastCharBeforeCaret=="]") 
                && (secondOfTofirstCharAfterCaret!="l" && secondOfTofirstCharAfterCaret!="g")){
                        input.value =currentValue.slice(0, caretPosition) + "*"+value+ currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                        send_expressions(input.value); 
            }else if((lastCharBeforeCaret!="!" && lastCharBeforeCaret!="%" && lastCharBeforeCaret!="]") 
                && (secondOfTofirstCharAfterCaret=="l" || secondOfTofirstCharAfterCaret=="g")){
                        input.value =currentValue.slice(0, caretPosition) +value+ "*"+ currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                        send_expressions(input.value); 
            }else{
                
                    if(lastCharBeforeCaret!="g" && lastCharBeforeCaret!="l"){
                        input.value=newValue;
                        input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                        send_expressions(input.value);
                    }
            }

        }else if(Allowed.includes(lastCharBeforeCaret) && lastCharBeforeCaret!="" && deniedOperators.includes(firstCharAfterCaret) && lastCharBeforeCaret!="l" && lastCharBeforeCaret!="g"){
            if((lastCharBeforeCaret=="!" || lastCharBeforeCaret=="%" || lastCharBeforeCaret=="]" || lastCharBeforeCaret=="e" ) && firstCharAfterCaret=="("){ 
                if(value=="e"){
                    if(handle_e!=0){
                         input.value =currentValue.slice(0, caretPosition) + "*"+value+"*" +currentValue.slice(caretPosition);
                         input.setSelectionRange(caretPosition + 3, caretPosition + 3);
                         send_expressions(input.value);
                    }
                }else{
                    input.value =currentValue.slice(0, caretPosition) + "*"+value+"*" +currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 3, caretPosition + 3);
                    send_expressions(input.value);
                }
             
            }else if((lastCharBeforeCaret=="!" || lastCharBeforeCaret=="%" || lastCharBeforeCaret=="]" || lastCharBeforeCaret=="e" ) && firstCharAfterCaret!="("){ 
                if(value=="e"){
                    if(handle_e!=0){
                         input.value =currentValue.slice(0, caretPosition) + "*"+value +currentValue.slice(caretPosition);
                         input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                         send_expressions(input.value);
                    }
                }else{
                    input.value =currentValue.slice(0, caretPosition) + "*"+value +currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                    send_expressions(input.value);
                }
         
            }else if((lastCharBeforeCaret!="!" && lastCharBeforeCaret!="%" && lastCharBeforeCaret!="]" && lastCharBeforeCaret!="e" ) && firstCharAfterCaret=="("){ 
                if(value=="e" && handle_e!=0){
                    input.value =currentValue.slice(0, caretPosition) + "*"+value+"*"+currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 3, caretPosition + 3);
                    send_expressions(input.value);
                }else{
                    input.value =currentValue.slice(0, caretPosition) +value+ "*"+currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                    send_expressions(input.value);
                } 
            }
            else{
                if(value=="e" && handle_e!=0 && firstCharAfterCaret!="."){
                    input.value =currentValue.slice(0, caretPosition) + "*"+value+ currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                    send_expressions(input.value);
                }else{
                    if(value!="e"){
                        input.value=newValue;
                        input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                        send_expressions(input.value);
                    }
                }
            }

        }else if(Allowed.includes(secondOfToLastCharBeforeCaret) && lastCharBeforeCaret==" " && deniedOperators.includes(firstCharAfterCaret) && secondOfToLastCharBeforeCaret!="l" && secondOfToLastCharBeforeCaret!="g" && value!="e"){
            if((secondOfToLastCharBeforeCaret=="!" || secondOfToLastCharBeforeCaret=="%" || secondOfToLastCharBeforeCaret=="]") && firstCharAfterCaret=="("){ 
                    input.value =currentValue.slice(0, caretPosition) + "*"+value +"*" +currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 3, caretPosition + 3);
                    send_expressions(input.value);
             
            }else if((secondOfToLastCharBeforeCaret=="!" || secondOfToLastCharBeforeCaret=="%" || secondOfToLastCharBeforeCaret=="]") && firstCharAfterCaret!="("){ 
                    input.value =currentValue.slice(0, caretPosition) + "*"+value+currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                    send_expressions(input.value);
         
            }else if((secondOfToLastCharBeforeCaret!="!" && secondOfToLastCharBeforeCaret!="%" && secondOfToLastCharBeforeCaret!="]") && firstCharAfterCaret=="("){ 
                    input.value =currentValue.slice(0, caretPosition) +value+ "*"+currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                    send_expressions(input.value);  
            }else{ 
                        input.value=newValue;
                        input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                        send_expressions(input.value);
                
            }

        }else if(Allowed.includes(lastCharBeforeCaret) && firstCharAfterCaret==" " && deniedOperators.includes(secondOfTofirstCharAfterCaret) && lastCharBeforeCaret!="l" && lastCharBeforeCaret!="g" && value!="e"){
            if((lastCharBeforeCaret=="!" || lastCharBeforeCaret=="%" || lastCharBeforeCaret=="]") && secondOfTofirstCharAfterCaret=="("){ 
                    input.value =currentValue.slice(0, caretPosition) + "*"+value +"*" +currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 3, caretPosition + 3);
                    send_expressions(input.value);
             
            }else if((lastCharBeforeCaret=="!" || lastCharBeforeCaret=="%" || lastCharBeforeCaret=="]") && secondOfTofirstCharAfterCaret!="("){ 
                    input.value =currentValue.slice(0, caretPosition) + "*"+value+currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                    send_expressions(input.value);
         
            }else if((lastCharBeforeCaret!="!" && lastCharBeforeCaret!="%" && lastCharBeforeCaret!="]") && secondOfTofirstCharAfterCaret=="("){ 
                    input.value =currentValue.slice(0, caretPosition) +value+ "*"+currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                    send_expressions(input.value);  
            }else{ 
                        input.value=newValue;
                        input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                        send_expressions(input.value);
                
            }

        }else if(deniedOperators.includes(lastCharBeforeCaret) && lastCharBeforeCaret!="" && Allowed.includes(firstCharAfterCaret)){
            if(lastCharBeforeCaret==")" && (firstCharAfterCaret!="]" && firstCharAfterCaret!=",")){
                if(value=="e" && handle_e!=0){
                    input.value =currentValue.slice(0, caretPosition) + "*"+value+"*" + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 3, caretPosition + 3);
                    send_expressions(input.value);
                }else{
                    if(value=="e"){
                        if(handle_e!=0){
                             input.value =currentValue.slice(0, caretPosition) + "*"+value +currentValue.slice(caretPosition);
                             input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                             send_expressions(input.value);
                        }
                    }else{
                        input.value =currentValue.slice(0, caretPosition) + "*"+value +currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                        send_expressions(input.value);
                    }
                }
            }else if(lastCharBeforeCaret==")" && (firstCharAfterCaret=="]" || firstCharAfterCaret==",")){ 
                if(value=="e"){
                    if(handle_e!=0){
                         input.value =currentValue.slice(0, caretPosition) + "*"+value +currentValue.slice(caretPosition);
                         input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                         send_expressions(input.value);
                    }
                }else{
                    input.value =currentValue.slice(0, caretPosition) + "*"+value +currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                    send_expressions(input.value);
                }
            }else if(lastCharBeforeCaret!=")" && (firstCharAfterCaret=="]" || firstCharAfterCaret==",")){ 
                if(value=="e"){
                    if(handle_e!=0){
                         input.value =currentValue.slice(0, caretPosition) +value +currentValue.slice(caretPosition);
                         input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                         send_expressions(input.value);
                    }
                }else{
                    input.value =currentValue.slice(0, caretPosition) +value +currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                    send_expressions(input.value);
                }
            }
            else{
                if(lastCharBeforeCaret=="/" && value=='0'){
                    input.focus();
                }else if(firstCharAfterCaret=="e"){ 
                    if(value=="e"){
                        if(handle_e!=0){
                             input.value =currentValue.slice(0, caretPosition) +value + "*"+currentValue.slice(caretPosition);
                             input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                             send_expressions(input.value);
                        }
                    }else{
                        input.value =currentValue.slice(0, caretPosition)  +value + "*" +currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                        send_expressions(input.value);
                    }
                }else if(value=="e" && handle_e!=0){
                    if(firstCharAfterCaret==""){
                        input.value=newValue;
                        input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                        send_expressions(input.value);
                    }else{
                        input.value =currentValue.slice(0, caretPosition) +value+"*" + currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                        send_expressions(input.value);
                    }
                }else{
                    if(value!="e"){
                        input.value=newValue;
                        input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                        send_expressions(input.value);
                    }
                   
                }
            }
            
        }else if(deniedOperators.includes(secondOfToLastCharBeforeCaret) && lastCharBeforeCaret==" " && Allowed.includes(firstCharAfterCaret) && value!="e"){
            if(secondOfToLastCharBeforeCaret==")" && (firstCharAfterCaret!="]" && firstCharAfterCaret!=",")){
                    input.value =currentValue.slice(0, caretPosition) + "*"+value + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                    send_expressions(input.value); 
            }else if(secondOfToLastCharBeforeCaret==")" && (firstCharAfterCaret=="]" || firstCharAfterCaret==",")){ 
                    input.value =currentValue.slice(0, caretPosition) + "*"+value + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                    send_expressions(input.value); 
            }else if(secondOfToLastCharBeforeCaret!=")" && (firstCharAfterCaret=="]" || firstCharAfterCaret==",")){ 
                input.value =currentValue.slice(0, caretPosition)+value + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value); 
            }else{
                if(secondOfToLastCharBeforeCaret=="/" && value=='0'){
                    input.focus();
                }else{
                    input.value=newValue;
                    input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                    send_expressions(input.value);
                }
            }
        }else if(deniedOperators.includes(lastCharBeforeCaret) && firstCharAfterCaret==" " && Allowed.includes(secondOfTofirstCharAfterCaret) && value!="e"){
            if(lastCharBeforeCaret==")" && (secondOfTofirstCharAfterCaret!="]" && secondOfTofirstCharAfterCaret!=",")){
                
                    input.value =currentValue.slice(0, caretPosition) + "*"+value + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                    send_expressions(input.value); 
            }else if(lastCharBeforeCaret==")" && (secondOfTofirstCharAfterCaret=="]" || secondOfTofirstCharAfterCaret==",")){ 
                    input.value =currentValue.slice(0, caretPosition) + "*"+value + currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                    send_expressions(input.value); 
            }else if(lastCharBeforeCaret!=")" && (secondOfTofirstCharAfterCaret=="]" || secondOfTofirstCharAfterCaret==",")){ 
                input.value =currentValue.slice(0, caretPosition)+value + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value); 
            }else{
                if(lastCharBeforeCaret=="/" && value=='0'){
                    input.focus();
                }else{
                    input.value=newValue;
                    input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                    send_expressions(input.value);
                }
            }
            
        }else if(deniedOperators.includes(lastCharBeforeCaret)&& lastCharBeforeCaret!="" && deniedOperators.includes(firstCharAfterCaret)){
            if(lastCharBeforeCaret==")"){
                if(value=="e"){
                    if(handle_e!=0){
                         input.value =currentValue.slice(0, caretPosition) + "*"+value +currentValue.slice(caretPosition);
                         input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                         send_expressions(input.value);
                    }
                }else{
                    input.value =currentValue.slice(0, caretPosition) + "*"+value +currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                    send_expressions(input.value);
                }
            }else{
                if(lastCharBeforeCaret=="/" && value=='0'){ 
                    input.focus();
                }else{
                    if(value=="e"){
                        if(handle_e!=0){
                             input.value=newValue;
                             input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                             send_expressions(input.value);
                        }
                    }else{
                        input.value=newValue;
                        input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                        send_expressions(input.value);
                    }
                }
            }
            
        }else if(deniedOperators.includes(secondOfToLastCharBeforeCaret)  && lastCharBeforeCaret==" " && deniedOperators.includes(firstCharAfterCaret) && value!="e"){
            if(secondOfToLastCharBeforeCaret==")"){
                input.value =currentValue.slice(0, caretPosition) + "*"+value + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                send_expressions(input.value);
            }else{
                if(secondOfToLastCharBeforeCaret=="/" && value=='0'){ 
                    input.focus();
                }else{
                    input.value=newValue;
                    input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                    send_expressions(input.value);
                }
            }
            
        }else if(deniedOperators.includes(lastCharBeforeCaret) && firstCharAfterCaret==" " && deniedOperators.includes(firstCharAfterCaret) && value!="e"){
            if(lastCharBeforeCaret==")"){
                input.value =currentValue.slice(0, caretPosition) + "*"+value + currentValue.slice(caretPosition);
                input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                send_expressions(input.value);
            }else{
                if(lastCharBeforeCaret=="/" && value=='0'){
                    input.focus();
                }else{
                    input.value=newValue;
                    input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                    send_expressions(input.value);
                }
            }
            
        }else if(lastCharBeforeCaret==""){
            if(firstCharAfterCaret=="(" || firstCharAfterCaret=="g" || firstCharAfterCaret=="l"){
                if(value=="e"){
                    if(handle_e!=0){
                         input.value =currentValue.slice(0, caretPosition) +value + "*"+currentValue.slice(caretPosition);
                         input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                         send_expressions(input.value);
                    }
                }else{
                    input.value =currentValue.slice(0, caretPosition)  +value + "*" +currentValue.slice(caretPosition);
                    input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                    send_expressions(input.value);
                }
            }else{
                if(firstCharAfterCaret=="e"){
                    if(value=="e"){
                        if(handle_e!=0){
                             input.value =currentValue.slice(0, caretPosition) +value + "*"+currentValue.slice(caretPosition);
                             input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                             send_expressions(input.value);
                        }
                    }else{
                        input.value =currentValue.slice(0, caretPosition)  +value + "*" +currentValue.slice(caretPosition);
                        input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                        send_expressions(input.value);
                    }
                }else{
                    if(value=="e" && handle_e!=0){
                        if(firstCharAfterCaret=="" || deniedOperators.includes(firstCharAfterCaret)){
                            input.value=newValue;
                            input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                            send_expressions(input.value);
                        }else{
                            input.value =currentValue.slice(0, caretPosition) +value + "*"+ currentValue.slice(caretPosition);
                            input.setSelectionRange(caretPosition + 2, caretPosition + 2);
                            send_expressions(input.value);
                        }
                    }else{
                        input.value=newValue;
                        input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                        send_expressions(input.value);
                    }
                }
            }
        }else if(lastCharBeforeCaret=="^" || (secondOfToLastCharBeforeCaret=="^" && lastCharBeforeCaret==" ")){
            if(value!="e"){ 
                input.value=newValue;
                input.setSelectionRange(caretPosition + 1, caretPosition + 1);
                send_expressions(input.value);
            }
        }
    } 
    input.focus();
}
function history__(input,output){
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "history.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let data = xhr.responseText;
            history_list.innerHTML=data;
        }
    };
    const data = `input=${encodeURIComponent(input)}&output=${encodeURIComponent(output)}`;
    xhr.send(data); 
}
function clearDisplay() { 
    input.focus();
    history__(input.value,output.innerHTML);
    input.value = "";
    output.innerHTML="0";
    
}

function calculate() {
    history__(input.value,output.innerHTML);
    if(output.style.display=='none'){
        input.value=output.innerHTML;
        input.focus();
    } 
}

function deleteNumber() {  
    let caretPosition = input.selectionStart;
    let currentValue = input.value; 
    let lastCharBeforeCaret = input.value.charAt(caretPosition - 1); 
    let firstCharAfterCaret = input.value.charAt(caretPosition);
    if(lastCharBeforeCaret!="" && (lastCharBeforeCaret=="," || lastCharBeforeCaret=="]" || lastCharBeforeCaret=="g" || lastCharBeforeCaret=="c" 
        || lastCharBeforeCaret=="d" || lastCharBeforeCaret=="l" || lastCharBeforeCaret=="c" || lastCharBeforeCaret=="m")){
            input.setSelectionRange(caretPosition-1, caretPosition-1);
            input.focus();
    }else if(lastCharBeforeCaret!="" && Allowed.includes(lastCharBeforeCaret) && Allowed.includes(firstCharAfterCaret) && lastCharBeforeCaret!="["){
            input.value = currentValue.slice(0, caretPosition-1)+ currentValue.slice(caretPosition); 
            input.setSelectionRange(caretPosition-1, caretPosition-1);
            send_expressions(input.value);
    }else if (lastCharBeforeCaret == "[") {
        let i = 0;
        while (true) {
            let firstChar = currentValue.charAt(caretPosition + i);
            if (firstChar == "]") {
                input.value = currentValue.slice(0, caretPosition - 4) + currentValue.slice(caretPosition + i + 1); 
                input.setSelectionRange(caretPosition - 4, caretPosition - 4);
                send_expressions(input.value);
                break;
            }
            i++;
            // Break if we reach the end of the string to avoid infinite loop
            if (caretPosition + i >= currentValue.length) {
                break;
            }
        }
    }else{
        if(lastCharBeforeCaret==" " || (firstCharAfterCaret==" " && lastCharBeforeCaret!="")){
            input.value = currentValue.slice(0, caretPosition-1)+ currentValue.slice(caretPosition); 
            input.setSelectionRange(caretPosition-1, caretPosition-1);
            send_expressions(input.value);
        }else{
            if(lastCharBeforeCaret!=""){
                input.value = currentValue.slice(0, caretPosition-1)+ currentValue.slice(caretPosition); 
                input.setSelectionRange(caretPosition-1, caretPosition-1);
                send_expressions(input.value);
            }else{
                input.focus();
            }
        }  
    }
    input.focus();
}

const dropdown = document.querySelector(".dropdown"),
      dropdown_content_button = document.querySelectorAll(".dropdown_content button"),
      menu=document.querySelector(".menu"),
      body=document.querySelector("body"),
      calculator=document.querySelector(".calculator"),
      display_area = document.querySelector(".display-area"),
      display_area_for_content=document.querySelector(".display-area_for_content"),
      button=document.querySelectorAll(".button button:not(.key)"),
      key=document.querySelectorAll(".button .key"),
      mode=document.querySelector(".mode"),
      btn_mode=document.querySelector(".btn_mode"), 
      bnt_History = document.querySelector(".bnt_History"),
      btn_back = document.querySelector(".fa-arrow-left"),
      history_ = document.querySelector(".History"),
      Theme=document.querySelector(".Theme"),
      btn_Theme=document.querySelector(".btn_Theme"),
      slides = document.querySelectorAll('.slide'),
      dots = document.querySelectorAll('.dot'),
      slidesContainer = document.querySelector('.slides'),
      classic = document.querySelector('.classic'),
      expression_ = document.querySelector('.expression'),
      cancel=document.querySelectorAll(".cancel"),
      inputTypeText = document.querySelector('.display-area input[type="text"]'),
      setup_button=document.querySelector(".setup_button"),
      setup_button1=document.querySelector(".setup_button1");
      
document.addEventListener('DOMContentLoaded', function() {
menu.onclick = function() {
        if ( dropdown.style.display == 'block') {
             dropdown.style.display = 'none';
             input.focus();
        }else {
         dropdown.style.display = 'block';
        }
        event.stopPropagation();
}; 
  // Close the dropdown when clicking outside of it
  document.addEventListener('click', function() {
    dropdown.style.display = 'none';
    input.focus();
  });

  // Prevent the dropdown from closing when clicking inside it
  dropdown.addEventListener('click', function(event) {
    event.stopPropagation();
  });
});
//Change to classic mode
classic.onclick = function(){
    classic.style.backgroundColor = 'lightgray'; 
    expression_.style.backgroundColor = 'transparent'; 
}
//Change to expression mode
expression_.onclick = function(){
    expression_.style.backgroundColor = 'lightgray'; 
    classic.style.backgroundColor = 'transparent';    
}
//To confirm a mode
setup_button.onclick = function(){
    if( classic.style.backgroundColor == 'lightgray'){
        inputTypeText.style.textAlign = 'right';
        inputTypeText.style.fontSize = '35px';
        inputTypeText.style.width = '95%';
        input.focus();
        output.style.display = 'none';
        mode.style.display = 'none';    
        display_area_for_content.style.display = 'none';
    }else{
        inputTypeText.style.textAlign = 'left';
        inputTypeText.style.fontSize = '20px';
        inputTypeText.style.width = '100%';
        input.focus();
        output.style.display = 'block';
        mode.style.display = 'none';    
        display_area_for_content.style.display = 'none';
    }
}
//To cancel a mode or a theme
cancel.forEach(function(cancel) {
        cancel.onclick=function(){
        display_area_for_content.style.display = 'none';
        mode.style.display = 'none';
        input.focus();
        }
    });
 
btn_mode.onclick = function(){
    display_area_for_content.style.display = 'block';
    mode.style.display = 'block';
    dropdown.style.display = 'none';
    history_.style.display = 'none';
    Theme.style.display = 'none';
}
 
bnt_History.onclick = function(){
      history_.style.display = 'block';
      display_area_for_content.style.display = 'none';
      mode.style.display = 'none';
      dropdown.style.display = 'none';
}
//To cancel history
btn_back.onclick = function(){
    history_.style.display = 'none';
}
 
btn_Theme.onclick = function(){
      display_area_for_content.style.display = 'block';
      Theme.style.display = 'block';
      dropdown.style.display = 'none';
      history_.style.display = 'none';
      mode.style.display = 'none';
}

    let currentIndex = 0;

function showSlides(index) { 
    if (index >= slides.length) {
        currentIndex = 0;
    }else if(index < 0){
        currentIndex = slides.length - 1;
    }  
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => {
        dot.className = dot.className.replace(' active', '');
        if (i === currentIndex) {
            dot.className += ' active';
        }
    });
}

function currentSlide(index) {
    currentIndex = index;
    showSlides(currentIndex);
}
document.addEventListener('DOMContentLoaded', () => {
    showSlides(currentIndex);
});
//To confirm a Theme
setup_button1.onclick = function(){
    if(currentIndex==0){
        calculator.style.backgroundColor = 'wheat';  
        dropdown.style.backgroundColor = 'wheat';
        display_area_for_content.style.backgroundColor = 'wheat';
        display_area.style.backgroundColor = 'white';
        inputTypeText.style.backgroundColor = 'white';
        key.forEach(function(keys) {
            keys.style.color = 'black';
            keys.style.backgroundColor = 'whitesmoke';
        });
        button.forEach(function(buttons_not_key) { 
            buttons_not_key.style.color = 'black';
            buttons_not_key.style.backgroundColor = 'white';
            buttons_not_key.addEventListener('mouseover', function() {
            buttons_not_key.style.backgroundColor = 'whitesmoke';
            });
            buttons_not_key.addEventListener('mouseout', function() {
            buttons_not_key.style.backgroundColor = 'white';
            });
        });
        dropdown_content_button.forEach(function(buttons) { 
            buttons.style.color = 'black';
            buttons.addEventListener('mouseover', function() {
                buttons.style.backgroundColor = 'whitesmoke';
            });
            buttons.addEventListener('mouseout', function() {
                buttons.style.backgroundColor = 'transparent';
            });
            
        });
        history_.style.color = 'black';
        history_.style.backgroundColor = 'white';
        inputTypeText.style.color = 'black';
        body.style.color = 'black';
        menu.style.color = 'black';
        input.focus(); 
        Theme.style.display = 'none';    
        display_area_for_content.style.display = 'none';
    }else if(currentIndex==1) {
        calculator.style.backgroundColor = 'gainsboro';  
        dropdown.style.backgroundColor = 'gainsboro';
        display_area_for_content.style.backgroundColor = 'gainsboro';
        display_area.style.backgroundColor = 'white';
        inputTypeText.style.backgroundColor = 'white';
        key.forEach(function(keys) { 
            keys.style.color = 'black';
            keys.style.backgroundColor = 'whitesmoke';
        });
        button.forEach(function(buttons_not_key) { 
            buttons_not_key.style.color = 'black';
            buttons_not_key.style.backgroundColor = 'white';
            buttons_not_key.addEventListener('mouseover', function() {
                buttons_not_key.style.backgroundColor = 'whitesmoke';
            });
            buttons_not_key.addEventListener('mouseout', function() {
                buttons_not_key.style.backgroundColor = 'white';
            });
        });
        dropdown_content_button.forEach(function(buttons) { 
            buttons.style.color = 'black';
            buttons.addEventListener('mouseover', function() {
                buttons.style.backgroundColor = 'whitesmoke';
            });
            buttons.addEventListener('mouseout', function() {
                buttons.style.backgroundColor = 'transparent';
            });
            
        });
        
        inputTypeText.style.color = 'black';
        history_.style.color = 'black';
        history_.style.backgroundColor = 'white';
        body.style.color = 'black';
        menu.style.color = 'black';
        input.focus(); 
        Theme.style.display = 'none';    
        display_area_for_content.style.display = 'none';
    }else if(currentIndex==2){
        calculator.style.backgroundColor = 'black';  
        dropdown.style.backgroundColor = 'black';
        display_area_for_content.style.backgroundColor = 'black';
        display_area.style.backgroundColor = 'black';
        inputTypeText.style.backgroundColor = 'black';
        key.forEach(function(keys) { 
            keys.style.color = 'white';
            keys.style.backgroundColor = 'black';
        });
        button.forEach(function(buttons_not_key) { 
            buttons_not_key.style.color = 'white';
            buttons_not_key.style.backgroundColor = 'grey';
            buttons_not_key.addEventListener('mouseover', function() {
                buttons_not_key.style.backgroundColor = 'darkgrey';
            });
            buttons_not_key.addEventListener('mouseout', function() {
                buttons_not_key.style.backgroundColor = 'grey';
            });
        });
        dropdown_content_button.forEach(function(buttons) { 
            buttons.style.color = 'white';
            buttons.addEventListener('mouseover', function() {
                buttons.style.backgroundColor = 'grey';
            });
            buttons.addEventListener('mouseout', function() {
                buttons.style.backgroundColor = 'transparent';
            });
        });
        inputTypeText.style.color = 'white';
        history_.style.color = 'white';
        history_.style.backgroundColor = 'black';
        body.style.color = 'white';
        menu.style.color = 'white';
        input.focus(); 
        Theme.style.display = 'none';    
        display_area_for_content.style.display = 'none';
    }  
}        



