const express = require('express');
const router = express.Router();
const verify = require('../config/verifyToken');

const patientController = require('../controllers/patient_controller');

// registers patients
router.post('/register', verify, patientController.register);
// creates a new report for the patients
router.post('/:id/create_report', verify, patientController.createReport);
// displays all reports of a respective person.
router.get('/:id/all_reports', verify, patientController.displayAllReports);

module.exports = router;