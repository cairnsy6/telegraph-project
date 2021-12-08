const url = `http://localhost:3000/articles`;

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

function getUrlId() {
    const randNum = Math.floor((Math.random() * 100) +1);
    return `${titleInput.value}-${getDate()}-${randNum}`;
}

/**
 * Uploads the article to the server.
 * 
 */
async function upload(e) {
    e.preventDefault();
    const url_id = getUrlId();
    const date = getDate();

    const data = {
        url_id: url_id,
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
        header: {
            "Content-Type": "application/json"
        }
    }

    try {
        await fetch(`${url}`, options);
    } catch (err) {
        console.log(err);
    }
    // localStorage.setItem('url_id', url_id);
    // location.href = "article.html";
}

