const http = require('http');
const countStudents = require('./3-read_file_async');

const hostname = '127.0.0.1';
const port = 1245;

const app = http.createServer(async (req, res) => {
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    try {
      const msg = await countStudents(process.argv[2]);
      res.end(`This is the list of our students\n${msg}`);
    } catch (err) {
      res.statusCode = 500;
      res.end(`Error: ${err.message}`);
    }
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});

module.exports = app;
