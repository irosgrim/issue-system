const query = require('../db/dbHelpers').dbQuery;
const eventEmitter = require('events');
const { request } = require('https');
class Route {
    getOngoingIssues() {
        return (req, res) => {
            query(`SELECT * FROM issues`, [], (error, results) => {
                if(error) {
                    console.log(error);
                    return;
                }
                res.send(results.rows)
            })
        }
    }
    sendNewIssue() {
        return async (req, res) => {
            const { 
                issueDescription, 
                issueLocation, 
                issueScreenshot = '',
                reporterName,
                priority='LOW',
                operatingSystem,
                browser,
                device
            } = req.body;

            const expectedRequest = {
                issueDescription, 
                issueLocation, 
                issueScreenshot,
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

            query(`
                INSERT INTO issues (issue_description, issue_location, issue_screenshot, reporter_name, priority, operating_system, browser, device) 
                VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8)
                `, 
                [issueDescription, issueLocation, issueScreenshot, reporterName, priority, operatingSystem, browser, device], 
                (error, results) => {
                    if(error) {
                        console.log(error);
                        return;
                    }
                    res.status(200).send('OK');
                }
            )
        }
    }
}

const pickBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

module.exports = {
    Route
}