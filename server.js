require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const eventRoutes = require("./routes/events");
const userRoutes = require("./routes/users");

const PORT = process.env.PORT || 8080;
const app = express();

// middleware
app.use(
  require("cors")({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// routes
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

app.get("/", (_, res) => {
  res.sendFile("index.html");
});

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
  });
