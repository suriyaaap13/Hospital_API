const express = require('express');
const router = express.Router();

const doctorController = require('../controllers/doctor_controller');

// registers a doctor
router.post('/register', doctorController.register);
// logins a doctor
router.post('/login', doctorController.login);


module.exports = router;