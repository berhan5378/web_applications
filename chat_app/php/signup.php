<?php
    session_start();
    include_once "config.php";
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    if(!empty($name) && !empty($email) && !empty($password)){
        if(filter_var($email, FILTER_VALIDATE_EMAIL)){
            $sql = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'");
            if(mysqli_num_rows($sql) > 0){
                echo "$email - This email already exist!";
            }else{ 
                 $ran_id = rand(time(), 100000000);
                 $status = "online";
                 $encrypt_pass = md5($password);
                 $insert_query = mysqli_query($conn, "INSERT INTO users (unique_id, name, email, password, status)
                 VALUES ({$ran_id}, '{$name}', '{$email}', '{$encrypt_pass}', '{$status}')");
                 if($insert_query){
                     $select_sql2 = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'");
                     if(mysqli_num_rows($select_sql2) > 0){
                         $result = mysqli_fetch_assoc($select_sql2);
                         $_SESSION['unique_id'] = $result['unique_id'];
                         echo "success";
                     }else{
                         echo "This email address not Exist!";
                     }
                 }else{
                     echo "Something went wrong. Please try again!";
                 } 
            }
        }else{
            echo "$email is not a valid email!";
        }
    }else{
        echo "All input fields are required!";
    }
?>