const express = require('express');
const auth = require('../middlewares/auth');
const authUpdate = require('../middlewares/authUpdate');
const { getCollaborators, createCollaborator, authCollaborator, updateCollaboratorByID, updateCollaboratorPassword, deleteCollaborator } = require('../controllers/collaboratorController');

const router = express.Router();

router.get('/', auth, getCollaborators); 
router.post('/create', auth, createCollaborator);
router.post('/auth', authCollaborator);
router.put('/update/:_id', authUpdate, updateCollaboratorByID);
router.put('/updatePassword/:_id', authUpdate, updateCollaboratorPassword);
router.delete('/delete', auth, deleteCollaborator);

module.exports = router;