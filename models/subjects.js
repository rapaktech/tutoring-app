const mongoose = require('mongoose');

// Create Subject Schema
const SubjectSchema = mongoose.Schema({
    // Define the properties of the application user
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        enum: ["primary", "jss", "sss"]
    },
    lessons: [ 
        String 
    ], tutors: [
        String
    ]
}, {
    timestamps: true
});


module.exports = mongoose.model('Subject', SubjectSchema);