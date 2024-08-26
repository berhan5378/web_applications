<?php
 session_start();
include_once "config.php";
if (isset($_GET['value'])) {
    $value = $_GET['value'];
    
}

$sql = "SELECT outgoing_msg_id FROM messages WHERE outgoing_msg_id = {$_SESSION['unique_id']}";

$query = mysqli_query($conn, $sql);
    if(mysqli_num_rows($query) > 0){
        while($row = mysqli_fetch_assoc($query)){ 
            $sql = "DELETE FROM messages WHERE (outgoing_msg_id = {$row['outgoing_msg_id']} AND incoming_msg_id=$value) or (incoming_msg_id = {$row['outgoing_msg_id']} AND outgoing_msg_id=$value)";
            if ($conn->query($sql) === TRUE) {
                $output= "Message deleted successfully";
            } else {
                $output= "Error deleting message: " . $conn->error;
            }
        }
        echo $output;
    }

?>