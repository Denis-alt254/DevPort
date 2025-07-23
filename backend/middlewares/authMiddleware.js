const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET

function authMiddleware(req, res, next){
    const authHeader = req.headers['authorization'];

    //Check Bearer token
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({error: "Access denied. No token provided."});
    }

    try {
        //verify token
        const decoded = jwt.verify(token, secretKey);
        if(!decoded){
            return res.status(403).json({error: 'Invalid payload'});
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token Verification Failed:", error);
        res.status(403).json({error: "Invalid or Expired token."});
    }
};

module.exports = authMiddleware;    