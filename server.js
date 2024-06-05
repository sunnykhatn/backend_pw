const express = require("express");
const mongoose = require("mongoose");

const app = express();

const server_config = require("./configs/server.config");
const db_config = require("./configs/db.config");
const user_model = require("./models/user.model");

// Create an admin user at application startup
// Connection with MongoDB
mongoose.connect(db_config.DB_URL)
  .then(() => console.log("Connected to MongoDB")) // Handle successful connection
  .catch((error) => console.error("Error while connecting:", error)); // Handle connection error

// Start server
async function init() {
  try {
    let user = await user_model.findOne({ userId: "admin" });

    if (user) {
      console.log("Admin is already present");
      return;
    }

    // Create admin user with password hashing
    user = await user_model.create({
      name: "swapnil",
      userId: "admin",
      email: "sunnykhatnani@gmail.com",
      userType: "ADMIN",
      password: bcrypt.hashSync("Welcome123", 8), // Assuming bcrypt is available
    });

    console.log("Admin user created successfully");
  } catch (err) {
    console.error("Error while initializing or creating admin user:", err);
  }
}

init(); // Call the init function to create admin user (if needed)

app.listen(server_config.PORT, () => {
  console.log("Server Started at port number:", server_config.PORT);
});
