SELECT cohorts.name AS name,
  AVG(
    assistance_requests.completed_at - assistance_requests.started_at
  ) AS average_assistance_duration
FROM assistance_requests
  JOIN students ON students.id = assistance_requests.student_id
  JOIN cohorts ON students.cohort_id = cohorts.id
GROUP BY cohorts.name
ORDER BY average_assistance_duration;