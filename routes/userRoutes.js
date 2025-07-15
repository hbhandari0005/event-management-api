const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/new', (req, res) => res.render('new_user'));
router.post('/', controller.createUser);

module.exports = router;
