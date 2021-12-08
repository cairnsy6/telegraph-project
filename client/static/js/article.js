const url = `http://localhost:3000/articles`;
const url_id = localStorage.getItem('url_id');

// init html elements as js objects
// const form = document.querySelector('form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const description = document.querySelector('#description');
const authorDateDiv = document.querySelector('#a-d-div')
authorDateDiv.classList('a-d-div');

function getArticle() {
    console.log()
    const response = await fetch(`${url}/${url_id}`);
    const data = await response.json();

    const date = document.createElement("p");
    title.textContent = data.title;
    author.textContent = data.author
    date.textContent = `⚫️ ${data.date}`;
    description.textContent = data.description;
    authorDateDiv.append(date);
}