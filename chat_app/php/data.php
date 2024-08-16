<?php
    while($row = mysqli_fetch_assoc($query)){
        $sql2 = "SELECT * FROM messages WHERE (incoming_msg_id = {$row['unique_id']}
                OR outgoing_msg_id = {$row['unique_id']}) AND (outgoing_msg_id = {$outgoing_id} 
                OR incoming_msg_id = {$outgoing_id}) ORDER BY msg_id DESC LIMIT 1";
        $query2 = mysqli_query($conn, $sql2);
        $row2 = mysqli_fetch_assoc($query2); 
        if (mysqli_num_rows($query2) > 0){
            $seen_symbol = ($row2['msg_status'] == 'seen') ? '<i class="bx bx-check-double"></i>' : '<i class="bx bx-check" ></i>';
            $result = $row2['msg'];
        }else{
            $seen_symbol="";
            $result ="No message available";
        }
        (strlen($result) > 28) ? $msg =  substr($result, 0, 28) . '...' : $msg = $result;
        if(isset($row2['outgoing_msg_id'])){
            ($outgoing_id == $row2['outgoing_msg_id']) ? $you = "You: " : $you = "";
        }else{
            $you = "";
        }
        ($row['status'] == "Offline") ? $offline = "_offline" : $offline = "";
        ($outgoing_id == $row['unique_id']) ? $hid_me = "hide" : $hid_me = "";

        (empty($row['img'])) ? $row['img'] = "user.jpg" : $row['img'];
        $output .= '<button id="ok" value="'. $row['unique_id'] .'">
                    <div class="content">
                        <img src="php/images/'. $row['img'] .'" alt="">
                        <div class="details">
                            <span>'. $row['name'].'</span>
                            <p>'. $you . $msg .'</p>
                        </div>
                    </div>
                    <div>'.$seen_symbol.'<i class="bx bxs-circle" id="status-dot'. $offline .'" ></i></div>
                </button>';
                
    }
?>