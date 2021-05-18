const express = require('express');

const router = express.Router();

const { check } = require('express-validator');

const auth = require('../controllers/usersContoller');

// Import the router controller
const usersController = require('../controllers/usersController');


// User login route
router.post('/api/auth/login', [
    check("email", "Please enter a valid email address").isEmail(),
    check("password", "Valid password required").exists(),
], usersController.loginUser);


// get logged in user
router.get('api/auth', auth, usersController.getLoggedInUser);


module.exports = router;