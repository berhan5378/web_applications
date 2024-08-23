const searchBar = document.querySelector(".search input"),
chatBox = document.querySelector(".chat-box"),
usersList = document.querySelector(".users-list"),
img_btn = document.querySelector(".users .content img"),
upload_container = document.querySelector(".upload-container"),
img_upload_form = document.querySelector(".upload-container form"),
imageInput = img_upload_form.querySelector("#file-upload"),
upload_btn = img_upload_form.querySelector(".upload-btn");

img_btn.onclick = ()=>{
  upload_container.style.display="block";
}
img_upload_form.onsubmit = (e)=>{
  e.preventDefault();
}
  
imageInput.addEventListener('change', function() {
    
    if (this.files && this.files.length > 0) { 
        const imageName = this.files[0].name;
        document.querySelector(".img_name").innerHTML=imageName;
        
    }
}); 
upload_btn.onclick = ()=>{ 
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "php/img_upload.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState === XMLHttpRequest.DONE){
        if(xhr.status === 200){
          let data = xhr.response;
          upload_container.style.display="none";
         alert(data);
            
        }
    }
  }
  let formData = new FormData(img_upload_form);
  xhr.send(formData);
}


let interval=null;
searchBar.onkeyup = ()=>{
  interval='notnull';
  let searchTerm = searchBar.value;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "php/search.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState === XMLHttpRequest.DONE){
        if(xhr.status === 200){
          let data = xhr.response;
          usersList.innerHTML = data;
        }
    }
  }
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("searchTerm=" + searchTerm);
}
 
let value= null;
setInterval(() => {
  $.ajax({
      url: "php/users.php",  
      method: 'GET', 
      dataType: 'html',  
      success: function(data) {
        if(interval==null){
          $(usersList).html(data); 

        } 
            const  buttons = document.querySelectorAll("#ok");
            buttons.forEach(function(button) {
              $(button).click(function() {
                value = $(button).val();  
                 const form = document.querySelector(".typing-area"),
                 incoming_id = form.querySelector(".incoming_id"),
                 inputField = form.querySelector(".input-field"),
                 sendBtn = form.querySelector(".typing-area button"),
                 users =document.querySelector(".users"),
                 chat =document.querySelector(".chat");
                 incoming_id.value=value;
                 users.style.animation='hide .5s ease 0s infinite normal none'; 
                 
                 chat.style.display='block';
                 chat.style.animation='trans .5s ease 0s normal none'; 
                  
                 form.onsubmit = (e)=>{
                  e.preventDefault();
                }
                inputField.focus();
                inputField.onkeyup = ()=>{
                    if(inputField.value != ""){
                        sendBtn.classList.add("active");
                    }else{
                        sendBtn.classList.remove("active");
                    }
                }
                sendBtn.onclick = ()=>{
                  
                    let xhr = new XMLHttpRequest();
                    xhr.open("POST", "php/insert-chat.php", true);
                    xhr.onload = ()=>{
                      if(xhr.readyState === XMLHttpRequest.DONE){
                          if(xhr.status === 200){
                              inputField.value = "";
                              scrollToBottom();
                              
                          }
                      }
                    }
                    let formData = new FormData(form);
                    xhr.send(formData);
                }

                loadFile('php/get-chat.php',value); 
              });
            });
            if(value!=null){
              loadFile('php/get-chat.php',value);
            }
    
      },
      error: function(xhr, status, error) {
          console.error("Error loading file:", status, error);  
      }
  });
}, 1000);  
 
  
 function loadFile(fileName, value) {

    $.ajax({
      url: fileName,  
      method: 'GET',  
      data: { value: value },
      dataType: 'html',  
      success: function(datas) { 
          $('.chat-box').html(datas);  
      },
      error: function(xhr, status, error) {
          console.error("Error loading file:", status, error); 
      }
  });


  $.ajax({
    url: 'php/user_details.php', 
    method: 'GET',  
    data: { value1: value },
    dataType: 'html',  
    success: function(data) {
      $('.chat header').html(data);  

      const back =document.querySelector(".bx-arrow-back"),
      trash =document.querySelector(".bxs-trash"),
      users =document.querySelector(".users"),
      chat =document.querySelector(".chat");
      
      back.onclick = ()=>{
        users.style.animation='none'; 
        chat.style.animation='hide .5s ease 0s infinite normal none';  
       }
       trash.onclick = ()=>{
        $.ajax({
          url: 'php/delete_msg.php', 
          method: 'GET',   
          data: { value: value },
          dataType: 'html',  
          success: function(datas) { 
            alert(datas); 
          },
          error: function(xhr, status, error) {
              console.error("Error loading file:", status, error);  
          }
      });
         
       }

    },
    error: function(xhr, status, error) {
        console.error("Error loading file:", status, error);  
    }
});
}
 
function scrollToBottom(){
  chatBox.scrollTop = chatBox.scrollHeight;
}
 

