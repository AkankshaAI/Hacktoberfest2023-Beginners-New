const text = document.querySelector("#text");
const author = document.querySelector("#author");
const newQuote = document.querySelector("#new-quote");
const body = document.querySelector("body");
const twitterIcon = document.querySelector("#tweet-quote");

const tumblurIcon = document.querySelector("#tumblur");

let url = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"



const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
  ];
async function getQuote(url){
    
    try {
        let response =  await fetch(url);
        let data = await response.json();
        let quotesArray = data.quotes;
        let randomQuoteIndex = Math.floor(Math.random()*quotesArray.length);

        return data.quotes[randomQuoteIndex];
        
    } catch (error) {
        throw new Error("Getting error while fetching quotes");
    }
}


 getQuote(url).then((quotes)=>{
    setSharingUrl(quotes)
    const quote = quotes.quote;
    const authorName = quotes.author

    text.innerHTML = "\" "+quote+" \"";
    author.innerHTML = "Author: "+authorName;

    console.log(quotes)
}).catch((error)=>{
    console.error("Error :",error)
})




function getRandomQuote(){
    getQuote(url).then((quotes)=>{
        setSharingUrl(quotes)

        const quote = quotes.quote;
        const authorName = quotes.author
        text.textContent = "\" "+quote+" \"";
        author.textContent = "Author: "+authorName;
       genrateRandomColor();
        console.log(quotes)
    }).catch((error)=>{
        console.error("Error :",error)
    })
    
}


newQuote.addEventListener('click',getRandomQuote)


function genrateRandomColor(){
    let randomColorIndex = Math.floor(Math.random()*colors.length);

    let color = colors[randomColorIndex];
   body.style.backgroundColor = color;
   text.style.color = color;
   author.style.color = color;
   twitterIcon.style.backgroundColor = color;
   tumblurIcon.style.backgroundColor = color;
   newQuote.style.backgroundColor  = color
}

genrateRandomColor();

function setSharingUrl(quotes){
    let currentQuote = quotes.quote;
    let currentAuthor = quotes.author;

    twitterIcon.setAttribute("href",'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
    encodeURIComponent('"' + currentQuote + '" ' + currentAuthor))
   
    tumblurIcon.setAttribute("href",'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
    encodeURIComponent(currentAuthor) +
    '&content=' +
    encodeURIComponent(currentQuote) +
    '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button')
   }
   