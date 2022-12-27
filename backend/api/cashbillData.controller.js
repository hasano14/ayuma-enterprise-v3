import CashbillDataDAO from "../dao/cashbillDataDAO.js";

export default class CashbillDataController {
  static async apiGetCashbillData(req, res, next) {
    const cashbillDataPerPage = req.query.cashbillDataPerPage
      ? parseInt(req.query.cashbillDataPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.Name) {
      filters.Name = req.query.Name;
    } else if (req.query.CashbillNumber) {
      filters.CashbillNumber = req.query.CashbillNumber;
    } else if (req.query.Status) {
      filters.Status = req.query.Status;
    }

    const { cashbillDataList, totalNumCashbillData } = await CashbillDataDAO.getCashbillData({
      filters,
      page,
      cashbillDataPerPage,
    });

    let response = {
      cashbillData: cashbillDataList,
      page: page,
      filters: filters,
      entries_per_page: cashbillDataPerPage,
      total_results: totalNumCashbillData,
    };
    res.json(response);
  }

  //Adding the Cashbill Data
  static async apiPostCashbillData(req, res, next) {
    try {
      const cashbillNumber = req.body.cashbillNumber;
      const cashbillName = req.body.cashbillName;
      const cashbillStatus = req.body.cashbillStatus;
      const cashbill200g = req.body.cashbill200g;
      const cashbill500g = req.body.cashbill500g;
      const cashbillAmount = req.body.cashbillAmount;
      const cashbillAddedDate = new Date();
      const cashbillDate = req.body.cashbillDate;

      const cashbillDataResponse = await CashbillDataDAO.addCashbillData(
        cashbillNumber,
        cashbillName,
        cashbillStatus,
        cashbill200g,
        cashbill500g,
        cashbillAmount,
        cashbillAddedDate,
        cashbillDate
      );
      res.json({ status: "success" });
    } catch {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateCashbillData(req, res, next) {
    try {
      const cashbillID = req.body.cashbillID;
      const cashbillName = req.body.cashbillName;
      const cashbillNumber = req.body.cashbillNumber;
      const cashbillDate = req.body.cashbillDate;
      const cashbillStatus = req.body.cashbillStatus;

      const cashbillDataResponse = await CashbillDataDAO.updateCashbillData(
        cashbillID,
        cashbillName,
        cashbillNumber,
        cashbillDate,
        cashbillStatus
      );

      var { error } = cashbillDataResponse;
      if (error) {
        res.status(400).json({ error });
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  //Deleting the Cashbill Data
  static async apiDeleteCashbillData(req, res, next) {
    try {
      const cashbillId = req.query.id;
      console.log(cashbillId);
      const cashbillDataResponse = await CashbillDataDAO.deleteCashbillData(cashbillId);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  //Getting the Cashbill Data by ID
  static async apiGetCashbillDataById(req, res, next) {
    try {
      let id = req.params.id || {};
      let cashbillData = await CashbillDataDAO.getCashbillDataByID(id);
      if (!cashbillData) {
        res.status(400).json({ error: "Not Found" });
        return;
      }
      res.json(cashbillData);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
