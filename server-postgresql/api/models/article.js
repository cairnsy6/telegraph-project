const db = require ('../dbConfig');

class Article {
    constructor(data){
        this.id = data.id;
        this.url_id = {path:`articles/${data.url_id}`};
        this.title = data.title;
        this.name = data.name;
        this.archive_date = data.archive_date;
        this.description = data.description;
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const articlesData = await db.query(`SELECT * FROM articles;`)
                console.log(articlesData);
                const articles = articlesData.rows.map(a => new Article(a))
                resolve(articles);
            } catch (err) {
                reject("Error retrieving Articles")
            }
        });
    }

    static findByURL_ID (url_id) {
        return new Promise (async (resolve, reject) => {
            try {
                let articleData = await db.query(`SELECT * FROM articles WHERE url_id = $1;`, [ id ]);
                let article = new Article(articleData.rows[0]);
                resolve (article);
            } catch (err) {
                reject('Article not found');
            }
        });
    } 

    static create(data){
        return new Promise (async (resolve, reject) => {
            try {
                let articleData = await db.query(`INSERT INTO articles (url_id, title, name, archive_date, description) VALUES ($1, $2, $3, $4, $5) RETURNING *;`, [ data.url_id, data.title, data.name, data.archive_date, data.description ]);
                let newArticle = new Article(articleData.rows[0]);
                resolve (newArticle);
            } catch (err) {
                reject('Error creating Article');
            }
        });
    }
}

module.exports = Article;