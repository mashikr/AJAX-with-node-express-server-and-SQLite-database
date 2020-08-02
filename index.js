///// Basic code for node express server with sqlite database (start) /////
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/src'));

app.get('/students', function(req, res) {
    db.all("SELECT * FROM students", function (err, rows) {
       res.json(rows);
    });
});
app.get('/students/:id', function(req, res) {
    db.all("SELECT * FROM students WHERE id = " + req.params.id, function (err, row) {
        res.json(row);
     });
});
app.post('/students', function(req, res) {
    db.run("INSERT INTO students (name,phone,email ) VALUES ('" + req.body.name + "','" + req.body.phone + "','" + req.body.email + "')", function(err) {
        console.log(err);
        res.json({id: this.lastID});
    });
});
app.put('/students/:id', function(req, res) {
    db.run("UPDATE students SET name = '" + req.body.name + "', phone = '" + req.body.phone + "', email = '" + req.body.email + "' WHERE id = " + req.params.id, function(err) {
        console.log(err);
        res.send('update data, id: ' + req.params.id);
    })
});
app.delete('/students/:id', function(req, res) {
    db.run("DELETE FROM students WHERE id = " + req.params.id, function(err) {
        console.log(err);
        res.send('delete data, id: ' + req.params.id);
    });
});
app.listen(3000);


///// Basic code for node express server without sqlite database (start) /////
/*
onst express = require('express');
const app = express();
const bodyParser = require('body-parser');
const data = { 
    "students": [{
        "name": "Ashik", 
        "phone": "012345",
        "email": "ashik@gmail.com",
        "id": 1
    }, {
        "name": "Asif", 
        "phone": "012345",
        "email": "asif@gmail.com",
        "id": 2
    }]
 };


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/src'));

app.get('/students', function(req, res) {
    res.json(data);
});
app.get('/students/:id', function(req, res) {
    res.send(getRow(req.params.id));
});
app.post('/students', function(req, res) {
    req.body.id = data.students.length+1;
    data.students.push(req.body);  
    console.log(data);
    res.send('POST req');    
});
app.put('/students/:id', function(req, res) {
    req.body.id = req.params.id;
    let temp = data.students.indexOf(getRow(req.params.id));
    if(temp != -1) {
        data.students[temp] = req.body;
        res.send('update ' + temp);
    } else {
        res.send('not found');
    }
    console.log(data);
});
app.delete('/students/:id', function(req, res) {
    let temp = data.students.indexOf(getRow(req.params.id));
    if(temp != -1) {
        data.students.splice(temp, 1);
        res.send('deleted ' + temp);
    } else {
        res.send('not found');
    }
    console.log(data);
});
app.listen(3000);

function getRow(id){
    for(let item of data.students) {
        if(item.id == id) return item;
    }
    return false;
}

*/
///// Basic code for node express server without sqlite database (end) /////


