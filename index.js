const express = require('express');
const path = require('path');
const cookiParser = require('cookie-parser');

let cron = require('node-cron');
const { sendMail } = require('./mail.js');
require('dotenv').config();

let canSendAMail = false;

if (!process.env.login_key) throw new Error('No *login_key*, may be .env is missing ?')

const app = express();
const port = process.env.port || 3000;

// Can send a mail every hour
cron.schedule('0 */1 * * *', () => {
    canSendAMail = true;
});

app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(cookiParser());

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/write-ups', (req, res) => {
    res.render('write-ups/index');
});

app.get('/admin', (req, res) => {
    if(req.cookies.connected == "true") {
        res.render('admin/index');
    } else {
        res.redirect('/admin/login');
    }
});

app.post('/admin/login', (req, res) => {
    if(req.body.key == process.env.login_key) {
        res.cookie('connected', 'true', {maxAge: 1000*60*60*24}).redirect('/admin');
    } else {
        res.render('admin/login', {error: "key"});
    }
});

app.get('/admin/login', (req, res) => {
    if(req.cookies.connected == "true") {
        res.redirect('/admin');
    } else if(req.query.origin) {
        res.render('admin/login', {error: req.query.origin})
    } else {
        res.render('admin/login');
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie("connected");
    res.redirect('/home');
});

app.get('/send-mail', (req, res) => {
    if(canSendAMail) { 
        sendMail(process.env.mail, "Clé de connexion oubliée", "Tiens, la prochaine fois mémorise la par contre : " + process.env.login_key).then((e) => {
            res.redirect("/admin/login?origin=mail");
        });
        canSendAMail = false;
    } else {
        res.redirect("admin/login?origin=nomail")
    }
});

app.use((req, res) => {
    res.status(404).render('404', {page: req.url.length > 18 ? req.url.substring(0, 10)+"[...]"+req.url.substring(req.url.length -3) : req.url});
});

app.listen(port, () => {
    console.log("App running on http://localhost:" + port);
});