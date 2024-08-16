<?php
    
    session_start();
    include_once "config.php";
    $outgoing_id = $_SESSION['unique_id'];
    $sql = "SELECT u.*, MAX(m.timestamp) AS timestamp
        FROM users u
        LEFT JOIN messages m 
        ON (u.unique_id = m.incoming_msg_id AND m.outgoing_msg_id = $outgoing_id) 
        OR (u.unique_id = m.outgoing_msg_id AND m.incoming_msg_id = $outgoing_id)
        WHERE u.unique_id != $outgoing_id
        GROUP BY u.unique_id
        ORDER BY COALESCE(timestamp, '1970-01-01') DESC";
    $query = mysqli_query($conn, $sql);
    $output = "";
    if(mysqli_num_rows($query) == 0){
        $output .= "No users are available to chat";
    }elseif(mysqli_num_rows($query) > 0){
        include_once "data.php";
    }
    echo $output;
?>