import express  from "express";
import {createInvoice}  from "../controllers/invoiceController.js";
import { authenticate } from "../middlewares/auth.js";

const invoiceRouter = express.Router();

// Add client route
invoiceRouter.post('/create', authenticate, createInvoice);

export default invoiceRouter