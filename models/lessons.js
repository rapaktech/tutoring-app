const mongoose = require('mongoose');


// Create Subject Schema
const LessonSchema = mongoose.Schema({
    // Define the properties of the application user
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Lesson', LessonSchema);