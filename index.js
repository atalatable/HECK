const express = require('express');
const path = require('path');
const cookiParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

let cron = require('node-cron');
require('dotenv').config();
const { sendMail } = require('./mail.js');
const { db } = require('./database.js');
const { query } = require('express');

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

function isConnected(req) {
    return req.cookies.connected == "true";
}

// NOT WORKING
app.get('/api/get/tagsfromwu', async (req,res) => {
    console.log(req.query.wu)
    const wuID = await queryAll(db, `SELECT id FROM write_ups WHERE name = "${req.query.wu}";`);
    console.log(wuID)
    const sqlquery = "SELECT "

    db.all(sqlquery, (err, rows) => {
        if(err) {
            res.status(400).json({"error":err.message});
            return
        } else {
            res.json({
                "data": rows
            });
        }
    });
});

app.get('/api/get/tags', (req, res) => {
    const sqlquery = "SELECT * FROM tags;"
    db.all(sqlquery, (err, rows) => {
        if(err) {
            res.status(400).json({"error":err.message});
            return
        } else {
            res.json({
                "data": rows
            })
        }
    });
});

app.get('/api/get/wus', (req, res) => {
    const sqlquery = "SELECT * FROM write_ups;"
    db.all(sqlquery, (err, rows) => {
        if(err) {
            res.status(400).json({"error":err.message});
            return
        } else {
            res.json({
                "data": rows
            })
        }
    });
});

app.get('/api/get/categories', (req, res) => {
    const sqlquery = "SELECT * FROM categories;"
    db.all(sqlquery, (err, rows) => {
        if(err) {
            res.status(400).json({"error":err.message});
            return
        } else {
            res.json({
                "data": rows
            })
        }
    });
});

// https://gist.github.com/dev-drprasad/8f46ddd8ffea7ba8f883e577d3ce0005
// file is a .zip
// saves .md in a separate root directory
// saves images under public/images/wuName/
function saveFile(file, name) {
    console.log(file)
}

app.post('/api/post/addtag', async (req, res) => {
    if(isConnected(req)) {
        if(req.body.tag && req.body.wu) {
            const tagid = await queryAll(db, `SELECT id FROM tags WHERE name = "${req.body.tag}";`);
            const wuID = await queryAll(db, `SELECT id FROM write_ups WHERE name = "${req.body.wu}";`);
            const sqlquery = "INSERT INTO tags_wu(tagid,wuid) VALUES(?,?);";

            db.run(sqlquery, [tagid[0].id, wuID[0].id], (err) => {
                if(err) {
                    res.status(400).json({"error": err.message});
                } else {
                    res.redirect('/admin/')
                }
            })
        } else {
            res.send('req.body not complete');
        }
    } else {
        res.redirect('/home');
    }
});

app.post('/api/post/wus', async (req, res) => {
    if(isConnected(req)) {
        const sqlquery = "INSERT INTO write_ups(name,date,catid) VALUES(?,?,?);";
        if(req.files) {
            saveFile(req.files.wucontent, req.body.name);
        } else {
            console.log("No files provided");
        }
        if(req.body.name && req.body.date && req.body.cat) {
            let catid = await queryAll(db, `SELECT id FROM categories WHERE name = "${req.body.cat}";`);
            db.run(sqlquery, [req.body.name, req.body.date, catid[0].id], (err) => {
                if(err) {
                    res.status(400).json({"error": err.message});
                    return;
                } else {
                    res.redirect('/api/get/wus');
                }
            });
        } else {
            res.send('An error occured in req.body');
        }
    } else {
        res.redirect('/home');
    }
});

app.post('/api/post/tags', (req, res) => {
    if(isConnected(req)) {
        console.log(req.body)
        const sqlquery = "INSERT INTO tags(name) VALUES(?);";
        if(req.body.tag) {
            db.run(sqlquery, req.body.tag, (err) => {
                if(err) {
                    res.status(400).json({"error":err.message});
                    return
                } else {
                    res.redirect('/admin/');
                }
            });
        } else {
            res.send("A problem occured, req.body was empty");
        }
    } else {
        res.redirect('/home');
    }
});

app.post('/api/post/categories', (req, res) => {
    if(isConnected(req)) {
        const sqlquery = "INSERT INTO categories(name) VALUES(?);";
        if(req.body.category) {
            db.run(sqlquery, req.body.category, (err) => {
                if(err) {
                    res.status(400).json({"error": err.message});
                    return;
                } else {
                    res.redirect('/admin/')
                }
            });
        } else {
            res.send('A problem occured, req.body was empty');
        }
    } else {
        res.redirect('/home');
    }
});

// app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/write-ups', (req, res) => {
    res.render('write-ups/index');
});

app.get('/admin', async (req, res) => {
    if(isConnected(req)) {
        let tags = await queryAll(db, 'SELECT name FROM tags');
        let categories = await queryAll(db, 'SELECT name FROM categories;');
        let wu = await queryAll(db, 'SELECT name FROM write_ups;');
        res.render('admin/index', {tags: tags, categories: categories, wu: wu});
    } else {
        res.redirect('/admin/login');
    }
});

async function queryAll(db, query) {
    return new Promise((resolve, reject) => {
        db.all(query,(err, row) => {
            if (err) reject(err); // I assume this is how an error is thrown with your db callback
            resolve(row);
        });
    });
}


app.post('/admin/login', (req, res) => {
    if(req.body.key == process.env.login_key) {
        res.cookie('connected', 'true', {maxAge: 1000*60*60*24}).redirect('/admin');
    } else {
        res.render('admin/login', {error: "key"});
    }
});

app.get('/admin/login', (req, res) => {
    if(isConnected(req)) {
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