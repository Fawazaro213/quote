const quoteContainer = document.getElementById("quote-container");
const quoteText= document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const facebookBtn = document.getElementById("facebook");
const whatsappBtn = document.getElementById("whatsapp");
const instagramBtn = document.getElementById("instagram");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");


// import { localQuotes } from "./quotes";
let apiQuotes = [];
loader.hidden = true;

// Show Loading 
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
    }
}

// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const res = await fetch(apiUrl);
        apiQuotes = await res.json();
        // Pick a random quote from apiQuotes array
        const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
        // Check if Author field is blank and replace it with 'Unknown'
        if (!quote.author) {
            authorText.textContent = 'Unknown'
        } else {
            authorText.textContent = quote.author;
        }

        // Check quote length to determine styling
        if (quote.text.length > 120) {
            quoteText.classList.add('long-quote')
        } else { 
            quoteText.classList.remove('long-quote')
        }
        // Set Quote, Hide Loader
        quoteText.textContent = quote.text;
        complete()
            // newQuote();
            console.log(apiQuotes)
        } catch (error) {
            getQuotes()
            // Catch Error Here
        }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank');
}

function statusQuote() {
    const whatsappUrl = `whatsapp://send?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(whatsappUrl, '_blank');
}

// const link = document.getElementsById("link")[0].setAttribute("href", `whatsapp://send?text=${quoteText.textContent} - ${authorText.textContent}`);

// Event listeners
twitterBtn.addEventListener('click', tweetQuote);
whatsappBtn.addEventListener('click', statusQuote);
newQuoteBtn.addEventListener('click', getQuotes);

// On Load
// getQuotes();
// newQuote();
// loading();
