const Subject = require('../models/subjects');

exports.createSubject = (req, res) => {
    Subject.create({ ...req.body }, (err, newSubject) => {
        if (err) return res.status(200).json({ err });
        else return res.status(200).json({ message: "Subject has been created successfully" , newSubject });
    });
}

exports.updateSubject = (req, res) => {
    Subject.findByIdAndUpdate({ _id:req.params.id }, { ...req.body }, (err, updatedSubject) => {
        if (err) return res.status(200).json({ err });
        else return res.status(200).json({ message: "Subject has been updated successfully" , updatedSubject });
    });
}

exports.deleteSubject = (req, res) => {
    Subject.findByIdAndDelete({ _id:req.params.id }, (err, deletedSubject) => {
        if (err) return res.status(200).json({ err });
        else return res.status(200).json({ message: "Subject has been deleted successfully" , deletedSubject });
    });
}

exports.updateByCategory = (req, res) => {
    Subject.updateMany({ category: req.query.category }, { ...req.body }, (err, updatedSubjects) => {
        if (err) return res.status(200).json({ err });
        else return res.status(200).json({ message: "Category has been updated successfully" , updatedSubjects });
    });
}

exports.deleteByCategory = (req, res) => {
    Subject.deleteMany({ category: req.query.category }, (err, deletedSubjects) => {
        if (err) return res.status(200).json({ err });
        else return res.status(200).json({ message: "Category has been deleted successfully" , deletedSubjects });
    });
}

exports.findSubject = (req, res) => {
    Subject.find({ name: req.body.name }, (err, foundSubject) => {
        if (err) return res.status(200).json({ err });
        else return res.status(200).json({ message: "Subject found" , foundSubject });
    });
}

exports.findSubjectsByCategory = (req, res) => {
    Subject.find({ category: req.query.category }, (err, foundSubjects) => {
        if (err) return res.status(200).json({ err });
        else return res.status(200).json({ message: "Category has been found" , foundSubjects });
    });
}

exports.findAllCategories = (req, res) => {
    Subject.find({ }, (err, foundSubjects) => {
        if (err) return res.status(200).json({ err });
        else return res.status(200).json({ message: "All subjects have been found" , foundSubjects });
    });
}