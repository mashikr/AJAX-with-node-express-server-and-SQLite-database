const sqlite3 = require('sqlite3').verbose();
let testdb = "database";
let db = new sqlite3.Database(testdb, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});