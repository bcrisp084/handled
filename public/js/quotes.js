const apiKey = "52e588af39mshe9a5dded89cbdb2p1b926ejsn5f5cb8841a8f";

function getQuote() {
  fetch(
    `https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?rapidapi-key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      $("#quote").text(data.text);
      $("#author").text(data.author);
      $("#category").text(data.category);
    });
}
// getQuote();

function getRandomQuote() {
  fetch(
    `https://famous-quotes4.p.rapidapi.com/random?category=all&count=2&rapidapi-key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      $("#random-quote").text(data[0].text);
      $("#random-author").text(data[0].author);
      $("#random-category").text(data[0].category);
    });
}

// $("#random-quote-btn").on("click", getRandomQuote);
