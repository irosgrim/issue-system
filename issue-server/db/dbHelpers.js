const { table } = require('console');
const { Pool } = require('pg')
const util = require('util');
const dbSetupQueries = require('./dbSetupQueries');
const {
    createCategoryTable,
    createIssuePriorityTable, 
    createIssueStatusTable,
    createUsersTable, 
    createIssuesTable, 
    getAllTheTables, 
    insertCategoryDefaultValues,
    insertIssuePriorityDefaultValues, 
    insertIssueStatusDefaultValues} = dbSetupQueries;

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});

const setupDb = async () => {
    const expectedTables = ['issue_category', 'issue_priority', 'issue_status', 'users', 'issues'];
    const response = await pool.query(getAllTheTables);
    let tableNamesDictionary = {};

    if(response.rows.length) {
        tableNamesDictionary = response.rows.reduce((accummulator, currentTableName) => {
            accummulator[currentTableName.table_name] = currentTableName.table_name;
            return accummulator;
        }, {});
    }

    for(let table of expectedTables) {
        if(tableNamesDictionary[table] === undefined) {
            await createTables(table);
        }
    }

}

const createTables = async (tableName) => {
    switch(tableName) {
        case 'issue_category':
            try {
                console.log('✓ created issue_category table ');
                await pool.query(createCategoryTable, []);
                await pool.query(insertCategoryDefaultValues, []);
            } catch(err) {
                console.log('❌ error creating issue_category table: ' + err)
            }
            break;
        case 'issue_priority':
            try {
                console.log('✓ created issue_priority table ');
                await pool.query(createIssuePriorityTable, []);
                await pool.query(insertIssuePriorityDefaultValues, []);
            } catch(err) {
                console.log('❌ error creating issue_priority table: ' + err)
            }
            break;
        case 'issue_status':
            try {
                console.log('✓ created issue_status table');
                await pool.query(createIssueStatusTable, []);
                await pool.query(insertIssueStatusDefaultValues, []);
            } catch(err) {
                console.log('❌ error creating issue_status table: ' + err);
            }
            break;
        case 'users':
            try {
                console.log('✓ created users table');
                await pool.query(createUsersTable, []);
            } catch(err) {
                console.log('❌ error creating users table: ' + err);
            }
            break;
        case 'issues':
            try {
                console.log('✓ created issues tables');
                await pool.query(createIssuesTable, []);
            } catch(err) {
                console.log('❌ error creating issues table: ' + err);
            }
            break;
    }
}

const dbQuery = (text, params, callback) => {
    const start = Date.now();

    return pool.query(text, params, (err, res) => {
        const duration = Date.now() - start;
        console.log('Executed query: ' + util.inspect({text, duration: duration + 'ms', rows: (res && res.rowCount) ? res.rowCount : 0}, false, null, true));
        callback(err, res);
    })
}

module.exports = {
    setupDb,
    dbQuery
}