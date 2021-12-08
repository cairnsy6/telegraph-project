const e = require("express");

window.onpopstate = checkState;
const serverUrl = `http://localhost:3000/articles`;
const path = window.location.href.slice(31);
console.log(path);

const url = new URL(window.location);
url.searchParams.set('')

// init html elements as js objects
const form = document.querySelector('form');
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const descriptionInput = document.querySelector('#description-input');
// const submitBtn = document.querySelector('#submit-btn');

initListeners();

function initListeners() {
    form.addEventListener("submit", upload)
}

function getDate() {
    const date = new Date();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    return `${day}-${month}`;
}

function getPath() {
    const randNum = Math.floor((Math.random() * 100) +1);
    return `${titleInput.value}-${getDate()}-${randNum}`;
}

function checkState() {
    // page reload
    if (e.state) {
        console.log(e.state.path);
    }
}

/**
 * Uploads the article to the server.
 * 
 */
async function upload(e) {
    e.preventDefault();
    const path = getPath();
    const date = getDate();

    const data = {
        path: path,
        title: titleInput.value,
        name: authorInput.value,
        archive_date: date,
        description: descriptionInput.value
    }

    console.log(data);
    console.log(JSON.stringify(data));

    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    window.history.pushState({
        articlePath: path
    }, document.title, path)
    try {
        await fetch(serverUrl, options);
    } catch (err) {
        console.log(err);
    }
}

