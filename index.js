const express = require('express');
const path = require('path');
const cookiParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

let cron = require('node-cron');
require('dotenv').config();
const { sendMail } = require('./mail.js');
const { db } = require('./database.js');

const { apiRoute } = require('./routes/api');
const { adminRoute } = require('./routes/admin');

let canSendAMail = false;

if (!process.env.login_key) throw new Error('No *login_key*, may be .env is missing ?');

const app = express();
const port = process.env.port || 3000;

app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(cookiParser());
app.use(fileUpload());

// Can send a mail every hour
cron.schedule('0 */1 * * *', () => {
    canSendAMail = false;
});

// Routing
app.use('/api', apiRoute);
app.use('/admin', adminRoute);


app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/write-ups', (req, res) => {
    res.render('write-ups/index');
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