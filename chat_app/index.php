<?php  
  session_start();
  include_once "php/config.php";
  if(!isset($_SESSION['unique_id'])){
    header("location: form");
  }
  $sql = mysqli_query($conn, "SELECT * FROM users WHERE unique_id = {$_SESSION['unique_id']}");
  if(mysqli_num_rows($sql) > 0){
    $row = mysqli_fetch_assoc($sql);
  }
?> 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat App</title>
    <link rel="stylesheet" href="style.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>
    <div class="app">
        <section class="users">
            <header>
                <div class="content">
                   <img src="php/images/<?php echo (empty($row['img'])) ? $row['img'] = "user.jpg" : $row['img'];?>" alt="">
                   <div class="upload-container">
                        <h2>Upload Your Image</h2>
                        <p class="img_name"></p>
                        <form action="#" method="post" enctype="multipart/form-data">
                            <input type="file" name="image" id="file-upload" accept="image/*" required>
                            <label for="file-upload" class="custom-file-upload">
                                      Choose Image
                            </label>
                            <button type="submit" class="upload-btn">Upload</button>
                        </form>
                    </div>
                   <div class="details">
                        <span><?php echo $row['name'] ?></span>
                        <p><?php echo $row['status']; ?></p>
                    </div>
                </div>
                <a href="php/logout.php?logout_id=<?php echo $row['unique_id']; ?>"><i class='bx bx-log-out-circle'></i></a>
            </header> 
            <div class="search">
                <svg xmlns="http://www.w3.org/2000/svg" class="svg_icon bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path></svg>
                <input class="input" type="text" placeholder="Enter name to search...">
            </div>
            <div class="users-list"></div>
        </section>
        <section class="chat">
            <header></header>  
            <div class="chat-box"><div style="display: grid; height: 60vh;justify-content: center;align-items: center;">Select a chat to start messaging</div></div>
            <form action="#" class="typing-area">
                <input type="text" class="incoming_id" name="incoming_id" value="" hidden>
                <input type="text" name="message" class="input-field" placeholder="Type a message here..." autocomplete="off" rows="4" cols="50" maxlength="500">
                <button class="btn"><i class='bx bxl-telegram'></i></button>
            </form>
        </section>
    </div>
</body>
<script src="javascript/app.js"></script>
</html>