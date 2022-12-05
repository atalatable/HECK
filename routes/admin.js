var express = require('express');
var adminRoute = express.Router();

const { db, queryAll } = require('../database');

function isConnected(req) {
    return req.cookies.connected == "true";
}

adminRoute.get('/', async (req, res) => {
    if(isConnected(req)) {
        let tags = await queryAll(db, 'SELECT * FROM tags');
        let categories = await queryAll(db, 'SELECT * FROM categories;');
        let wu = await queryAll(db, "SELECT name FROM write_ups;");
        res.render('admin/index', {tags: tags, categories: categories, wu: wu});
    } else {
        res.redirect('/admin/login');
    }
});

adminRoute.post('/login', (req, res) => {
    if(req.body.key == process.env.login_key) {
        res.cookie('connected', 'true', {maxAge: 1000*60*60*24}).redirect('/admin');
    } else {
        res.render('admin/login', {error: "key"});
    }
});

adminRoute.get('/login', (req, res) => {
    if(isConnected(req)) {
        res.redirect('/admin');
    } else if(req.query.origin) {
        res.render('admin/login', {error: req.query.origin})
    } else {
        res.render('admin/login');
    }
});

module.exports = {adminRoute, isConnected};