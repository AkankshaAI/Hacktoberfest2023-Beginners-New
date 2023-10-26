const choice = document.querySelectorAll('button')
choice.forEach(choice => choice.addEventListener('click',result));

function result(id){
    const ai = Math.floor(Math.random()*3)
    console.log(id.target)
    const player =Number(id.target.id)
    const arr = ['Rock','Paper','Scissor']
    document.getElementById("your-answer").innerText = "YOU : "+arr[player]
    document.getElementById("ai-answer").innerText = "AI : "+arr[ai]
    console.log(ai,player)
    if(ai == player)
    document.getElementById("Result").innerText = "DRAW"
    if(ai ==0 && player ==1)
    document.getElementById("Result").innerText = "YOU WON!"
    else if(ai ==0 && player ==2)
    document.getElementById("Result").innerText = "YOU LOST!"
    if(ai ==1 && player ==2)
    document.getElementById("Result").innerText = "YOU WON!"
    else if(ai ==1 && player ==0)
    document.getElementById("Result").innerText = "YOU LOST!"
    if(ai ==2 && player ==0)
    document.getElementById("Result").innerText = "YOU WON!"
    else if(ai ==2 && player ==1)
    document.getElementById("Result").innerText = "YOU LOST!"
}