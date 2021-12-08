const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const server = express();
server.use(cors());
server.use(express.json());
server.use(bodyParser.urlencoded({
    extended: true
  }));

const articlesRoute = require('./controllers/articles')

server.use('/articles', articlesRoute)


// Root route
server.get('/', (req, res) => res.send('Hello, world!'))

module.exports = server
