import pg from "pg";
import config from "./env.js";

// Import the pg module
const { Pool } = pg;

// Retrieve required details from config
const { DB_USER, DB_HOST, DB_NAME, DB_PASS, DB_PORT } = config;

// Create a new pool
const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASS,
    port: DB_PORT,
});

export default pool;
