const createIssuePriorityTable = `
        CREATE TABLE IF NOT EXISTS issue_priority (
            id SERIAL PRIMARY KEY,
            priority text NOT NULL DEFAULT 'LOW'::text UNIQUE
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
        priority text REFERENCES issue_priority(priority),
        operating_system character varying(100),
        browser character varying(100),
        device character varying(50),
        status character varying(20) REFERENCES issue_status(status),
        assigned_to text REFERENCES users(username),
        reported_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
        updated_date timestamp without time zone,
        note text
    );
`;

const createIssueStatusTable = `
    CREATE TABLE issue_status (
        id SERIAL PRIMARY KEY,
        status character varying(20) NOT NULL UNIQUE
    );
`;

const insertIssueStatusDefaultValues = `
    INSERT INTO issue_status (status)
    VALUES 
    ('PENDING'), 
    ('IN PROGRESS'), 
    ('STUCK'), 
    ('UNSOLVED'), 
    ('SOLVED');
`;

const insertIssuePriorityDefaultValues = `
    INSERT INTO issue_priority (priority)
    VALUES 
    ('LOW'), 
    ('MEDIUM'), 
    ('HIGH'),
    ('CRITICAL');
`;

const getAllTheTables = `
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name;
`;

module.exports = {
    createIssuePriorityTable,
    createIssueStatusTable,
    createUsersTable,
    createIssuesTable,
    getAllTheTables,
    insertIssueStatusDefaultValues,
    insertIssuePriorityDefaultValues
}