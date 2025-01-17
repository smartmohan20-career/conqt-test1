import DotEnv from "dotenv";

// Load environment variables from .env file
DotEnv.config();

// Retrieve environment variables object
const ENV_OBJ = process.env;

// Define the configuration object
const config = {
    ENVIRONMENT: ENV_OBJ?.ENVIRONMENT,
    PORT: ENV_OBJ?.PORT,
    DB_USER: ENV_OBJ?.DB_USER,
    DB_HOST: ENV_OBJ?.DB_HOST,
    DB_NAME: ENV_OBJ?.DB_NAME,
    DB_PASS: ENV_OBJ?.DB_PASS,
    DB_PORT: ENV_OBJ?.DB_PORT,
};

export default config;
