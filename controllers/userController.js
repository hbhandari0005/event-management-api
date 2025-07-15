const pool = require("../models/db");

exports.createUser = async (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).send("All fields required");
  try {
    await pool.query("INSERT INTO users (name, email) VALUES ($1, $2)", [
      name,
      email,
    ]);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};
