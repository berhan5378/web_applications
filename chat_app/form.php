<?php 
  session_start();
  if(isset($_SESSION['unique_id'])){
    header("location: index");
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="form_style/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"/>

</head>
<body>
    <div class="container"> 
        <div class="sign_up-container">
            <div class="wrapper">
                <svg>
                    <text x="50%" y="30%" dy=".35em" text-anchor="middle">
                        Create an account
                    </text>
                </svg>
            </div>
            <form class="sign_up" method="POST" enctype="multipart/form-data" autocomplete="off">
                <div class="error-text"></div>
                <div class="InputField">
                    <div class="input">
                        <label for=""><i class='bx bxs-user'></i></label>
                        <input type="text" name="name" placeholder="Username">
                    </div>
                    <div class="input">
                        <label for=""><i class='bx bxs-envelope'></i></label>
                        <input type="email" name="email" placeholder="Email">
                    </div>
                    <div class="input">
                        <label for=""><i class='bx bxs-lock'></i></label>
                        <input type="password" name="password" placeholder="Password">
                    </div>
                </div>            
                <button type="submit" name="submit">SIGN UP</button>
                <p>Already have an account? <span class="btn_login">Login</span></p>
                <h5>---------OR--------</h5>
                <div class="sign_up_with">
                    <a href=""><img src="form_style/Illustration-of-Google-icon-on-transparent-background-PNG.png" alt=""></i><h6>Sign Up with Google</h6></a>
                    <a href=""><img src="form_style/R.png" alt=""><h6>Sign Up with Microsoft Account</h6></a>
                    <a href=""><i class='bx bxl-apple' ></i><h6>Sign Up with Apple</h6></a>
                </div>
            </form> 
        </div> 
        <div class="login-container">
            <div class="wrapper">
                <svg>
                    <text x="50%" y="30%" dy=".35em" text-anchor="middle">
                        Welcome back
                    </text>
                </svg>
            </div> 
            <form class="login" action="#" method="POST" enctype="multipart/form-data" autocomplete="off">
                <div class="error-text"></div> 
                <div class="InputField">
                    <div class="input">
                        <label for=""><i class='bx bxs-envelope'></i></label>
                        <input type="email" name="email" placeholder="Email">
                    </div>
                    <div class="input">
                        <label for=""><i class='bx bxs-lock'></i></label>
                        <input type="password" name="password"  placeholder="Password">
                    </div>
                </div>            
                <button type="submit" name="submit">LOGIN</button>
                <p>Don't have an account? <span class="btn_sign_up">Sign Up</span></p>
                <h5>---------OR--------</h5>
                <div class="sign_up_with">
                    <a href=""><img src="form_style/Illustration-of-Google-icon-on-transparent-background-PNG.png" alt=""></i><h6>Sign Up with Google</h6></a>
                    <a href=""><img src="form_style/R.png" alt=""><h6>Sign Up with Microsoft Account</h6></a>
                    <a href=""><i class='bx bxl-apple' ></i><h6>Sign Up with Apple</h6></a>
                </div>
            </form>
        </div>    
    </div>
    <script src="javascript/forms.js"></script>
</body>
</html>