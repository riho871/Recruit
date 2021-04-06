const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'riho8710',
    database: 'Recruit'
});

connection.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return;
    }
    console.log('success');
});

app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get('/job', (req, res) => {
  connection.query(
    'SELECT * FROM jobs',
    (error, results) => {
      res.render('job.ejs', { jobs: results });
    }
  );
});

app.get('/content/:id', (req, res) => {
  const id = req.params.id;
  connection.query(
    'SELECT * FROM jobs WHERE id = ?',
    [id],
    (error, results) => {
      res.render('content.ejs', { job: results[0] });
    }
  );
});

app.listen(4090);