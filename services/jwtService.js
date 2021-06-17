const jwt = require('jsonwebtoken');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const expiry = Number(process.env.TOKEN_EXPIRY);


exports.createToken = (user) => {
    try {
        let token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                userRole: user.userRole,
                isTutor: user.isTutor,
                isAdmin: user.isAdmin
            }, secret, { expiresIn : expiry }
        );
        return token;
    } catch (error) {
        if (error) console.log(error);
    }
}


exports.decodeToken = (token) => {
    try {
        let decodedToken = jwt.verify(token, secret);
        return decodedToken;
    } catch (error) {
        console.error(error);
        return null;
    }
}