import pool from "../config/database.js";

// Function to execute query
const executeQuery = async (query, params) => {
    try {
        // Initialize variables
        const response = {
            status: 'fail',
            message: 'Failed to execute query',
            data: {},
            errors: []
        };

        // Connect to the database
        const client = await pool.connect();

        // Execute the query
        const result = await client.query(query, params);

        // Check if the query was executed successfully
        if (result.rowCount > 0) {
            // Update the response object
            response = {
                ...response, // Spread the existing response object
                status: 'success',
                message: 'Query executed successfully',
                data: result.rows,
            };
        }

        // Close the client connection
        client.release();

        // Return the response
        return response;
    } catch (error) {
        // Define the response object
        const response = {
            status: 500,
            message: "Internal Server Error",
            data: {},
            errors: [error.message]
        };

        // return the response
        return response;
    }
};

export {
    executeQuery,
}
