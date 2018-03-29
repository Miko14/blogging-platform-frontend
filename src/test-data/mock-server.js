const express = require('express');

const data = require('./fakes');
const swagger = require('./swagger.json');
const cors = require('cors');
const bodyParser = require('body-parser');

let app = express();

app.use(cors());
app.use(bodyParser.json());

function findPost(posts, id) {
    return id && posts.find(post => post.id === Number.parseInt(id));
}

app.get('/', (req, res) => res.json(swagger));
app.get('/post', (req, res) => res.json(data.fakePosts));
app.get('/post/:id', (req, res) => res.json(findPost(data.fakePosts, req.params.id)));
app.get('/post/', (req, res) => res.json(data.fakePosts));
app.post('/post', (req, res) => res.json({status: 'OK', body: JSON.stringify(req.body)}));
app.get('/author', (req, res) => res.json(data.authors));
app.get('/category', (req, res) => res.json(data.categories));
app.get('/comment', (req, res) => res.json(data.comments));

app.listen(8080);
console.info('Listening on port 8080');