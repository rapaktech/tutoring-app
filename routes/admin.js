const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

// Import the router controller
const adminController = require('../controllers/adminController');


// Make a tutor an admin
router.put('/admin/makeadmin', auth.authenticateUser, auth.checkIfAdmin, adminController.makeTutorAdmin);

// Make an admin a tutor
router.put('/admin/maketutor', auth.authenticateUser, auth.checkIfAdmin, adminController.makeAdminTutor);


module.exports = router;