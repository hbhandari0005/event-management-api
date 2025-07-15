const pool = require("../models/db");
const dayjs = require("dayjs");

exports.createEvent = async (req, res, next) => {
  const { title, datetime, location, capacity } = req.body;
  console.log(req.user);
  if (!title || !datetime || !location || !capacity)
    return res.status(400).send("All fields are required");
  if (capacity <= 0 || capacity > 1000)
    return res.status(400).send("Capacity must be between 1 and 1000");
  try {
    await pool.query(
      "INSERT INTO events (title, datetime, location, capacity) VALUES ($1, $2, $3, $4)",
      [title, datetime, location, capacity]
    );
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

exports.registerUser = async (req, res, next) => {
  const eventId = req.params.id;
  const userId = req.body.userId;
  if (!userId) return res.status(400).send("User ID required");
  try {
    const event = await pool.query("SELECT * FROM events WHERE id = $1", [
      eventId,
    ]);
    if (event.rows.length === 0) return res.status(404).send("Event not found");
    if (dayjs(event.rows[0].datetime).isBefore(dayjs()))
      return res.status(400).send("Cannot register for past events");
    const exists = await pool.query(
      "SELECT * FROM registrations WHERE event_id = $1 AND user_id = $2",
      [eventId, userId]
    );
    if (exists.rows.length > 0)
      return res.status(400).send("User already registered");
    const count = await pool.query(
      "SELECT COUNT(*) FROM registrations WHERE event_id = $1",
      [eventId]
    );
    if (+count.rows[0].count >= event.rows[0].capacity)
      return res.status(400).send("Event is full");
    await pool.query(
      "INSERT INTO registrations (event_id, user_id) VALUES ($1, $2)",
      [eventId, userId]
    );
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

exports.eventStats = async (req, res, next) => {
  const id = req.params.id;
  try {
    const event = await pool.query("SELECT * FROM events WHERE id = $1", [id]);
    if (event.rows.length === 0) return res.status(404).send("Event not found");
    const total = await pool.query(
      "SELECT COUNT(*) FROM registrations WHERE event_id = $1",
      [id]
    );
    const used = +total.rows[0].count;
    const remaining = event.rows[0].capacity - used;
    res.render("stats", {
      event: event.rows[0],
      registrations: used,
      remaining,
      usedPercent: ((used / event.rows[0].capacity) * 100).toFixed(2),
    });
  } catch (err) {
    next(err);
  }
};
