const { Pool } = require('pg');

const queryString = `
SELECT DISTINCT teachers.name AS teacher,
cohorts.name AS cohort
FROM teachers
JOIN assistance_requests ON teachers.id = assistance_requests.teacher_id
JOIN students ON students.id = assistance_requests.student_id
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE $1
ORDER BY teacher
LIMIT $2
  `;
const cohortName = process.argv[2] || 'JUL02';
const limit = process.argv[3] || 5;

// Store all potentially malicious values in an array.
const values = [`%${cohortName}%`, limit];

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.cohort}: ${user.teacher}`);
    });
  }).catch(err => console.error('query error', err.stack));