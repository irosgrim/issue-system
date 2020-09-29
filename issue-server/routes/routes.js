const query = require('../db/dbHelpers').dbQuery;
const { insertNewIssue, getAllIssuesWithStatus, getAllIssues } = require('../db/dbQueries');

class User {
    registerUser() {
        return (req, res) => {
            const { name, username, password, email } = req.body;
            const expectedFields = { name, username, password, email }
            const requiredFields = Object.keys(pickBy(expectedFields, (x) => x === undefined));
            if(requiredFields.length) {
                res.status(400).send({required: requiredFields});
                return;
            }
            res.cookie('token', 'the secret', { httpOnly: true, secure: false, maxAge: 1000 * 60 * 60 * 24});
            res.send('Test cookie set');
        }
    }
    loginUser() {
        return (req, res) => {
            const { email, password } = req.body;
            const expectedFields = { email, password }
            const requiredFields = Object.keys(pickBy(expectedFields, (x) => x === undefined));
            if(requiredFields.length) {
                res.status(400).send({required: requiredFields});
            }
        }
    }
}
class Route {
    getIssues() {
        return (req, res) => {
            const issueStatus = req.query.status;
            const authorisedUser = req.authorisedUser;
            if(authorisedUser) {
                if(issueStatus) {
                    query(getAllIssuesWithStatus, [issueStatus], (error, results) => {
                        if(error) {
                            console.log(error);
                            return;
                        }
                        res.send(results.rows)
                    })
                } else {
                    query(getAllIssues, [], (error, results) => {
                        if(error) {
                            console.log(error);
                            return;
                        }
                        res.send(results.rows)
                    })
                }
            } else {
                res.status(403).send('Unauthorised');
            }
            
        }
    }

    getAllUsers() {
        return (req, res) => {
            res.send('list of all the users');
        }
    }

    reportIssue() {
        return async (req, res) => {
            const { 
                issueDescription, 
                issueLocation, 
                reporterName,
                priority='LOW',
                operatingSystem,
                browser,
                device
            } = req.body;
            const issueScreenshot =  req.uploadedImageName || '';

            const expectedRequest = {
                issueDescription, 
                issueLocation, 
                reporterName,
                priority,
                operatingSystem,
                browser,
                device
            }
            const requiredFields = Object.keys(pickBy(expectedRequest, (x) => x === undefined));
            if(requiredFields.length) {
                res.send({required : requiredFields});
                return;
            }

            query(insertNewIssue, 
                [issueDescription, issueLocation, issueScreenshot, reporterName, priority, operatingSystem, browser, device], 
                (error, results) => {
                    if(error) {
                        console.log(error);
                        return;
                    }
                    res.status(200).send('OK');
                }
            );

        }
    }

    assignIssueTo() {
        return async(req, res) => {
            const { issueId, user } = req.body;
            if( !issueId || !user) {
                res.status(400).send('Username and issue id must be provided');
                return;
            }
            res.send(`assign issue ${issueId} to the user ${user}`);
        }
    }

    setIssueStatus() {
        return async (req, res) => {
            const { issueId, issueStatus } = req.body;
            if(!issueId || !issueStatus) {
                res.status(400).send('Issue id and status must be provided');
                return;
            }
            res.send(`set issue status for issue ${issueId} to ${issueStatus}`);
        }
    }

    setIssueNote() {
        return async (req, res) => {
            const { issueId, note } = req.body;
            if(!issueId || !note) {
                res.status(400).send('Issue id and note must be provided');
                return;
            }
            res.send(`set note: "${note}" to issue: ${issueId}`);
        }
    }
}

const pickBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

module.exports = {
    Route,
    User
}