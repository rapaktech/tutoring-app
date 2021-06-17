const express = require('express');

const router = express.Router();

const subjectsController = require('../controllers/subjectsController');

const auth = require('../middleware/auth');


// Create a subject
router.post('/api/createsubject', auth.authenticateUser, auth.checkIfAdmin, subjectsController.createSubject);

router.put('/api/updatesubject', auth.authenticateUser, auth.checkIfAdmin, subjectsController.updateSubject);

router.delete('/api/deletesubject', auth.authenticateUser, auth.checkIfAdmin, subjectsController.deleteSubject);

router.put('/api/update', auth.authenticateUser, auth.checkIfAdmin, subjectsController.updateByCategory);

router.delete('/api/delete', auth.authenticateUser, auth.checkIfAdmin, subjectsController.deleteByCategory);

router.get('/api/findsubject', auth.authenticateUser, subjectsController.findSubject);

router.get('/api/findcategory', auth.authenticateUser, subjectsController.findSubjectsByCategory);

router.get('/api/find', auth.authenticateUser, subjectsController.findAllCategories);

module.exports = router;