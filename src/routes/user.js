const express = require('express');
const router = express.Router();
const { updateFitnessData } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.put('/fitness-data', authMiddleware, updateFitnessData);

module.exports = router;