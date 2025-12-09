const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.get('/', salesController.getSalesData);
router.get('/filters', salesController.getFilterOptions);

// IMPORTANT: Make sure you have this line at the end
module.exports = router;