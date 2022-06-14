import express  from "express";
import { addClient } from "../controllers/clientController.js";
import { authenticate } from "../middlewares/auth.js";

const clientRouter = express.Router();

// Add client route
clientRouter.post('/add', authenticate, addClient);

export default clientRouter