var express = require('express');
var router = express.Router();
const { db } = require('./database.js');

router.get('/api/get/tags', (req, res) => {
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

router.get('/api/get/categories', (req, res) => {
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

router.post('/api/post/tags', (req, res) => {
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
});

router.post('/api/post/category', (req, res) => {
    const sqlquery = "INSERT INTO categories(name) VALUES(?);";
    if(req.body.name) {
        db.run(sqlquery, req.body.name, (err) => {
            if(err) {
                res.status(400).json({"error": err.message});
                return;
            } else {
                res.redirect('/api/get/categories')
            }
        });
    } else {
        res.send('A problem occured, req.body was empty');
    }
})

module.exports = router;