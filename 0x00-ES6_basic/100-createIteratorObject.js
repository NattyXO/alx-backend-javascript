export default function* createIteratorObject(report) {
  for (const department in report.allEmployees) {
    for (const employee of report.allEmployees[department]) {
      yield employee;
    }
  }
}
