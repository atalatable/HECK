const express = require('express');
const path = require('path');
const { sendMail } = require('./mail.js');
let cron = require('node-cron');
require('dotenv').config();

let canSendAMail = true;

const app = express();
const port = process.env.port || 3000;

cron.schedule('0 */1 * * *', () => {
    console.log("CRONTAB - Reinitalizate canSendMail variable")
    canSendAMail = true;
});

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

app.get('/send-mail', (req, res) => {
    if(canSendAMail) { 
        sendMail(process.env.mail, "Clé de connexion oubliée", "Tiens, la prochaine fois mémorise la par contre : "+process.env.login_key);
        canSendAMail = false;
        res.send("Succefully sent mail !");
    } else {
        res.send("You already requested a mail, wait before trying again !")
    }
});

app.use((req, res) => {
    res.status(404).render('404', {page: req.url.length > 18 ? req.url.substring(0, 10)+"[...]"+req.url.substring(req.url.length -3) : req.url});
});

app.listen(port, () => {
    console.log("App running on http://localhost:" + port);
});