require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const eventRoutes = require("./routes/events");
const userRoutes = require("./routes/users");

const PORT = process.env.PORT || 8080;
const app = express();
app.use(require("cors")({
    origin: "*",
}))

// middleware parses request body as JSON
app.use(express.json());

// routes
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

app.get("/", (_, res) => {
    res.sendFile(path.join(`${__dirname}/index.html`));
})

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
