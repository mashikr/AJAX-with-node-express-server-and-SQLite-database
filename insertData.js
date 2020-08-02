const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});
db.serialize(function () {
    db.run("INSERT INTO students (name,phone,email ) VALUES ('Ashik','01712327242','ashik@gmail.com')");
    db.run("INSERT INTO students (name,phone,email ) VALUES ('Forhad','0123456','forhad@gmail.com')");

    // db.run("DELETE FROM students WHERE id = 1");
    // db.run("UPDATE students SET name = 'new_value', phone = 'new_value', email = 'new_value' WHERE id = 5")
    db.each("SELECT * FROM students", function (err, row) {
        console.log(row.id, row.name, row.phone, row.email);
    });
});
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});