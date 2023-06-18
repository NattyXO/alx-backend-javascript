const express = require('express');
const readFileAsync = require('./3-read_file_async');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  readFileAsync('./database.csv', (err, students) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send(`This is the list of our students
Number of students: ${students.length}
Number of students in CS: ${students.filter(student => student.program === 'CS').length}. List: ${students.filter(student => student.program === 'CS').map(student => student.name).join(', ')}
Number of students in SWE: ${students.filter(student => student.program === 'SWE').length}. List: ${students.filter(student => student.program === 'SWE').map(student => student.name).join(', ')}`);
    }
  });
});

app.listen(1245);

module.exports = app;
