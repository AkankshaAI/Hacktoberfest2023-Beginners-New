let screen= document.getElementById('screen');
buttons = document.querySelectorAll('button');
for(item of buttons){
    item.addEventListener('click' (e){
        buttonText = e.target.innnerText;
    })
}