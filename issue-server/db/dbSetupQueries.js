const createCategoryTable = `
    CREATE TABLE issue_category (
        id SERIAL PRIMARY KEY,
        category character varying(50) UNIQUE
    );
`;
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
        issue_subject character varying(50),
        issue_description text NOT NULL,
        issue_location text NOT NULL,
        issue_screenshot character varying(100),
        reporter_name character varying(50),
        reporter_email character varying(50),
        priority text REFERENCES issue_priority(priority),
        operating_system character varying(100),
        browser character varying(100),
        device character varying(50),
        status character varying(20) REFERENCES issue_status(status),
        assigned_to text REFERENCES users(username),
        reported_date timestamp without time zone DEFAULT timezone('utc'::text, now()),
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

const insertCategoryDefaultValues = `
    INSERT INTO issue_category (category)
    VALUES 
    ('UNCATEGORISED'), 
    ('WEBSITE'), 
    ('PAYMENTS'),
    ('ACCOUNT');
`;

const insertIssueStatusDefaultValues = `
    INSERT INTO issue_status (status)
    VALUES 
    ('PENDING'), 
    ('IN PROGRESS'), 
    ('STUCK'), 
    ('UNSOLVED'), 
    ('CLOSED');
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
    createCategoryTable,
    createIssuePriorityTable,
    createIssueStatusTable,
    createUsersTable,
    createIssuesTable,
    getAllTheTables,
    insertCategoryDefaultValues,
    insertIssueStatusDefaultValues,
    insertIssuePriorityDefaultValues
}