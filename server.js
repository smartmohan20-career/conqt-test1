import app from "./app.js";
import config from "./config/env.js";

// Retrieve required details from config
const PORT = config.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
