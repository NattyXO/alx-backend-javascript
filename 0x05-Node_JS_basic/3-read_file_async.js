const fs = require('fs');
const { promisify } = require('util');

async function countStudents(path) {
  const readFileAsync = promisify(fs.readFile);

  try {
    const data = await readFileAsync(path, { encoding: 'utf8', flag: 'r' });
    const response = [];
    let msg;

    const content = data.split('\n');

    let students = content.filter((item) => item);

    students = students.map((item) => item.split(','));

    const studentSize = students.length ? students.length - 1 : 0;
    msg = `Number of students: ${studentSize}`;
    console.log(msg);

    response.push(msg);

    const fields = {};
    for (const i in students) {
      if (i !== 0) {
        if (!fields[students[i][3]]) fields[students[i][3]] = [];

        fields[students[i][3]].push(students[i][0]);
      }
    }

    delete fields.field;

    for (const key of Object.keys(fields)) {
      msg = `Number of students in ${key}: ${fields[key].length}. List: ${fields[key].join(', ')}`;
      console.log(msg);
      response.push(msg);
    }

    return response;
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
