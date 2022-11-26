var sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_SOURCE = path.join(__dirname, "data", "db.sqlite");
const sqlinit = fs.readFileSync(path.join(__dirname, "data", "test.sql")).toString();

let db = new sqlite3.Database(DB_SOURCE, (error) => {
    if(error) {
        console.error(error);
        throw error;
    } else {
        db.run(sqlinit, (error) => {
            if(error) {
                console.log(error);
            } else {
                var insert = 'INSERT INTO user (name, password) VALUES (?,?,?)';
                db.run(insert, ["admin","admin123456"]);
            }
        });
    }
});

module.exports = { db }