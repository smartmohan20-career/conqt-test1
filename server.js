import app from "./app.js";
import config from "./config/env.js";

// Retrieve required details from config
const PORT = config.port;

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
