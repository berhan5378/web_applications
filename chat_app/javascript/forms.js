const   btn_login = document.querySelector(".btn_login"),
        btn_sign_up = document.querySelector(".btn_sign_up"),
        signup_form = document.querySelector(".sign_up"),
        login_form = document.querySelector(".login"),
        continueBtnForSignup = signup_form.querySelector(".sign_up button"),
        errorTextForSignup = signup_form.querySelector(".sign_up .error-text"),
        continueBtnForLogin = login_form.querySelector(".login button"),
        errorTextForLogin = login_form.querySelector(".login .error-text"),
        login_container_wrapper = document.querySelector(".login-container .wrapper"),
        login_container = document.querySelector(".login-container"),
        svg_text = document.querySelector(".sign_up-container svg text"),
        svg_text1 = document.querySelector(".login-container svg text"),
        sign_up_container_wrapper = document.querySelector(".sign_up-container .wrapper");

      btn_login.onclick = function() {
            login_container.style.zIndex = '4'; 
            sign_up_container_wrapper.style.opacity ='0';
            login_container_wrapper.style.opacity ='1'; 
            svg_text1.style.animation='stroke 2s alternate'; 
            login_form.style.animation='moveRight 1.2s forwards'; 
            signup_form.style.animation='hide_right 5.2s forwards';   
      };

      btn_sign_up.onclick = function() {
            login_container.style.zIndex = '1';
            sign_up_container_wrapper.style.opacity ='1';
            login_container_wrapper.style.opacity ='0';
            svg_text.style.animation='stroke 2s alternate'; 
            signup_form.style.animation='moveleft 1.2s forwards'; 
            login_form.style.animation='hide_left 5.2s forwards';   
      }; 
      login_form.onsubmit = (e)=>{
          e.preventDefault();
      }
      
      continueBtnForLogin.onclick = ()=>{
          let xhr = new XMLHttpRequest();
          xhr.open("POST", "php/login.php", true);
          xhr.onload = ()=>{
            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status === 200){
                    let data = xhr.response;
                    if(data === "success"){
                      location.href="index";
                    }else{
                      errorTextForLogin.style.display = "block";
                      errorTextForLogin.textContent = data;
                    }
                }
            }
          }
          let formData = new FormData(login_form);
          xhr.send(formData);
      }

      signup_form.onsubmit = (e)=>{
    e.preventDefault();
}

continueBtnForSignup.onclick = ()=>{
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/signup.php", true);
    xhr.onload = ()=>{
      if(xhr.readyState === XMLHttpRequest.DONE){
          if(xhr.status === 200){
              let data = xhr.response;
              if(data === "success"){
                location.href="index";
              }else{
                errorTextForSignup.style.display = "block";
                errorTextForSignup.textContent = data;
                
              }
          }
      }
    }
    let formData = new FormData(signup_form);
    xhr.send(formData);
}