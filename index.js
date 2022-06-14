import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./routes/index.js";

const app = express();
dotenv.config()
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(router);

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send("Welcome to the Invoicing App API");
} )

app.listen(port, () => {
    console.log(`Invoicing App API running on port ${port}`);
})

export default app;