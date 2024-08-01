const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sagar@993', // Replace with your MySQL root password
  database: 'studentdb'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// CRUD routes
app.get('/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/students', (req, res) => {
  const student = req.body;
  db.query('INSERT INTO students SET ?', student, (err, result) => {
    if (err) throw err;
    res.send('Student added successfully!');
  });
});

app.put('/students/:id', (req, res) => {
  const student = req.body;
  db.query('UPDATE students SET ? WHERE id = ?', [student, req.params.id], (err, result) => {
    if (err) throw err;
    res.send('Student updated successfully!');
  });
});

app.delete('/students/:id', (req, res) => {
  db.query('DELETE FROM students WHERE id = ?', [req.params.id], (err, result) => {
    if (err) throw err;
    res.send('Student deleted successfully!');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
