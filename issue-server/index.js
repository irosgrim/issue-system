require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
// const history = require('connect-history-api-fallback');
const path = require('path');
const { setupDb } = require('./db/dbHelpers');
const { uploadIssueScreenshot }= require('./middlewares/upload');
const { Route, User } = require('./routes/routes');
const app = express();
const port = process.env.ISSUE_SERVER_PORT || 3000;
const route = new Route();
const user = new User();
const baseUrl = process.env.BASE_URL || '';
const checkAuthorisation = require('./middlewares/checkAuthorisation').checkAuthorisation;
app.listen(port, () => console.log('Issue server running on port ' + port));

setupDb();

// app.use(history({
//     disableDotRule: true,
//     verbose: true
//   }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
console.log(baseUrl);
app.use(`${baseUrl}/report`, express.static(path.join(__dirname, 'report')));
app.use(`${baseUrl}/support`, express.static(path.join(__dirname, 'support')));

// app.get(/.*/,(req,res)=>res.sendFile(path.resolve(__dirname, 'www/index.html')))

app.get(`${baseUrl}/support/issues`, route.getIssues());
app.get(`${baseUrl}/support/get-all-support-users`, route.getAllSupportUsers());
// app.get('*', (req, res) => res.send('there is nothing to see here!'))

app.post(`${baseUrl}/report/report-issue`, uploadIssueScreenshot, route.reportIssue());
app.post(`${baseUrl}/support/assign-issue`, checkAuthorisation(), route.assignIssueTo());
app.post(`${baseUrl}/support/set-issue-status`, checkAuthorisation(), route.setIssueStatus());
app.post(`${baseUrl}/support/set-issue-note`, checkAuthorisation(), route.setIssueNote());
app.post(`${baseUrl}/support/register`, checkAuthorisation(), user.registerUser());
app.post(`${baseUrl}/support/login`, checkAuthorisation(), user.loginUser());
