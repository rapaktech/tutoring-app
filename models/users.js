const mongoose = require('mongoose');

// Create User Schema

const UserSchema = mongoose.Schema({
    // Define the properties of the application user
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        default: "student",
        enum: ["student", "tutor", "admin"],
        required: true
    },
    subjects: [
        String
    ],
    lessons: [
        String
    ],
    isTutor: {
        type: Boolean,
        default: false,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('User', UserSchema);