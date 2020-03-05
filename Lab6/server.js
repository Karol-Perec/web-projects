const express = require('express');
const request = require('request');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;
const apiUrl = `https://api.github.com/search/users?q=`;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', (req, res) => res.render('index', {data: "init", error: ""}));

app.get('/search', (req, res) => {
    const searchTerm = req.query.searchTerm;
    request({
            url: `${apiUrl}${searchTerm}`,
            headers: {'User-Agent': ''}
        },
        (error, response, body) => {
            if (error) {
                res.render('index', {data: "", error: "API ERROR"})
            } else {
                res.render('index', {data: JSON.parse(body), error: ""})
            }
        });
});

app.listen(port, () => console.log(`Listening on http://${hostname}:${port}`))
