import express  from "express";
import {createInvoice, sendInvoice}  from "../controllers/invoiceController.js";
import { authenticate } from "../middlewares/auth.js";

const invoiceRouter = express.Router();

// Add client route
invoiceRouter.post('/create', createInvoice);
invoiceRouter.get('/send/:id', sendInvoice);

export default invoiceRouter