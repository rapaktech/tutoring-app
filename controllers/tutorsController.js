const User = require('../models/users');

const Subject = require('../models/subjects');

exports.findTutorByFirstName = (req, res) => {
    User.find({ firstName:req.body.firstName }, (err, foundTutor) => {
        if (err) return res.status(200).json({ err });
        else return res.status(200).json({ message: "Tutor found" , foundTutor });
    });
}

exports.findAllTutors = (req, res) => {
    User.find({ isTutor:true }, (err, foundTutors) => {
        if (err) return res.status(200).json({ err });
        else return res.status(200).json({ message: "Here are all the tutors" , foundTutors });
    });
}

exports.findTutor = (req, res) => {
    User.findOne({ email:req.body.email }, (err, foundTutor) => {
        if (err) return res.status(200).json({ err });
        else return res.status(200).json({ message: "Tutor found" , foundTutor });
    });
}

exports.deactivateTutor = (req, res) => {
    User.findOne({ email:req.body.email }, (err, foundTutor) => {
        if (err) return res.status(200).json({ err });
        else { 
            foundTutor.isTutor = false;
            foundTutor.save((err, updatedTutor) => {
                if (err) return res.status(200).json({ err });
                return res.status(200).json({ message: "Tutor deactivated" , updatedTutor });
            });
        }
    });
}

exports.addTutorToSubject = (req, res) => {
    User.findOne({ email:req.user.email }, (err, foundTutor) => {
        if (err) return res.status(200).json({ err });
        else { 
            Subject.findOne({ name: req.body.subjectName }, (err, foundSubject) => {
                if (err) return res.status(200).json({ err });
                foundSubject.tutors.push(req.user.email);
                foundSubject.save((err, updatedSubject) => {
                    if (err) return res.status(200).json({ err });
                    return res.status(200)
                    .json({ message: `Tutor added to subject, ${req.body.subjectName}` , foundSubject, foundTutor });
                });
            });
        }
    });
}

exports.fetchSubjectsByTutor = (req, res) => {
    User.findOne({ email:req.body.email }, (err, foundTutor) => {
        if (err) return res.status(200).json({ err });
        else { 
            Subject.find({ tutors: [ String(req.body.email) ] }, (err, foundSubjects) => {
                if (err) return res.status(200).json({ err });
                return res.status(200)
                .json({ message: `Here are the subjects taught by this tutor` , foundSubjects, foundTutor });
            });
        }
    });
}

exports.findTutorBySubject = (req, res) => {
    User.find({ subjects : [ String(req.body.subjectName) ] }, (err, foundTutors) => {
        if (err) return res.status(200).json({ err });
        return res.status(200).json({ message: `Here are the tutors that teach this subject`, foundTutors });
    });
}

exports.updateRegisteredSubject = (req, res) => {
    User.findOne({ email: req.user.email, subjects: [ String(req.query.subjectName) ] }, (err, foundTutor) => {
        if (err) return res.status(200).json({ err });
        Subject.findOneAndUpdate({ name: req.query.subjectName }, { ...req.body }, (err, updatedSubject) => {
            if (err) return res.status(200).json({ err });
                return res.status(200)
                    .json({ message: `Subject has been successfully updated` , updatedSubject, foundTutor });
        });
    });
}


exports.deleteRegisteredSubject = (req, res) => {
    User.findOne({ email: req.user.email, subjects: [ String(req.query.subjectName) ] }, (err, foundTutor) => {
        if (err) return res.status(200).json({ err });
        Subject.findOneAndDelete({ name: req.query.subjectName }, (err, deletedSubject) => {
            if (err) return res.status(200).json({ err });
                return res.status(200)
                    .json({ message: `Subject has been successfully updated` , deletedSubject, foundTutor });
        });
    });
}