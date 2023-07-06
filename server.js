require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const eventRoutes = require("./routes/events");
const userRoutes = require("./routes/users");

const PORT = process.env.PORT || 8080;
const app = express();

// middleware parses request body as JSON
app.use(express.json());

// routes
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

// connect to MongoDB
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
          console.log(`Listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
    })
