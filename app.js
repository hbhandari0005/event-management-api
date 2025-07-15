const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const pool = require("./models/db");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM events ORDER BY datetime ASC, location ASC"
    );
    res.render("index", { events: result.rows });
  } catch (err) {
    res.status(500).send("Error fetching events");
  }
});

app.use("/events", eventRoutes);
app.use("/users", userRoutes);
app.use(errorHandler);

module.exports = app;
