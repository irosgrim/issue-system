require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { setupDb } = require('./db/dbHelpers');
const { Route } = require('./routes/routes');
const app = express();
const port = process.env.ISSUE_SERVER_PORT || 3000;
const route = new Route();
const baseUrl = process.env.BASE_URL || '';
const checkAuthorisation = require('./middlewares/middlewares').checkAuthorisation;
app.listen(port, () => console.log('Issue server running on port ' + port));

setupDb();

app.use(bodyParser.json());
app.use(baseUrl, express.static(path.join(__dirname, 'www')));

app.get(`${baseUrl}/issues`, checkAuthorisation(), route.getIssues());
app.get(`${baseUrl}/get-all-users`, checkAuthorisation(), route.getAllUsers());

app.post(`${baseUrl}/report-issue`, checkAuthorisation(), route.reportIssue());
app.post(`${baseUrl}/assign-issue`, checkAuthorisation(), route.assignIssueTo());
app.post(`${baseUrl}/set-issue-status`, checkAuthorisation(), route.setIssueStatus());
app.post(`${baseUrl}/set-issue-note`, checkAuthorisation(), route.setIssueNote());

app.get('*', (req, res) => res.send('there is nothing to see here!'))