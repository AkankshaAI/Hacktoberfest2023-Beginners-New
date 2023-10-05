
let mousedata = document.querySelector("#center")

const throttleFunction=(func, delay)=>{
 
  let prev = 0;
  return (...args) => {
    let now = new Date().getTime();
    if(now - prev> delay){
      prev = now;
      return func(...args); 
    }
  }
}

mousedata.addEventListener("mousemove", throttleFunction((dets)=>{
 
let div = document.createElement("div")
div.classList.add('images')
div.style.left = dets.x + "px"
div.style.top = dets.y + "px"

let img = document.createElement("img")
img.setAttribute("src","https://i.pinimg.com/236x/0d/3e/34/0d3e34fd34f7cef1bf71f4b90e9afb75.jpg")
div.appendChild(img)

document.body.appendChild(div)

gsap.to(img, {
    y:"0",
    ease:Power1,
    duration:.6

})
gsap.to(img, {
    y: "100%",
    delay:.6,
    ease:Power2
})

setTimeout(() => {
    div.remove()
}, 2000);

},400));

