require('dotenv').config()
const express = require('express');
const path = require('path');
const { checkIfTheTablesExist, setupDb } = require('./db/db');
const { Route } = require('./routes/routes');
const setup = require('./db/db').setup;
const checkAuthorisation= require('./middlewares/middlewares').checkAuthorisation;
const app = express();
const port = 3002;
const route = new Route();
const baseUrl="/issue-tracker";
setupDb();

app.use(baseUrl, express.static(path.join(__dirname, 'www')));


app.get(`${baseUrl}/ongoing-issues`, checkAuthorisation(), route.getOngoingIssues());

app.listen(port, () => console.log('Issue server running on port ' + port));