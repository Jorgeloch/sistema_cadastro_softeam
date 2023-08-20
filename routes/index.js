const express = require('express');
const { getIndex, postIndex } = require('../controllers/indexController');
const router = express.Router();

router.get('/', getIndex);
router.post('/', postIndex);

module.exports = router;