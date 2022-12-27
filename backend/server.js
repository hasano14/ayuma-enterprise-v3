import express from "express";
import cors from "cors";
//Data route (restaurant)
import allData from "./api/allData.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/invoiceData", allData);
app.use("*", (req, res) => res.status(404).json({ error: "Data Not Found" }));

export default app