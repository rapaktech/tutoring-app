const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

// Import the router controller
const usersController = require('../controllers/usersController');


// Sign up route
router.post('/signup', usersController.createUser);


// User login route
router.post('/login', usersController.loginUser);


// get logged in user
router.get('/auth', auth.authenticateUser, usersController.getLoggedInUser);


module.exports = router;