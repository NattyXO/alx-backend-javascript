const http = require('http');
const readFileAsync = require('./3-read_file_async');

const app = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('Hello Holberton School!');
      res.end();
      break;
    case '/students':
      readFileAsync('./database.csv', (err, students) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.write(err.message);
          res.end();
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.write('This is the list of our students\n');
          res.write(`Number of students: ${students.length}\n`);
          students.forEach((student) => {
            res.write(`Number of students in ${student.program}: ${student.count}. List: ${student.students.join(', ')}\n`);
          });
          res.end();
        }
      });
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('404 Not Found');
      res.end();
      break;
  }
});

app.listen(1245);

module.exports = app;
