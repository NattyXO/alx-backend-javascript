const http = require('http');
const fs = require('fs');

// Read the database file asynchronously
function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

// Parse the CSV data and return the list of valid students
function parseStudents(data) {
  const lines = data.split('\n');
  const students = [];

  for (const line of lines) {
    const values = line.trim().split(',');
    const name = values[0];

    if (name) {
      students.push(name);
    }
  }

  return students;
}

// Create the HTTP server
const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!\n');
  } else if (req.url === '/students') {
    const databaseFile = process.argv[2];

    readFileAsync(databaseFile)
      .then((data) => {
        const students = parseStudents(data);
        const response = `This is the list of our students\nNumber of students: ${students.length}\nList: ${students.join(', ')}\n`;

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(response);
      })
      .catch((error) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error\n');
        console.error(error);
      });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found\n');
  }
});

// Start the HTTP server on port 1245
const port = 1245;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Export the app
module.exports = app;
