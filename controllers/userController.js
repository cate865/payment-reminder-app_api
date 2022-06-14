import User from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config()

// User sign-up

export async function userSignUp(req,res ) {
    try {
        bcrypt.hash(req.body.Password, 10).then(async (hash) => {
            let userObj = {
                Email: req.body.Email,
                Password: hash,
                User_Name: req.body.User_Name,
            }
            let user = await User.create(userObj);
            if (user) {
                res.status(200).json({
                    success: true,
                    message: 'User created successfully',
                    data: user
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: 'User could not be created at this time'
                })
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong...check error log for details"
        })
    }
}

// User log in

export async function userLogin(req, res) {
    try {
        let user = await User.findOne({where: {Email: req.body.Email }});
        if (!user) {
            return res(500).json({
                success: false,
                message: "User not found"
            })
        }
        bcrypt.compare(req.body.Password, user.Password).then(response => {
            if (!response) {
                return res.status(401).json({
                    status: false,
                    message: "Authentication Failed: Incorrect password."
                })
            }

            let authToken = jwt.sign({ Email: user.Email, UserID: user.UserID },
                process.env.AUTH_KEY, { expiresIn: "1h" });

            return res.status(200).json({
                status: true,
                message: "User authentication successful",
                user: { UserName: user.UserName, Email: user.Email, UserID: user.UserID },
                token: authToken,
                expiresIn: 3600
            })
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        })
    }
    
}
        
