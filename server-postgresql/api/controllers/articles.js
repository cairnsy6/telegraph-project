const express = require('express');
const router = express.Router();

const Article = require('../models/article')

router.get('/', async (req, res) => {
    try {
        const articles = await Article.all
        res.json({articles})
    } catch(err) {
        res.status(500).json({err})
    }
})

router.get('/:url_id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.url_id)
        res.json(article)
    } catch(err) {
        res.status(404).json({err})
    }
})

router.post('/', async (req, res) => {
    try {
        const article = await Article.create(req.body);
        res.json(article);
    } catch(err) {
        res.status(404).json({err})
    }
})




module.exports = router;
