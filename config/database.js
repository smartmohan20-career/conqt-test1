import pg from "pg";

// Import the pg module
const { Pool } = pg;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "conqt-test1",
    password: "Hkrnlp8#",
    port: 5432,
});

export default pool;
