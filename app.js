const cors = require("cors");
require("dotenv").config();
const express = require("express");

const mongo = require("./shared/mongo");
const { authCheck, logging } = require("./shared/middleware");

// Routes
const postRoutes = require("./routes/posts.routes");
const userRoutes = require("./routes/users.routes");

const app = express();

(async () => {
  try {
    // MongoDB Connection
    await mongo.connect();

    // Middleware to allow access to API's
    app.use(cors({ origin: ["guviposts.netlify.com"] }));

    // Middleware to parse request body into JSON format
    app.use(express.json());

    // Routes
    app.use("/users", userRoutes);

    // Middlewares
    app.use(authCheck); // Auth Check
    app.use(logging); // Logging

    app.use("/posts", postRoutes);

    // Server Start
    app.listen(process.env.PORT, () =>
      console.log(`Server started at - ${process.env.PORT}`)
    );
  } catch (err) {
    console.log("Error Starting Server", err);
  }
})();
