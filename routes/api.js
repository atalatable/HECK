var express = require('express');
var apiRoute = express.Router();
const { db } = require('../database');
const {isConnected} = require('./admin');

apiRoute.get('/get/tags', (req, res) => {
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

apiRoute.get('/get/wus', (req, res) => {
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

apiRoute.get('/get/categories', (req, res) => {
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

apiRoute.post('/post/wus', async (req, res) => {
    if(isConnected(req)) {
        const sqlquery = "INSERT INTO write_ups(name,date,catid) VALUES(?,?,?);";
        if(req.files) {
            saveFile(req.files.wucontent, req.body.name);
        } else {
            console.log("No files provided");
        }
        if(req.body.name && req.body.date && req.body.cat) {
            console.log(req.body)
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

apiRoute.post('/post/tags', (req, res) => {
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

apiRoute.post('/post/categories', (req, res) => {
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

module.exports = { apiRoute };