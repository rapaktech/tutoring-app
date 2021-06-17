const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

// Import the router controller
const lessonsController = require('../controllers/lessonsController');


// Create a lesson
router.post('/api/createlesson', auth.authenticateUser, auth.checkIfAdmin, lessonsController.createLesson);

// Fetch all lessons
router.get('/api/lessons', auth.authenticateUser, auth.checkIfAdmin, lessonsController.fetchAllLessons);

// Fetch a lesson
router.get('/api/findlesson', auth.authenticateUser, lessonsController.findLesson);

// Update a lesson
router.put('/api/updatelesson', auth.authenticateUser, auth.checkIfAdmin, lessonsController.updateLesson);

// Delete a lesson
router.delete('/api/deletelesson', auth.authenticateUser, auth.checkIfAdmin, lessonsController.deleteLesson);

// Book a lesson
router.post('/api/booklesson', auth.authenticateUser);


module.exports = router;