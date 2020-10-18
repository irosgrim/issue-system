const query = require('../db/dbHelpers').dbQuery;
const { insertNewIssue, getAllIssuesWithStatus, getAllIssues } = require('../db/dbQueries');

class User {
    registerUser() {
        return (req, res) => {
            const { name, username, password, email } = req.body;
            const expectedUserInformation = { name, username, password, email }
            const requiredUserInformation = Object.keys(pickBy(expectedUserInformation, (x) => x === undefined));
            if(requiredUserInformation.length) {
                res.status(400).send({required: requiredUserInformation});
                return;
            }
            res.cookie('token', 'the secret', { httpOnly: true, secure: false, maxAge: 1000 * 60 * 60 * 24});
            res.send('Test cookie set');
        }
    }
    loginUser() {
        return (req, res) => {
            const { email, password } = req.body;
            const expectedUserInformation = { email, password }
            const requiredUserInformation = Object.keys(pickBy(expectedUserInformation, (x) => x === undefined));
            if(requiredUserInformation.length) {
                res.status(400).send({required: requiredUserInformation});
            }
        }
    }
}
class Route {
    getIssues() {
        return (req, res) => {
            const issueStatus = req.query.status;
            const authorisedUser = true;//req.authorisedUser;
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
                        const allIssuesMapped = results.rows.map(issue => {
                            return {
                                id: issue.id,
                                issueSubject: issue.issue_subject,
                                issueDescription: issue.issue_description,
                                issueLocation: issue.issue_location,
                                issueScreenshot: issue.issue_screenshot &&'/screenshots/' + issue.issue_screenshot,
                                reporter: {
                                    name: issue.reporter_name,
                                    email: issue.reporter_email,
                                },
                                priority: issue.priority,
                                operatingSystem: issue.operating_system,
                                browser: issue.browser,
                                device: issue.device,
                                status: issue.status,
                                assignedTo: issue.assigned_to,
                                reportedDate: issue.reported_date,
                                updatedDate: issue.updated_date,
                                note: issue.note
                            }
                        })
                        res.send(allIssuesMapped);
                    })
                }
            } else {
                res.status(403).send('Unauthorised');
            }
            
        }
    }

    getAllSupportUsers() {
        return (req, res) => {
            const testUsers = [
                {
                    id: 0,
                    name: 'Takashi Ryushin',
                    username: 'Ryu',
                    email: 'ryu@support.com'
                },
                {
                    id: 1,
                    name: 'Alice Doe',
                    username: 'alice42',
                    email: 'alice@support.com'
                },
                {
                    id: 2,
                    name: 'Johnny Bravo',
                    username: 'john_b',
                    email: 'johnny_bravo@support.com'
                }
            ]
            res.send(testUsers);
        }
    }

    reportIssue() {
        return async (req, res) => {
            const {
                issueSubject='No subject', 
                issueDescription, 
                issueLocation, 
                name='No Name',
                email,
                priority='LOW',
                operatingSystem,
                browser,
                device
            } = req.body;

            const expectedIssueDetails = {
                ["issue subject"]: issueSubject, 
                ["issue description"]: issueDescription, 
                ["issue location"]: issueLocation, 
                ["reporter's name"]: name, 
                ["reporter's email"]: email,
                ["priority"]: priority,
                ["operating system"]: operatingSystem,
                ["browser"]: browser,
                ["device"]: device
            }
            const issueScreenshot =  req.uploadedImageName || '';
            const requiredIssueDetails = Object.keys(pickBy(expectedIssueDetails, (x) => x === undefined || !x));
            const msg = requiredIssueDetails.join(', ').replace(/, ([^,]*)$/, ' & $1');

            if(requiredIssueDetails.length) {
                res.status(400).send({message: msg[0].toUpperCase() + msg.slice(1) + ' required'});
                return;
            }

            query(insertNewIssue, 
                [issueSubject, issueDescription, issueLocation, issueScreenshot, name, email, priority, operatingSystem, browser, device], 
                (error, results) => {
                    if(error) {
                        console.log(error);
                        return;
                    }
                    res.status(200).send({ message: 'The reference of the issue is: ', id: results.rows[0].id});
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