const express = require('express');
const router = express.Router();
const checklistController = require('../controllers/checklistController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, checklistController.saveChecklist);
router.get('/', authMiddleware, checklistController.getChecklist);

module.exports = router;
