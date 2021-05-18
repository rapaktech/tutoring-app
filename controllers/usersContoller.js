const model = require('../models/user');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const user = require('../models/user');
const user = require('../models/user');
const { SECRET } = process.env;


exports.getLoggedInuser = async (req, res) => {
    try {
        // Get User from db
        const user = await User.findById(req.user.id).select("-password");

        // Return user
        res.json({
            statusCode: 200,
            message: "user gotten successfully",
            user
        })
    } catch (error) {
        console.error(error.message);
        
        res.status(500).send("Server Error!");
    }
}

// @route POST api/auth/login
// @desc Auth user (Student, Tutor, Admin) and get token
// @access Public
exports.loginUser = async (req, res) => {
    // Check for error
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check user email
        let user = await user.findOne({ email });

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
        }


        // else if there's a match, send payload and signed token
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            SECRET,
            {
                expiresIn: 360000
            }, (err, token) => {
                if (err) throw err;
                res.json({
                    statusCode: 200,
                    message: "Login Successful",
                    user: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        userRole: user.userRole,
                        isTutor: user.isTutor,
                        isAdmin: user.isAdmin
                    }, token
                });
            }
        );

    } catch (error) {
        console.error(err.message);

        res.status(500).send("Server Error");
    }
}