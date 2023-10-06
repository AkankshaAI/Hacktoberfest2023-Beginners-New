const endDate="31 October 2023 11:59 PM"
document.getElementById("end-date").innerText = endDate;

const inputs=document.querySelectorAll("input")
function clock(){
    const end=new Date(endDate);
    const now=new Date()
    
    const diff=(end-now)/1000;
    if(diff<0) return;
    //convert into days
    inputs[0].value=Math.floor(diff/3600/24);
    inputs[1].value=Math.floor((diff/3600)%24);
    inputs[2].value=Math.floor((diff/60)%60);
    inputs[3].value=Math.floor(diff%60);
}
//initial call
clock()
setInterval(
    ()=>{
        clock();
    },
    1000
)
