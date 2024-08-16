<?php
 
include_once "config.php";
if (isset($_GET['value1'])) {
    $value = $_GET['value1'];
    
}

$user_id = mysqli_real_escape_string($conn, $value);
$sql1 = mysqli_query($conn, "SELECT * FROM users WHERE unique_id = {$user_id}");
if(mysqli_num_rows($sql1) > 0){
  $row1 = mysqli_fetch_assoc($sql1);
}else{
  echo "no";
}
 (empty($row1['img'])) ? $row1['img'] = "user.jpg" : $row1['img'];
echo '<div class="content"><i class="bx bx-arrow-back"></i>
        <img src="php/images/'.$row1['img'].'" alt="">
                    <div class="details">
                        <span>'.$row1['name'].'</span>
                        <p>'.$row1['status'].'</p>
                    </div>
                </div>
                <i class="bx bxs-trash"></i>';
?>