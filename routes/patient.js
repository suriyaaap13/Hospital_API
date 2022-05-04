const express = require('express');
const router = express.Router();
const verify = require('../config/verifyToken');

const patientController = require('../controllers/patient_controller');

router.get('/register', verify, patientController.register);
router.get('/:id/create_report', verify, patientController.createReport);

module.exports = router;