const express = require('express');
const auth = require('../middlewares/auth');
const { getProjects, createProject, updateProjectByID, deleteProject } = require('../controllers/projectController');

const router = express.Router();

router.get('/', auth, getProjects);
router.post('/create', auth, createProject);
router.put('/update/:_id', auth, updateProjectByID);
router.delete('/delete', auth, deleteProject);

module.exports = router;