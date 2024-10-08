const players=document.querySelectorAll(".choose_player button"),
      buttons=document.querySelectorAll(".continer button"), 
      start_up_menu=document.querySelector(".start_up_menu"),
      continer=document.querySelector(".continer");
       
        let array = {}; 
        let player_=null; 
        let winner=null; 
players.forEach(function(player) {
            player.onclick=function(){
                player_=player.value;
                start_up_menu.style.display = 'none';
                continer.style.display = 'grid'; 
            }
        });

        function empty(value) {
            return !array.hasOwnProperty(value);
        }
buttons.forEach(function(button) {
    button.onclick = function() {
        let value = button.value;
        if (empty(value)) {
            if (player_ == 1) { 
                array[value] = 'X';
                button.innerHTML =array[value];
                button.style.color = 'lightgreen';
                player_ = 2; 
            } else {  
                array[value] = 'O';
                button.innerHTML = array[value];
                button.style.color = 'red';
                player_ = 1; 
            }
        }
            if(array[0]==array[1] && array[1]==array[2] && (array[2]=='X' || array[2]=='O') ){
                winner=array[0];  
            }else if(array[3]==array[4] && array[4]==array[5]  && (array[5]=='X' || array[5]=='O')){
                winner=array[3]; 
            }else if(array[6]===array[7] && array[7]===array[8]  && (array[8]==='X' || array[8]==='O')){
                winner=array[6]; 
            }else if(array[0]==array[3] && array[3]==array[6]  && (array[6]=='X' || array[6]=='O')){
                winner=array[0]; 
            }else if(array[1]==array[4] && array[4]==array[7]  && (array[7]=='X' || array[7]=='O')){
                winner=array[1]; 
            }else if(array[2]==array[5] && array[5]==array[8]  && (array[8]=='X' || array[8]=='O')){
                winner=array[2]; 
            }else if(array[0]==array[4] && array[4]==array[8]  && (array[8]=='X' || array[8]=='O')){
                winner=array[0]; 
            }else if(array[2]==array[4] && array[4]==array[6]  && (array[6]=='X' || array[6]=='O')){
                winner=array[2]; 
            }else{  

                let propertyCount = Object.keys(array).length;
                if(propertyCount==9){
                    winner = "Draw!";
                }   
            }
             
            if(winner=='X' || winner=='O'){
                document.getElementById('result').style.color = 'green';
                document.getElementById('result').innerHTML = "winner "+winner;
               
                for (let key in array) {
                    if (array.hasOwnProperty(key)) {
                        array[key] = null;
                    }
                }
                for (let key in array) {
                    if (array.hasOwnProperty(key)) {
                        delete array[key];
                    }
                } 
                function restart(){
                    buttons.forEach(function(button) { 
                        button.innerHTML = ''; 
                       }); 
                       winner=null;
                       if(winner==null){
                        document.getElementById('result').innerHTML ="";
                        start_up_menu.style.display = 'grid';
                        continer.style.display = 'none'; 
                        player_=null; 
                        clearInterval(_interval);
                       }
                }
                
                let _interval=setInterval(restart,3000);
                
            }else if(winner!=null){
                document.getElementById('result').innerHTML = winner;
                document.getElementById('result').style.color = 'orange';
            
                for (let key in array) {
                    if (array.hasOwnProperty(key)) {
                        array[key] = null;
                    }
                }
                for (let key in array) {
                    if (array.hasOwnProperty(key)) {
                        delete array[key];
                    }
                } 
                
                function restart(){
                    buttons.forEach(function(button) { 
                        button.innerHTML = ''; 
                       }); 
                       winner=null;
                       if(winner==null){
                        document.getElementById('result').innerHTML ="";
                        start_up_menu.style.display = 'grid';
                        continer.style.display = 'none'; 
                        player_=null; 
                        clearInterval(_interval);
                       }
                }
                
                let _interval=setInterval(restart,3000);
                
            
            }
            document.getElementById('result').style.animation='customAni 2s ease 0s infinite normal none';   
        }
    });