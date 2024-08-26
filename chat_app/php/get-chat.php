<?php
    session_start();
    if(isset($_SESSION['unique_id'])){
        include_once "config.php";
        if (isset($_GET['value'])) {
            $value = $_GET['value']; 
        }
        $outgoing_id = $_SESSION['unique_id'];
        $incoming_id = mysqli_real_escape_string($conn, $value);
        $output = "";
        $sql = "SELECT * FROM messages LEFT JOIN users ON users.unique_id = messages.outgoing_msg_id
                WHERE (outgoing_msg_id = {$outgoing_id} AND incoming_msg_id = {$incoming_id})
                OR (outgoing_msg_id = {$incoming_id} AND incoming_msg_id = {$outgoing_id}) ORDER BY msg_id";
        $query = mysqli_query($conn, $sql);
        if(mysqli_num_rows($query) > 0){

            function formatMessage($message) {
                $pattern = '/(https?:\/\/[^\s]+)/i';
                if (preg_match($pattern, $message)) {
                    $formattedMessage = preg_replace_callback($pattern, function($matches) {
                        $url = $matches[1];
                         
                            return '<a href="' . $url . '" target="_blank">'. $url .'</a>';
                        
                    }, $message);
                } else {
                    $formattedMessage = $message;
                }
                
                return $formattedMessage;
            }

            while($row = mysqli_fetch_assoc($query)){
                $seen_symbol = ($row['msg_status'] == 'seen') ? '<i class="bx bx-check-double"></i>' : '<i class="bx bx-check" ></i>';
                if($row['outgoing_msg_id'] === $outgoing_id){
                    $output .= ' <div class="messages">
                    <div></div>
                    <div class="left_message">
                    <p>'.formatMessage($row['msg']) ."</br>".'<span class="left_timestampe">'.date('M/d/Y g:ia', strtotime($row['timestamp'])).'&nbsp;'. $seen_symbol .'</span></p> 
                    </div>
                </div>';
                 
                }else{
                    $output .= ' <div class="messages">
                    <div class="right_message">
                    <p>'.formatMessage($row['msg']) ."</br>".'<span class="right_timestampe">'.date('M/d/Y g:ia', strtotime($row['timestamp'])).'&nbsp;'. $seen_symbol .'</span></p>
                    </div>
                </div>
                <div></div>';
                if ($row['msg_status'] != 'seen') {
                    $updateSql = "UPDATE messages SET msg_status = 'seen' WHERE msg_id = {$row['msg_id']}";
                    $updateResult = mysqli_query($conn, $updateSql); 
                }
                }
            }
        }else{
            $output .= '<div style="display: grid; height: 60vh;justify-content: center;align-items: center;">No messages are available. Once you send message they will appear here.</div>';
        }
        echo $output;
    }else{
        header("location: ../form.php");
    }

?>