import clientRouter from "./clientRoute.js";
import userRouter from "./userRoute.js";
import invoiceRouter from "./invoiceRoute.js";

import express from "express";

const router = express.Router();


router.use("/clients", clientRouter);
router.use("/users", userRouter);
router.use("/invoices", invoiceRouter);


export default router;