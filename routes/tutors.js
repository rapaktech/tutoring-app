const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

const tutorsController = require('../controllers/tutorsController');


router.get('/tutors/find', auth.authenticateUser, tutorsController.findTutorByFirstName);

router.get('/tutors/findalltutors', auth.authenticateUser, tutorsController.findAllTutors);

router.get('/tutors/findtutor', auth.authenticateUser, auth.checkIfAdmin, tutorsController.findTutor);

router.put('/tutors/off', auth.authenticateUser, auth.checkIfAdmin, tutorsController.deactivateTutor);

router.put('/tutors/on', auth.authenticateUser, auth.checkIfAdmin, tutorsController.reactivateTutor);

router.put('/tutors/add', auth.authenticateUser, auth.checkIfTutor, tutorsController.addTutorToSubject);

router.get('/tutors/findbysubject', auth.authenticateUser, tutorsController.findTutorBySubject);

router.get('/tutors/findbytutor', auth.authenticateUser, tutorsController.fetchSubjectsByTutor);

router.put('/tutors/update', auth.authenticateUser, auth.checkIfTutor, tutorsController.updateRegisteredSubject);

router.delete('/tutors/delete', auth.authenticateUser, auth.checkIfTutor, tutorsController.deleteRegisteredSubject);


module.exports = router;