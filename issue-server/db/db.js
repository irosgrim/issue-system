const { table } = require('console');
const { Pool } = require('pg')
const util = require('util');
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});

const setupDb = async () => {
    const getAllTheTables = `
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
        ORDER BY table_name;
    `;
    const expectedTables = ['urgency', 'users', 'issues'];
    const response = await pool.query(getAllTheTables);
    let tableNamesDictionary = {};
    if(response.rows.length) {
        tableNamesDictionary = response.rows.reduce((accummulator, currentTableName) => {
            accummulator[currentTableName.table_name] = currentTableName.table_name;
            return accummulator;
        }, {});
    }
    let shouldCreateTables = false;
    for(let table of expectedTables) {
        if(tableNamesDictionary[table] === undefined) {
            console.log(`table "${table}" doesn't exist`);
            shouldCreateTables = true;
        }
    }
    if(shouldCreateTables) {
        createTables();
    }
    
}

const createTables = async (tableName) => {
    const createUrgencyTable = `
        CREATE TABLE IF NOT EXISTS urgency (
            id SERIAL PRIMARY KEY,
            urgency text NOT NULL DEFAULT 'LOW'::text UNIQUE
        );
    `;
        
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name character varying(100) NOT NULL,
            username character varying(50) NOT NULL UNIQUE,
            password text NOT NULL,
            email character varying(50) NOT NULL UNIQUE
        );
    `;
            
    const createIssuesTable = `
        CREATE TABLE IF NOT EXISTS issues (
                id SERIAL PRIMARY KEY,
                issue_description text NOT NULL,
                issue_location text NOT NULL,
                issue_screenshot character varying(100),
                reporter_name character varying(50),
                urgency text REFERENCES urgency(urgency),
                operating_system character varying(100),
                browser character varying(100),
                status character varying(20) DEFAULT 'PENDING'::character varying,
                assigned_to text,
                reported_date timestamp without time zone NOT NULL DEFAULT '2020-09-24 12:32:08.363475'::timestamp without time zone,
                updated_date timestamp without time zone
        );
    `;

    try {
        console.log('creating the tables');
        await pool.query(createUrgencyTable, []);
        console.log('✅urgency table created');
        await pool.query(createUsersTable, []);
        console.log('✅users table created');
        await pool.query(createIssuesTable, []);
        console.log('✅issues table created');
    } catch (err) {
        console.log('something went wrong when creating the tables: ' + err);
    }
}

const dbQuery = (text, params, callback) => {
    const start = Date.now();
    return pool.query(text, params, (err, res) => {
        const duration = Date.now() - start;
        console.log('Executed query: ' + util.inspect({text, duration: duration + 'ms', rows: (res && res.rowCount) ? res.rowCount : ''}, false, null, true));
        callback(err, res);
    })
}

module.exports = {
    setupDb,
    dbQuery
}