import { RouterSharp } from "@mui/icons-material";
import express from "express";
import CashbillDataController from "./cashbillData.controller.js";

const router = express.Router();

router
  .route("/CashbillData")
  .get(CashbillDataController.apiGetCashbillData)
  .post(CashbillDataController.apiPostCashbillData)
  .put(CashbillDataController.apiUpdateCashbillData)
  .delete(CashbillDataController.apiDeleteCashbillData);

router.route("/CashbillData/:id").get(CashbillDataController.apiGetCashbillDataById);

export default router;
