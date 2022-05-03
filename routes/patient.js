const express = require('express');
const router = express.Router();

const patientController = require('../controllers/patient_controller');

router.get('/register', patientController.register)

module.exports = router;