const express = require('express');
const router = express.Router();
const verify = require('../config/verifyToken');

const reportController = require('../controllers/reports_controller');

// flters reports on status.
router.get('/:status',verify, reportController.findReports);


module.exports = router;