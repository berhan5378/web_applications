<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Calculator App</title>
  <link rel="stylesheet" type="text/css" href="styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="app.js" defer></script>
</head>
<body>
  <div class="calculator">
    <div class="display-area">
      <input type="text" class="input" id="expressionInput" onkeydown="handleKeyPress(event)" spellcheck="false" autofocus>
      <div class="output">0</div>
    </div>
    <div class="buttons">
      <div class="short-key">
       <div class="row1">
          <button onclick="appendToDisplay('open')">(</button>
          <button onclick="appendToDisplay('closed')">)</button>
          <button onclick="appendToDisplay('left')"><i class="fas fa-caret-left"></i></button> 
          <button onclick="appendToDisplay('right')"><i class="fas fa-caret-right"></i></button> 
          <button onclick="deleteNumber()" style="background-color: rgb(255, 166, 0);"><i class="fas fa-times"></i></button>
          <button onclick="clearDisplay()" style="background-color: rgb(255, 166, 0);">AC</button>
        </div>
        <div class="row2">
           <button onclick="appendToDisplay('^')">^</button>
           <button onclick="appendToDisplay('!')">n!</button>
           <button onclick="appendToDisplay('lcm[ , ]')">lcm</button> 
           <button onclick="appendToDisplay('gcd[ , ]')">gcd</button> 
           <button onclick="appendToDisplay('%')">%</button>
        </div>
      </div>
      <div class="key">
        <div class="row3">
           <button onclick="appendToDisplay('7')">7</button>
           <button onclick="appendToDisplay('8')">8</button>
           <button onclick="appendToDisplay('9')">9</button> 
           <button onclick="appendToDisplay('4')">4</button>
           <button onclick="appendToDisplay('5')">5</button>
           <button onclick="appendToDisplay('6')">6</button>
           <button onclick="appendToDisplay('1')">1</button>
           <button onclick="appendToDisplay('2')">2</button>
           <button onclick="appendToDisplay('3')">3</button>
           <button onclick="appendToDisplay('0')">0</button>
           <button onclick="appendToDisplay('.')">&nbsp;.</button>
           <button onclick="calculate()">=</button>
        </div>
        <div class="row4">
           <button onclick="appendToDisplay('*')"><i class="fas fa-times"></i></button>
           <button onclick="appendToDisplay('/')"><i class="fas fa-divide"></i></button> 
           <button onclick="appendToDisplay('-')"><i class="fas fa-minus"></i></button>
           <button onclick="appendToDisplay('+')"><i class="fas fa-plus"></i></button>
           </div>
      </div>
    </div>
  </div>
</body>
</html>

