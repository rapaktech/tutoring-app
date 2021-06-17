const { decodeToken } = require('../services/jwtService');

exports.authenticateUser = (req, res, next) => {
    // Check for token
    if (!req.headers.authorization) return res.status(401).json({ message: "Authorization token required" });
    let splitHeader = req.headers.authorization.split(' ');
    if (splitHeader[0] !== "Bearer") return res.status(401).json({ message: "Auth format is Bearer <token>" });


    // Check if token is valid
    let token = splitHeader[1];
    let decodedToken = decodeToken(token);

    if (!decodedToken) return res.status(401).json({ message: "Token is invalid or expired token"});
    else {
        req.user = decodedToken;
        next();
    }
}

exports.checkIfAdmin = (req, res, next) => {
    if (req.user.isAdmin == false) return res.status(403)
        .json({ message: 'This route is strictly restricted to admin only.' })
    ;
    next();
}


exports.checkIfTutor = (req, res, next) => {
    if (req.user.isTutor == false) return res.status(403)
        .json({ message: 'This route is strictly restricted to tutors only.' })
    ;
    next();
}