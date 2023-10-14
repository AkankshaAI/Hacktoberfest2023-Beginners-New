const quotes = [
    {
        quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela"
    },
    {
        quote: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney"
    },
    {
        quote: "Life is what happens when you're busy making other plans.",
        author: "John Lennon"
    },
    {
        quote: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        quote: "Get busy living or get busy dying.",
        author: "Stephen King"
    }
];

const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote-btn");

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function displayNewQuote() {
    const { quote, author } = getRandomQuote();
    quoteText.textContent = `"${quote}"`;
    quoteAuthor.textContent = `Author: ${author}`;
}

newQuoteBtn.addEventListener("click", displayNewQuote);

displayNewQuote();






