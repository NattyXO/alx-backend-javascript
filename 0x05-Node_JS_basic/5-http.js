const http = require('http');
const countStudents = require('./3-read_file_async');

const args = process.argv.slice(2);
const DATABASE = args[0];

const hostname = '127.0.0.1';
const port = 1245;

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  const { url } = req;

  if (url === '/') {
    res.end('Hello Holberton School!');
  } else if (url === '/students') {
    try {
      const students = await countStudents(DATABASE);
      const response = generateStudentsResponse(students);
      res.end(response);
    } catch (error) {
      res.statusCode = 500;
      res.end('Error: Cannot load the database');
    }
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function generateStudentsResponse(students) {
  const {
    countStudents,
    countCS,
    countSWE,
    studentsCS,
    studentsSWE,
  } = students;

  const response = `This is the list of our students\nNumber of students: ${countStudents}\nNumber of students in CS: ${countCS}. List: ${studentsCS.join(', ')}\nNumber of students in SWE: ${countSWE}. List: ${studentsSWE.join(', ')}`;
  
  return response;
}

module.exports = server;
