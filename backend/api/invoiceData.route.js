import { RouterSharp } from "@mui/icons-material";
import express from "express";
import InvoiceDataController from "./invoiceData.controller.js";

const router = express.Router();

router.route("/id/:id").get(InvoiceDataController.apiGetInvoiceDataById)

router
  .route("/InvoiceData")
  .get(InvoiceDataController.apiGetInvoiceData)
  .post(InvoiceDataController.apiPostInvoiceData)
  .put(InvoiceDataController.apiUpdateInvoiceData)
  .delete(InvoiceDataController.apiDeleteInvoiceData);


export default router;
