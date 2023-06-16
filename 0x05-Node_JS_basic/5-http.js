const http = require('http');
const fs = require('fs').promises;

async function countStudents(filepath) {
  try {
    const csv = await fs.readFile(filepath, { encoding: 'utf8' });
    const headerArray = csv.split(/\r?\n|\n/);
    const headers = headerArray[0].split(',');

    const dictList = [];
    const noHeaderArray = headerArray.slice(1);
    for (let i = 0; i < noHeaderArray.length; i++) {
      const data = noHeaderArray[i].split(',');
      if (data.length === headers.length) {
        const row = {};
        for (let j = 0; j < headers.length; j++) {
          row[headers[j].trim()] = data[j].trim();
        }
        dictList.push(row);
      }
    }

    let countCS = 0;
    let countSWE = 0;
    const studentsCS = [];
    const studentsSWE = [];

    dictList.forEach((element) => {
      if (element.field === 'CS') {
        countCS++;
        studentsCS.push(element.firstname);
      } else if (element.field === 'SWE') {
        countSWE++;
        studentsSWE.push(element.firstname);
      }
    });

    const countStudents = countCS + countSWE;

    return {
      countStudents,
      countCS,
      countSWE,
      studentsCS,
      studentsSWE,
    };
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

const pathToDB = process.argv[2];
const hostname = '127.0.0.1';
const port = 1245;

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    countStudents(pathToDB)
      .then(({ countStudents, countCS, countSWE, studentsCS, studentsSWE }) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.write('This is the list of our students\n');
        res.write(`Number of students: ${countStudents}\n`);
        res.write(`Number of students in CS: ${countCS}. List: ${studentsCS.join(', ')}\n`);
        res.write(`Number of students in SWE: ${countSWE}. List: ${studentsSWE.join(', ')}\n`);
        res.end();
      })
      .catch(() => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Error: Cannot load the database');
        throw new Error('Cannot load the database');
      });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

app.listen(port, hostname);

module.exports = app;
