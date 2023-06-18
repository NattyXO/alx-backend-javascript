const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  try {
    const students = await countStudents(req.query.database);
    res.send(`This is the list of our students\nNumber of students: ${students.countStudents}\nNumber of students in CS: ${students.countCS}. List: ${students.studentsCS.join(', ')}\nNumber of students in SWE: ${students.countSWE}. List: ${students.studentsSWE.join(', ')}`);
  } catch (error) {
    res.send('Error: Cannot load the database');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
