const User = require('../models/users');

exports.makeTutorAdmin = (req, res) => {
    let email =  req.body.email;
    User.findOneAndUpdate({ email: email }, { isAdmin: true }, (err, updatedUser) => {
        if (err) return res.status(500).json({ message: "Server down. Please try again later" });
        else return res.status(200).json({ message: "Tutor has been granted admin privileges" });
    });
}


exports.makeAdminTutor = (req, res) => {
    let email =  req.body.email;
    User.findOneAndUpdate({ email: email }, { isTutor: true }, (err, updatedUser) => {
        if (err) return res.status(500).json({ message: "Server down. Please try again later" });
        else return res.status(200).json({ message: "Admin has been granted tutor privileges" });
    });
}