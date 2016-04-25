/**
 * Created by Admin on 4/25/16.
 */
'use strict';

const PORT = process.env.PORT || 3004;
var express = require('express');
var app = express();
var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('./data/grades.db');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));
db.run(`CREATE TABLE IF NOT EXISTS student (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          assignment text,
          score integer,
          total integer,
          letter text
        )`);

app.set('view engine','jade');
app.get('/', (req,res) => {
    var tablerows = db.all('select * from student', function (err, rows) {
        //res.send(rows);
        console.log(rows);
        //res.send(rows);
        res.render(('../views/index.jade'), {things: rows});
    });
});

//require("./routes/index")

app.get('/api', (req,res) => {
    var tablerows = db.all('select * from student', function(err,rows){
        res.send(rows);
    });
// console.log(tablerows);
// res.send(tablerows)
});
app.post('/api', (req,res) => {

    var assignment = req.body.assignment;
var grade = req.body.grade;
var total = req.body.totalgrade;
var letter = req.body.lettergrade;
db.run('insert into student (assignment, score, total,letter) values (?,?,?,?)',assignment,grade,total,letter);
res.send('created');
}) ;
app.put('/api', (req,res) => {
    var thisid = req.body.id;
console.log('Put statement: ' +req.body);
db.run('update student set assignment=? where id='+thisid,req.body.assignment);
db.run('update student set score=? where id='+thisid,req.body.grade);
db.run('update student set total=? where id='+thisid,req.body.totalgrade);
res.send('updated');
});
app.delete('/api', (req,res) => {
    db.all('delete from student where id ='+ req.body.id);
res.send('deleted');
});

app.listen(PORT, err => {
    console.log( err || `Server listening on port ${PORT}` );
});