const db = require ('../dbConfig/init');

class Article {
    constructor(data){
        this.id = data.id
        this.title = data.title
        this.name = data.name
        this.description = data.description
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const articlesData = await db.query(`SELECT * FROM articles;`)
                const articles = articlesData.rows.map(a => new Article(a))
                resolve(articles);
            } catch (err) {
                reject("Error retrieving Articles")
            }
        });
    }

    static findById (id) {
        return new Promise (async (resolve, reject) => {
            try {
                let articleData = await db.query(`SELECT * FROM articles WHERE id = $1;`, [ id ]);
                let article = new Article(articleData.rows[0]);
                resolve (article);
            } catch (err) {
                reject('Article not found');
            }
        });
    } 

    static create(title, name, description){
        return new Promise (async (resolve, reject) => {
            try {
                let articleData = await db.query(`INSERT INTO articles (title, name, description) VALUES ($1, $2, $3) RETURNING *;`, [ title, name, description]);
                let newArticle = new Article(articleData.rows[0]);
                resolve (newArticle);
            } catch (err) {
                reject('Error creating Article');
            }
        });
    }
}

module.exports = Article;