const getAllIssues = `SELECT * FROM issues`;
const getAllIssuesWithStatus = `SELECT * FROM issues WHERE status = $1`;
const insertNewIssue = `INSERT INTO issues 
    (issue_subject, issue_description, issue_location, issue_screenshot, reporter_name, reporter_email, priority, operating_system, browser, device) 
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;
`;

module.exports = {
    getAllIssues,
    getAllIssuesWithStatus,
    insertNewIssue
}