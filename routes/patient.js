const express = require('express');
const router = express.Router();
const verify = require('../config/verifyToken');

const patientController = require('../controllers/patient_controller');

router.post('/register', verify, patientController.register);
router.post('/:id/create_report', verify, patientController.createReport);
router.get('/:id/all_reports', verify, patientController.displayAllReports);

module.exports = router;