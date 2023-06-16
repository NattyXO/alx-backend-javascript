const express = require('express');
const fs = require('fs');
const path = require('path');

function countStudents(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf-8', (err, res) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const headerArray = res.split(/\r?\n|\n/);
      const headers = headerArray[0].split(',');

      const dictList = [];
      for (let i = 1; i < headerArray.length; i++) {
        const data = headerArray[i].split(',');
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

      resolve({
        countStudents,
        countCS,
        countSWE,
        studentsCS,
        studentsSWE,
      });
    });
  });
}

const pathToDB = process.argv[2];
const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  try {
    const {
      countStudents,
      countCS,
      countSWE,
      studentsCS,
      studentsSWE,
    } = await countStudents(path.join(pathToDB, 'database.csv'));

    const text = 'This is the list of our students\n';
    const total = `Number of students: ${countStudents}\n`;
    const CS = `Number of students in CS: ${countCS}. List: ${studentsCS.join(', ')}\n`;
    const SWE = `Number of students in SWE: ${countSWE}. List: ${studentsSWE.join(', ')}`;

    res.status(200).send(text + total + CS + SWE);
  } catch (err) {
    res.status(404).send('Cannot load the database');
  }
});

app.listen(port);

module.exports = app;
