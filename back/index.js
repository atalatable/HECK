const express = require('express');
const path = require('path');
const { allowedNodeEnvironmentFlags } = require('process');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.render("index");
});

app.get('/write-ups', (req, res) => {
    res.render('write-ups/index');
});

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(port, () => {
    console.log("App running on http://localhost:" + port);
});