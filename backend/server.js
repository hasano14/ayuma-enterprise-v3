import express from "express";
import cors from "cors";
//Data route (restaurant)
import invoiceData from "./api/invoiceData.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/invoiceData", invoiceData);
app.use("*", (req, res) => res.status(404).json({ error: "Data Not Found" }));

export default app