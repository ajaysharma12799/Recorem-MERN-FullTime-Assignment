const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        // Get Token from Request Headers
        const token = req.header("x-auth-token");
        if(!token) { // If Token is Not Present
            return res.status(401).json({errors: "No Token, Authorization Denied"});
        }
        // If Token is Present
        const decode = jwt.verify(token, process.env.JWTSecret);
        console.log(decode);
        req.user = decode.user;
        next();
    } catch (error) {
        console.log(error.message)
        return res.status(401).json({errors: "Invalid Token"});
    }
};