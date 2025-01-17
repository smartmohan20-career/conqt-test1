import express from "express";
import cors from "cors";

// Create an Express app
const app = express();

// Use cors middleware
app.use(cors());

// Use express json middleware
app.use(express.json());

// Import migration scripts
import { createAllTables } from "./db/migrations/createTables.migration.js";

// Create all tables
const createAllTablesRes = await createAllTables();

// Check if all tables were created
if (createAllTablesRes.status === 'fail') {
    // Log the error
    console.error("APP => Failed to create all tables: ", createAllTablesRes.errors);

    // Exit the application
    process.exit(1);
}

// Import routes
import workflowRoute from "./routes/workflow.routes.js";

// Define routes
app.use("/workflow", workflowRoute);

export default app;
