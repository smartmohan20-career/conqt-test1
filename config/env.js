import DotEnv from "dotenv";

// Load environment variables from .env file
DotEnv.config();

// Define the configuration object
const config = {
    environment: process.env.ENVIRONMENT,
    port: process.env.PORT,
};

export default config;
