import DotEnv from "dotenv";

// Load environment variables from .env file
DotEnv.config();

// Define the configuration object
const config = {
    ENVIRONMENT: process.env.ENVIRONMENT,
    PORT: process.env.PORT,
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_PASS: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT,
};

export default config;
