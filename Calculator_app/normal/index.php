<?php
include 'confige.php';
$output=array();
$sql = "SELECT expression, result, dates FROM history ORDER BY dates DESC";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $output[]= '<div class="list"><p style="font-size: 10px;">'. $row["dates"].'</p><p>'.$row["expression"].' <br><span>'. $row["result"].'</span></p></div>';
    }
}  
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Calculator App</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <link rel="stylesheet" type="text/css" href="style.css">
  <script src="handle_expression.js" defer></script>
</head>
<body>
    <div class="calculator">
        <div class="History"> 
            <h5><i class="fa fa-arrow-left" aria-hidden="true"></i>History</h5>
            <div class="lists"><?php 
            foreach($output as $outputs){
                echo $outputs;
            }
             ?></div>
         </div>
        <div class="display-area">
            <button class="menu"><i class="fas fa-bars"></i></button>
            <div class="dropdown">
                <div class="dropdown_content">
                    <h4>Calculator</h4>
                    <button class="btn_mode"><i class="fas fa-magic"></i> Mode</button>
                    <button class="btn_Theme"><i class="fas fa-palette"></i> Theme</button>
                    <button class="bnt_History"><i class="fas fa-history"></i> History</button>
                    <button><i class="fas fa-clone"></i> Clipboard</button>
                </div>
            </div>
            <input type="text" class="input" id="expressionInput" onkeydown="handleKeyPress(event)" spellcheck="false" autofocus>
            <div class="output">0</div>
        </div>
        <div class="display-area_for_content">
            <div class="mode">
                <h4>calculator mode</h4>
                <p>INPUT METHOD</p>
                <div class="classic">
                    <div><img src="images/classic.png" alt=""></div> 
                    <div><h4>classic</h4>
                    <p>traditional one-line display</p>
                    </div>
                </div>
                <div class="expression"> 
                    <div><img src="images/expression.png" alt=""></div>
                    <div><h4>expression</h4>
                    <p>two-line display with expression and result</p>
                    </div>
                </div>
                <div class="setup">
                    <button class="cancel">cancel</button>
                    <button class="setup_button">ok</button>
                </div>
            </div>
            <div class="Theme">
                <h4>Theme</h4>
                <div class="slides">
                    <div class="slide"><img src="images/themes.png" alt=""></div>
                    <div class="slide"><img src="images/theme1.png" alt=""></div>
                    <div class="slide"><img src="images/theme2.png" alt=""></div>
                </div>
                <div class="dots">
                    <span class="dot" onclick="currentSlide(0)"></span>
                    <span class="dot" onclick="currentSlide(1)"></span>
                    <span class="dot" onclick="currentSlide(2)"></span> 
                </div>
                <div class="setup">
                    <button class="cancel">cancel</button>
                    <button class="setup_button1">ok</button>
                </div>
            </div>
        </div>
        <div class="button">
            <button class="key" onclick="appendToDisplay('left')"><i class="fas fa-caret-left"></i></button> 
            <button class="key" onclick="appendToDisplay('right')"><i class="fas fa-caret-right"></i></button>
            <button class="key" onclick="clearDisplay()">C</button>
            <button class="key" onclick="deleteNumber()"><i class="fas fa-backspace"></i></button>
            <button class="key" onclick="appendToDisplay('e')">e</button>
            <button class="key" onclick="appendToDisplay('%')">%</button>
            <button class="key" onclick="appendToDisplay('^')">^</button>
            <button class="key" onclick="appendToDisplay('!')">!</button>
            <button class="key" onclick="appendToDisplay('lcm[ , ]')">lcm</button> 
            <button class="key" onclick="appendToDisplay('gcd[ , ]')">gcd</button> 
            <button class="key" onclick="appendToDisplay('open')">(</button>
            <button class="key" onclick="appendToDisplay('closed')">)</button> 
            <button onclick="appendToDisplay('7')">7</button>
            <button onclick="appendToDisplay('8')">8</button>
            <button onclick="appendToDisplay('9')">9</button> 
            <button class="key" onclick="appendToDisplay('/')"><i class="fas fa-divide"></i></button> 
            <button onclick="appendToDisplay('4')">4</button>
            <button onclick="appendToDisplay('5')">5</button>
            <button onclick="appendToDisplay('6')">6</button>
            <button class="key" onclick="appendToDisplay('*')"><i class="fas fa-times"></i></button>
            <button onclick="appendToDisplay('1')">1</button>
            <button onclick="appendToDisplay('2')">2</button>
            <button onclick="appendToDisplay('3')">3</button>
            <button class="key" onclick="appendToDisplay('-')"><i class="fas fa-minus"></i></button>
            <button onclick="appendToDisplay('0')">0</button>
            <button onclick="appendToDisplay('.')">&nbsp;.</button>
            <button onclick="calculate()">=</button>
            <button class="key" onclick="appendToDisplay('+')"><i class="fas fa-plus"></i></button>
        </div>
    </div>
</body>
</html>

