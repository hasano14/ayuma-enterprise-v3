import { RouterSharp } from "@mui/icons-material";
import express from "express";
import InvoiceDataController from "./invoiceData.controller.js";

const router = express.Router();

router
  .route("/InvoiceData")
  .get(InvoiceDataController.apiGetInvoiceData)
  .post(InvoiceDataController.apiPostInvoiceData)
  .put(InvoiceDataController.apiUpdateInvoiceData)
  .delete(InvoiceDataController.apiDeleteInvoiceData);

router.route("/InvoiceData/:id").get(InvoiceDataController.apiGetInvoiceDataById);

export default router;
