
let score = JSON.parse(localStorage.getItem('score'))||{ 
    Wins:0,
    Loses:0,
    Ties:0
   };
// if(!score){
//    score={ 
//     Wins:0,
//     Loses:0,
//     Ties:0
//    };
// }

updateScore();

document.body.addEventListener('keydown',(event)=>{
    if(event.key === 'r'){
        playerMove('Rock');
    }else if(event.key === 'p'){
        playerMove('Paper');
    }else if(event.key ==='s'){
        playerMove('Scissors');
    }else if(event.key==='a'){
        autoPlay();
    }else if(event.key==='Backspace'){
        showRestConfirmation();
    }
  });

document.querySelector('.js-rock-button').addEventListener('click',() => {
    playerMove('Rock');
  });
  document.querySelector('.js-paper-button').addEventListener('click',() => {
    playerMove('Paper');
  });
  document.querySelector('.js-scissors-button').addEventListener('click',() => {
    playerMove('Scissors');
  });

  document.querySelector('.js-autoplay-button').addEventListener('click',()=>{ autoPlay();});

  document.querySelector('.js-reset-button').addEventListener('click',() => {

    showRestConfirmation();
  });
  
function resetScore(){
    score.Wins=0;
    score.Loses=0;
    score.Ties=0;
    localStorage.removeItem('score');
    updateScore();
};

function hideConfi(){
    document.querySelector('.js-confirmation-msg').innerHTML='';
}

function showRestConfirmation(){
    document.querySelector('.js-confirmation-msg').innerHTML=`
    <p>Are you sure u want to reset?</p>
    <button class="js-yes-button yes-button" ">Yes</button>
    <button class="js-no-button no-button">No</button>`;

    document.querySelector('.js-yes-button').addEventListener('click',()=>{
        resetScore();
        hideConfi();
      });
      document.querySelector('.js-no-button').addEventListener('click',()=>{
        
        hideConfi();
      });
    
}
  
 

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
    if(!isAutoPlaying){
        intervalId= setInterval(function(){
            const pMove= pickCompMove();
            playerMove(pMove);
        },1000);
        isAutoPlaying=true;
    }else{
        clearInterval(intervalId);
        isAutoPlaying=false;
    }

    let a =document.querySelector('.js-autoplay-button');
    if(a.innerHTML==='AutoPlay'){
        a.innerHTML='Stop Playing';
    }else{
        a.innerHTML='AutoPlay';
    }
    updateScore();
}

function playerMove(pMove){

    const comp= pickCompMove();
    let result ='';
    if(pMove === 'Rock'){
        
        if(comp === 'Rock'){
            result='Tie.';
        }
        else if(comp === 'Paper'){
            result='You lose.';
        }
        else if(comp === 'Scissors'){
            result='You win.';
        }
    }
    else if(pMove === 'Paper'){
        
        if(comp === 'Paper'){
            result='Tie.';
        }
        else if(comp === 'Scissors'){
            result='You lose.';
        }
        else if(comp === 'Rock'){
            result='You win.';
        }  
    }
    else if(pMove === 'Scissors'){
        
        if(comp === 'Rock'){
            result='You lose.';
        }
        else if(comp === 'Paper'){
            result='You Win.';
        }
        else if(comp === 'Scissors'){
            result='Tie.';
        }
    }
    if(result==='You Win.'){
        score.Wins+=1;
    }else if(result==='You lose.'){
        score.Loses+=1;
    }else if(result==='Tie.'){
        score.Ties+=1;
    }

    localStorage.setItem('score',JSON.stringify(score));
    
  
    updateScore();

    document.querySelector('.js-result')
    .innerHTML=`${result}`;

    document.querySelector('.js-moves')
    .innerHTML=`You <img src="${pMove}-emoji.png" class="move-icon"> <img src="${comp}-emoji.png" class="move-icon"> Computer`;

    
}


function updateScore(){
    document.querySelector('.js-score')
    .innerHTML=`Wins:${score.Wins},Loses:${score.Loses},Ties:${score.Ties}`;
}



function pickCompMove(){
    const r=Math.random();
    let comp ='';
    if(r>=0 && r<1/3){
        comp='Rock';
    }
    else if(r>=1/3 && r<2/3){
        comp='Paper';
    }
    else if(r>=2/3 && r<1){
        comp='Scissors';
    }
    return comp;
}