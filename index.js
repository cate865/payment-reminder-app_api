import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./routes/index.js";
import Flutterwave from "flutterwave-node-v3";


const flw = new Flutterwave(process.env.FLW_PUBLIC_API_KEY, process.env.FLW_SECRET_API_KEY);

const app = express();
dotenv.config()
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(router);

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send("Welcome to the Invoicing App API");
})

app.get('/paymentsuccess', async (req, res) => {
    if (req.query.status === 'successful') {
        const response = await flw.Transaction.verify({ id: req.query.transaction_id });
        if (
            response.data.status === "successful"
            && response.data.currency === "USD") {
            console.log("Payment Successful!");

        } else {
            console.log("Payment Unsuccessful");
        }
    }
});

app.listen(port, () => {
    console.log(`Invoicing App API running on port ${port}`);
})

export default app;