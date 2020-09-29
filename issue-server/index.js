require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const { setupDb } = require('./db/dbHelpers');
const { Route, User } = require('./routes/routes');
const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'screenshots/');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        const filename = `${Date.now()}_${req.body.reporterName}.${ext}`;
        req.uploadedImageName = filename;
        cb(null, filename);
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb('not an image', false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
  });

const app = express();
const port = process.env.ISSUE_SERVER_PORT || 3000;
const route = new Route();
const user = new User();
const baseUrl = process.env.BASE_URL || '';
const checkAuthorisation = require('./middlewares/middlewares').checkAuthorisation;
app.listen(port, () => console.log('Issue server running on port ' + port));

setupDb();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(baseUrl, express.static(path.join(__dirname, 'www')));

app.get(`${baseUrl}/issues`, checkAuthorisation(), route.getIssues());
app.get(`${baseUrl}/get-all-users`, checkAuthorisation(), route.getAllUsers());

app.post(`${baseUrl}/report-issue`, upload.single('image'), route.reportIssue());
app.post(`${baseUrl}/assign-issue`, checkAuthorisation(), route.assignIssueTo());
app.post(`${baseUrl}/set-issue-status`, checkAuthorisation(), route.setIssueStatus());
app.post(`${baseUrl}/set-issue-note`, checkAuthorisation(), route.setIssueNote());
app.post(`${baseUrl}/register`, checkAuthorisation(), user.registerUser());
app.post(`${baseUrl}/login`, checkAuthorisation(), user.loginUser());


app.get('*', (req, res) => res.send('there is nothing to see here!'))