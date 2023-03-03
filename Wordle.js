let gameBo = document.getElementById("gameBoard");
      let keyb = document.getElementById("keyboard");
      let indexx = 0;
      let boundaries = 5;
      let wordsList = ["STROM", "RACEK", "BATOH"];
      let guessStr;
      let userStr = "";
      let btn;
      let gameIsOver = false;
      
      function setUp()
      {
         guessStr = wordsList[Math.floor(Math.random()* wordsList.length)];
         gameBo.innerHTML = "";
         keyb.innerHTML = "";
         indexx = 0;
         boundaries = 5;
         userStr = "";
                
        for(let i = 1; i < 27; i++)
        {
          btn = document.createElement("input");
          btn.setAttribute("type", "button");
          btn.setAttribute("value", String.fromCharCode(65+i-1));
          btn.setAttribute("id", String.fromCharCode(65+i-1));
          btn.setAttribute("onclick", "add(this)");
          keyb.appendChild(btn);
        
          keyb.innerHTML+="&nbsp;";
        
          if(i%6 == 0) 
          {
            keyb.appendChild(document.createElement("br"));
            keyb.appendChild(document.createElement("br"));
        
          }
      
        }
      
        for(let i = 1; i < 5*5+1; i++)
        {
          let di = document.createElement("div");
          di.setAttribute("id", i-1);
          di.setAttribute("class", "gamePiece");
          gameBo.appendChild(di);
        
          gameBo.innerHTML+="&nbsp;";
        
          if(i%5 == 0) 
          {
            gameBo.appendChild(document.createElement("br"));
            gameBo.appendChild(document.createElement("br"));
          }
      
        }
      
        btn = document.createElement("input");
        btn.setAttribute("type", "button");
        btn.setAttribute("value", "delete");
        btn.setAttribute("onclick", "del()");
        keyb.appendChild(btn);
        
        btn = document.createElement("input");
        btn.setAttribute("type", "button");
        btn.setAttribute("value", "validate");
        btn.setAttribute("onclick", "enter()");
        keyb.appendChild(btn);
      }
    
      setUp();
      
      function add(that)
      {
        if((indexx) <= (boundaries-1))
        {        
          document.getElementById(indexx).innerHTML = that.value;
          userStr+=that.value;
        
          indexx++;
        
        } 
     
      }
      
      function enter()
      {  
        if(indexx == boundaries)
        {
          validate();
          
          boundaries+=5;
          userStr = "";
          
          if(gameIsOver == false)
          {
            if(boundaries > 5*5)
            {
              alert(" You lost: word was: " + guessStr);
              gameIsOver = true;
              
              setTimeout(setUp, 2000);
            
            }
          
          } 
         
        } else {
        
          alert("You must type in five letters.");
          
        }
    
      }
      
      function del()
      {     
        if((indexx-1) >= (boundaries-5))
        {
          indexx--; 
          
          userStr = userStr.substr(0,indexx - boundaries + 5); 
          document.getElementById(indexx).innerHTML = "";
          
        }
            
      }
      
      function validate() 
      {   
        if(userStr == guessStr)
        {
          for(let i = 0; i < guessStr.length; i++)
          {
            document.getElementById(i+boundaries-5).style.background = "green";
            document.getElementById(guessStr[i]).style.background = "green";
        
          }
          
          gameIsOver = true;
          alert("You won.");
          
          setTimeout(setUp, 2000);
        
        } else {
        
          let strTogether = guessStr + " " + userStr;
          let a = strTogether.split(" ");
          let lettersObj = [];
        
          for(let i = 0; i < a.length; i++)
          {
            lettersObj.push({});
          
            for(let j = 0; j < a[i].length; j++)
            {
              if(!lettersObj[i][a[i][j]])
              {
                lettersObj[i][a[i][j]] = [];
                lettersObj[i][a[i][j]].push(j);
             
              } else {
             
                lettersObj[i][a[i][j]].push(j);
            
              }
          
            }         
          }
          
          
          for(let letter in lettersObj[1])
          {
            if(!lettersObj[0][letter])
            {
              document.getElementById(letter).style.background = " rgb(150, 150, 150)";
              
              for(let i = 0; i < lettersObj[1][letter].length; i++)
              {
                document.getElementById(boundaries - 5 + lettersObj[1][letter][i]).style.background = "rgb(150, 150, 150)";
              
              }
              
            } else {
             
              for(let i = 0; i < lettersObj[0][letter].length; i++)
              {
                for(let j = 0; j < lettersObj[1][letter].length; j++)
                {
                  if(lettersObj[0][letter][i] == lettersObj[1][letter][j])
                  {
                    document.getElementById(boundaries - 5 + lettersObj[1][letter][j]).style.background = "green";
                    lettersObj[0][letter].splice(i, 1);
                    lettersObj[1][letter].splice(j, 1);
                    i = -1;
                    j = -1;
                    
                    document.getElementById(letter).style.background = "green";
                           
                  }
              
                }
              
              }
              
              if(lettersObj[0][letter].length > 0)
              {
                document.getElementById(letter).style.background = "orange";
              
              }
               
              if(lettersObj[1][letter].length > 0) 
              {
                for(let k = 0; k < lettersObj[1][letter].length; k++)
                {
                  if(lettersObj[0][letter][k] != undefined)
                  {
                    document.getElementById(boundaries - 5 + lettersObj[1][letter][k]).style.background = "orange";
                    lettersObj[0][letter].splice(k, 1);
                  
                  } else {
                  
                    document.getElementById(boundaries - 5 + lettersObj[1][letter][k]).style.background = "rgb(150, 150, 150)"
                  
                  }
              
                }
              }
            }

          }            
        }
        
      }
