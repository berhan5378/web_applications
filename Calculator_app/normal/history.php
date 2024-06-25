<?php
include 'confige.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $expression =$_POST['input'];
    $result =$_POST['output'];
    if(!empty($expression)) {
        // Check if the expression already exists
        $sql1 = "SELECT expression FROM history WHERE expression='$expression'";
        $check_result = $conn->query($sql1);

        if ($check_result->num_rows == 0) { 
            $insert = $conn->query("INSERT INTO history (expression, result) VALUES ('$expression', '$result')");
            if (!$insert) {
                echo "Error: " . $conn->error;
            }
        } 
    }
}
$sql = "SELECT expression, result, dates FROM history ORDER BY dates DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo '<div class="list"><p style="font-size: 10px;">'. $row["dates"].'</p><p>'.$row["expression"].' <br><span>'. $row["result"].'</span></p></div>';
    }
}  

$conn->close();
?>
