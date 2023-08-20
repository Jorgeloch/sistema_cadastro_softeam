const express = require('express');
const auth = require('../middlewares/auth');
const { getCompanies, createCompany, updateCompanyByID, deleteCompany } = require('../controllers/comapniesController');

const router = express.Router();

router.get('/', auth, getCompanies);
router.post('/create', auth, createCompany);
router.put('/update/:_id',auth, updateCompanyByID);
router.delete('/delete', auth, deleteCompany);

module.exports = router;