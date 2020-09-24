require('dotenv').config()
const express = require('express');
const path = require('path');
const { setupDb } = require('./db/dbHelpers');
const { Route } = require('./routes/routes');
const checkAuthorisation = require('./middlewares/middlewares').checkAuthorisation;
const app = express();
const port = process.env.ISSUE_SERVER_PORT;
const route = new Route();
const baseUrl = process.env.BASE_URL;
app.listen(port, () => console.log('Issue server running on port ' + port));

setupDb();

app.use(baseUrl, express.static(path.join(__dirname, 'www')));

app.get(`${baseUrl}/all-issues`, checkAuthorisation(), route.getOngoingIssues());
