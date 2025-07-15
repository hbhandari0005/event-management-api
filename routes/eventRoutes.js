const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventController');
const pool = require('../models/db');

router.get('/new', (req, res) => res.render('new_event'));
router.post('/', controller.createEvent);
router.get('/:id/register', async (req, res) => {
  const users = await pool.query('SELECT * FROM users');
  res.render('register_user', { eventId: req.params.id, users: users.rows });
});
router.post('/:id/register', controller.registerUser);
router.get('/:id/stats', controller.eventStats);
router.get('/:id/cancel', async (req, res) => {
  const users = await pool.query('SELECT * FROM users');
  res.render('cancel_registration', { eventId: req.params.id, users: users.rows });
});

router.post('/:id/cancel', async (req, res) => {
  const { userId } = req.body;
  const eventId = req.params.id;

  try {
    const exists = await pool.query(
      'SELECT * FROM registrations WHERE event_id = $1 AND user_id = $2',
      [eventId, userId]
    );
    if (exists.rows.length === 0) {
      return res.status(400).send('User is not registered for this event.');
    }

    await pool.query(
      'DELETE FROM registrations WHERE event_id = $1 AND user_id = $2',
      [eventId, userId]
    );

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to cancel registration.');
  }
});

module.exports = router;
