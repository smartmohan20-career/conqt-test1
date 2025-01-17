import pool from "../../config/database.js";

// Define user table query
const USER_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL,
        email VARCHAR(255) NOT NULL,
        username VARCHAR(255),
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    );
`;

// Define the create steps table query
const STEPS_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS steps (
        id SERIAL,
        type VARCHAR(255) NOT NULL,
        config jsonb NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    );
`;

// Define the create workflow table query
const WORKFLOW_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS workflows (
        id SERIAL,
        -- user_id INTEGER,
        name VARCHAR(255) NOT NULL,
        steps jsonb NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        -- FOREIGN KEY (user_id) REFERENCES users(id)
    );
`;

// Define the array of all tables
const ALL_TABLES_QUERIES = [
    {
        name: "steps",
        query: STEPS_TABLE_QUERY,
    },
    {
        name: "workflows",
        query: WORKFLOW_TABLE_QUERY,
    }
];

// Function to create all tables
const createAllTables = async () => {
    try {
        // Initialize variables
        const response = {
            status : 'fail',
            message : 'Failed to create tables',
            data: {},
            errors: []
        };        
        const totalTables = ALL_TABLES_QUERIES.length;
        let createdTables = 0;

        // Loop through all the tables
        for (const table of ALL_TABLES_QUERIES) {
            // Execute the query
            await pool.query(table.query);

            // Increment the created tables count
            createdTables++;
        }
        
        // Check if all tables were created
        if (createdTables === totalTables) {
            // Update the response object
            response = {
                ...response, // Spread the existing response object
                status: 'success',
                message: 'Tables created successfully',
            };
        }

        return response;
    } catch (error) {
        // Define the response object
        const response = {
            status: 'fail',
            message: 'Exception occurred',
            data: {},
            errors: [error.message]
        };

        // Return the response
        return response;
    }
};

export {
    createAllTables,
}
