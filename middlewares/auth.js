import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export function authenticate(req, res, next) {
    try {
        
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.AUTH_KEY);
        next();
    } catch (err) {
        res.status(401).json({
            status: 'failed',
            message: "Authentication Failed: Incorrect Auth Token."
        })
    }
}