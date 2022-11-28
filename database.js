var sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_SOURCE = path.join(__dirname, "data", "db.sqlite");
const sqlArray = fs.readFileSync(path.join(__dirname, "data", "db-dev.sql")).toString().toString().split(";");

let db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Succesfully connected to Database');
});

db.serialize(() => {
    // db.run runs your SQL query against the DB
    db.run('PRAGMA foreign_keys=ON;');
    db.run('BEGIN TRANSACTION;');
    // Loop through the `dataArr` and db.run each query
    sqlArray.forEach((query) => {
        if(query) {
            // Add the delimiter back to each query before you run them
            // In my case the it was `);`
            query += ';';
            db.run(query, (err) => {
                if(err) console.log(err);
            });
        }
    });
    db.run('COMMIT;');
});

module.exports = { db }