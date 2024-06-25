<?php
//Evaluate gcd[,].
function gcd($a, $b) {
    while ($b != 0) {
        $temp = $b;
        $b = $a % $b;
        $a = $temp;
    }
    return abs($a);  
}
function gcd_list($numbers) { 
    if (count($numbers) < 2) return 0; // Not enough numbers

    $gcd_result = gcd($numbers[0], $numbers[1]);
    if ($numbers[0] != $gcd_result || $numbers[0] == $numbers[1]) {
        return $gcd_result;
    } 
    return 0;  // No valid numbers provided
}
//Evaluate lcm[,].
function lcm_list($numbers) { 
    if (count($numbers) < 2) return 0; // Not enough numbers

    if ($numbers[0] == 0 || $numbers[1] == 0) {
        return 0; // LCM involving zero should be zero
    }

    $gcd_result = gcd($numbers[0], $numbers[1]);
    if ($gcd_result == 0) return 0; // Avoid division by zero

    $lcm_result = abs($numbers[0] * $numbers[1]) / $gcd_result;
    return $lcm_result;
}

//Evaluate factorial.
function factorial($n) {
    if ($n < 0) {
        return null;  
    }
    if ($n == 0) {
        return 1;
    }
    $result = 1;
    for ($i = 1; $i <= $n; $i++) {
        $result *= $i;
    }
    return $result;
  }
  //Evaluate and Handle expression
function calculate($expression) {
    $expression = preg_replace('/\s+/', '', $expression);// Remove all spaces
// Correctly handle mismatched parentheses by ensuring balanced closure
    $openBrackets = substr_count($expression, '(');
    $closeBrackets = substr_count($expression, ')');
  
    if ($openBrackets > $closeBrackets) {
        $expression .= str_repeat(')', $openBrackets - $closeBrackets);
    }else if($openBrackets < $closeBrackets){
        $expression = str_repeat('(', $closeBrackets - $openBrackets) . $expression;
    }
 // Handle  LCM and GCD functions with Recursively nested expressions.
  while (preg_match('/(gcd|lcm)\[([^[\]]*)\]/', $expression, $matches)){
      $func = $matches[1]; 
      $args = explode(',', $matches[2]); 
      $results = array_map(function($arg) { return calculate($arg); }, $args);
    if ($func == 'gcd') {
        $result = gcd_list($results);
    } else { 
        $result = lcm_list($results);
    }

    $expression = str_replace($matches[0], $result, $expression);
  } 
  // Recursively resolve nested expressions
  while (preg_match('/\(([^()]*)\)/', $expression, $matches)) { 
     $expression = str_replace($matches[0], calculate($matches[1]), $expression);
  }
  //Evaluate constant e.
  while (preg_match('/e/', $expression, $matches)) {
    $num = 2.718281828459;
    $expression = str_replace($matches[0], $num, $expression);
  }
  //Evaluate percentages.
  while (preg_match('/(\d*\.?\d+)%/', $expression, $matches)) {
    $num = $matches[1];
    $percent = $num/100;
    $expression = str_replace($matches[0], $percent, $expression);
  }
   // Handle factorials
  while (preg_match('/(\d+)!/', $expression, $matches)) {
    $num = $matches[1];
    $factorialResult = factorial($num);
    $expression = str_replace($matches[0], $factorialResult, $expression);
  }
    //Evaluate power expressions.
  while (preg_match('/([-+]?\d*\.?\d+)\^([-+]?\d*\.?\d+)/', $expression, $matches)) {
    $result = pow($matches[1], $matches[2]); 
    $expression = str_replace($matches[0], $result, $expression);    
  }
  //Evaluate multiplication/division expressions.
  while (preg_match('/([-]?\d*\.?\d+)\s*([\/\*])\s*([-+]?\d*\.?\d+)/', $expression, $matches)) {
         
        $result = ($matches[2] == '*') ? $matches[1] * $matches[3] : $matches[1] / $matches[3];
        
        $expression = str_replace($matches[0], $result, $expression);
  } 
  //Evaluate addition/subtraction expressions.
  while (preg_match('/([-+]?\d*\.?\d+)\s*([-+])\s*([-+]?\d*\.?\d+)/', $expression, $matches)) {
        $operator = $matches[2];
        if ($operator == '+') { 
            $expression = str_replace($matches[0], $matches[1] + $matches[3], $expression);
             
        }else {
            $expression = str_replace($matches[0], $matches[1] - $matches[3], $expression);
        } 
    } 
    return floatval($expression);
} 

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $expression= $_POST['expressions'];
    $result =calculate($expression);
    echo $result;
} else{
    echo "0";
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
?>