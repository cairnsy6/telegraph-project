const url = `http://localhost:3000/articles`;
const path = localStorage.getItem('path');

// init html elements as js objects
// const form = document.querySelector('form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const description = document.querySelector('#description');
const authorDateDiv = document.querySelector('#a-d-div')
authorDateDiv.classList.add('a-d-div');

getArticle();

async function getArticle() {
    console.log("Getting article");
    const response = await fetch(`${url}/${path}`);
    const data = await response.json();

    const date = document.createElement("p");
    title.value = data.title;
    author.value = data.author
    date.value = `⚫️ ${data.date}`;
    description.value = data.description;
    authorDateDiv.append(date);
}