// Create web server 
// 1. Import express module
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// 2. Create web server
// 3. Set port
// 4. Start web server
app.listen(3000, () => console.log('Web server running on port 3000'));

// 5. Set up the route
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/comments', (req, res) => {
    res.send(comments);
});

app.get('/api/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) res.status(404).send('The comment with the given ID was not found');
    res.send(comment);
});

app.post('/api/comments', (req, res) => {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const comment = {
        id: comments.length + 1,
        name: req.body.name,
        comment: req.body.comment
    };
    comments.push(comment);
    res.send(comment);
});

app.put('/api/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('The comment with the given ID was not found');

    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    comment.name = req.body.name;
    comment.comment = req.body.comment;
    res.send(comment);
});

app.delete('/api/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('The comment with the given ID was not found');

    const index = comments.indexOf(comment);
    comments.splice(index, 1);

    res.send(comment);
});

function validateComment(comment) {
    const schema = {
        name: Joi.string().min(3).required(),
        comment: Joi.string().min(3).required()
    };
    return Joi.validate(comment, schema);
}

// 6. Set up the data
const comments = [];
