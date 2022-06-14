import express  from "express";
import { userSignUp, userLogin } from "../controllers/userController.js";;

const userRouter = express.Router();

// User sign up route
userRouter.post('/signup', userSignUp);

// User login route
userRouter.post('/login', userLogin);

export default userRouter