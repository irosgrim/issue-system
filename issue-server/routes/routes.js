const query = require('../db/db').dbQuery;
const eventEmitter = require('events');
class Route {
    getOngoingIssues() {
        return (req, res) => {
            query(`SELECT * FROM test`, [], (error, results) => {
                if(error) {
                    console.log(error);
                    return;
                }
                res.send(results.rows)
            })
        }
    }
}

module.exports = {
    Route
}