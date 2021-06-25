require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwtService = require('../services/jwtService');
const User = require('../models/users');
const { SALT } = process.env;


exports.createUser = (req, res) => {

    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (err) {
            return res.status(500).json({ err });
        } 
        if (existingUser) {
            return res.status(400)
                .json({ message:"A user with this username already exists, please try another username"});
        }

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            userRole: req.body.userRole,
            isAdmin: req.body.isAdmin,
            isTutor: req.body.isTutor,
        });

        // hash user password
        bcrypt.genSalt(Number(SALT), (err, salt) => {
            if (err) return res.status(500).json({ err });
            bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
                if (err) return res.status(500).json({ err });

                // save password to user data
                newUser.password = hashedPassword;
                newUser.save((err, savedUser) => {
                    if (err) return res.status(500).json({ err });
                    let token = jwtService.createToken(savedUser);
                    return res.status(200).json({ message: "Registration is successful", token });
                });
            });
        });
    });
};


exports.getLoggedInUser = async (req, res) => {
    try {
        // Get User from db
        const user = await User.findById(req.user.id).select("-password");

        // Return user
        return res.json({
            statusCode: 200,
            message: "user gotten successfully",
            user
        });
    } catch (error) {
        console.error(error.message);
        
        return res.status(500).send("Server Error!");
    }
}



// @route POST /login
// @desc Auth user (Student, Tutor, Admin) and get token
// @access Public
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check user email
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                statusCode: 400,
                message: "Invalid Credentials. Please Check and try again"
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                statusCode: 400,
                message: "Invalid Password. Please Check And Try Again"
            });
        } else {
            let token = jwtService.createToken(user);
            return res.status(200).json({
                message: "Login Successful",
                token
            });
        }

    } catch (error) {
        console.error(err.message);

        res.status(500).send("Server Error");
    }
}


exports.changePassword = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check user email
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                statusCode: 400,
                message: "Invalid Credentials. Please Check and try again"
            });
        }

        // hash user password
        bcrypt.genSalt(Number(SALT), (err, salt) => {
            if (err) return res.status(500).json({ err });
            bcrypt.hash(password, salt, (err, hashedPassword) => {
                if (err) return res.status(500).json({ err });

                // save password to user data
                user.password = hashedPassword;
                user.save((err, savedUser) => {
                    if (err) return res.status(500).json({ err });
                    let token = jwtService.createToken(savedUser);
                    return res.status(200).json({ message: "Your password change is successful", token });
                });
            });
        });

    } catch (error) {
        res.status(500).send("Server Error");
    }
}