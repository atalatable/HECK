const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/write-ups', (req, res) => {
    res.render('write-ups/index');
});

app.use((req, res) => {
    res.status(404).render('404', {page: req.url.length > 15 ? req.url.substring(0, 10)+"[...]"+req.url.substring(req.url.length -3) : req.url});
});

app.listen(port, () => {
    console.log("App running on http://localhost:" + port);
});