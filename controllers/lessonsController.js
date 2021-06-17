const Lesson = require('../models/lessons');

const Subject = require('../models/subjects');

const User = require('../models/users');

exports.createLesson = (req, res) => {
    Lesson.create({
        ...req.body
    }, (err, newLesson) => {
        if (err) return res.status(500).json({ message: "Server down. Please try again later" });
        let name = newLesson.subject;
        Subject.findOne({ name: name }, (err, foundSubject) => {
            if (err) return res.status(500).json({ message: "Server down. Please try again later" });
            foundSubject.lessons.push(newLesson);
            foundSubject.save((err, saved) => {
                if (err) console.log(err);
            });
        });
        return res.status(200).json({ message: "Lesson has been created successfully" });
    });
}

exports.fetchAllLessons = (req, res) => {
    Lesson.find({ }, (err, foundLessons) => {
        if (err) return res.status(500).json({ message: "Server down. Please try again later" });
        return res.status(200).json({ message: "Here all the available lessons" , foundLessons});
    });
}

exports.findLesson = (req, res) => {
    Lesson.find({ name: req.body.name }, (err, foundLessons) => {
        if (err) return res.status(500).json({ message: "Server down. Please try again later" });
        return res.status(200).json({ message: "Here all the available lessons" , foundLessons });
    });
}

exports.updateLesson = (req, res) => {
    Lesson.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, (err, updatedLesson) => {
        if (err) return res.status(500).json({ message: "Server down. Please try again later" });
        return res.status(200).json({ message: "Here all the available lessons" , updatedLesson });
    });
}

exports.deleteLesson = (req, res) => {
    Lesson.findOneAndDelete({ _id: req.params.id }, (err, deletedLesson) => {
        if (err) return res.status(500).json({ message: "Server down. Please try again later" });
        return res.status(200).json({ message: "Here all the available lessons" , deletedLesson });
    });
}

exports.bookLesson = (req, res) => {
    Lesson.findOne({ name: req.body.name }, (err, foundLesson) => {
        if (err) return res.status(500).json({ message: "Server down. Please try again later" });
        User.findOne({ _id: req.user.id }, (err, foundUser) => {
            if (err) return res.status(500).json({ message: "Server down. Please try again later" });
            foundUser.lessons.push(foundLesson);
            foundUser.save((err, saved) => {
                if (err) console.log(err);
            });
        });
        return res.status(200).json({ message: "Lesson has been added to your available lessons" , foundLesson });
    });
}