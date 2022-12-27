import InvoiceDataDAO from "../dao/invoiceDataDAO.js";

export default class InvoiceDataController {
  static async apiGetInvoiceData(req, res, next) {
    const invoiceDataPerPage = req.query.invoiceDataPerPage
      ? parseInt(req.query.invoiceDataPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.Name) {
      filters.Name = req.query.Name;
    } else if (req.query.InvoiceNumber) {
      filters.InvoiceNumber = req.query.InvoiceNumber;
    } else if (req.query.Status) {
      filters.Status = req.query.Status;
    }

    const { invoiceDataList, totalNumInvoiceData } = await InvoiceDataDAO.getInvoiceData({
      filters,
      page,
      invoiceDataPerPage,
    });

    let response = {
      invoiceData: invoiceDataList,
      page: page,
      filters: filters,
      entries_per_page: invoiceDataPerPage,
      total_results: totalNumInvoiceData,
    };
    res.json(response);
  }

  //Adding the Invoice Data
  static async apiPostInvoiceData(req, res, next) {
    try {
      const invoiceNumber = req.body.invoiceNumber;
      const invoiceName = req.body.invoiceName;
      const invoiceStatus = req.body.invoiceStatus;
      const invoice200g = req.body.invoice200g;
      const invoice500g = req.body.invoice500g;
      const invoiceAmount = req.body.invoiceAmount;
      const invoiceAddedDate = new Date();
      const invoiceDate = req.body.invoiceDate;

      const invoiceDataResponse = await InvoiceDataDAO.addInvoiceData(
        invoiceNumber,
        invoiceName,
        invoiceStatus,
        invoice200g,
        invoice500g,
        invoiceAmount,
        invoiceAddedDate,
        invoiceDate
      );
      res.json({ status: "success" });
    } catch {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateInvoiceData(req, res, next) {
    try {
      const invoiceID = req.body.invoiceID;
      const invoiceName = req.body.invoiceName;
      const invoiceNumber = req.body.invoiceNumber;
      const invoiceDate = req.body.invoiceDate;
      const invoiceStatus = req.body.invoiceStatus;

      const invoiceDataResponse = await InvoiceDataDAO.updateInvoiceData(
        invoiceID,
        invoiceName,
        invoiceNumber,
        invoiceDate,
        invoiceStatus
      );

      var { error } = invoiceDataResponse;
      if (error) {
        res.status(400).json({ error });
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  //Deleting the Invoice Data
  static async apiDeleteInvoiceData(req, res, next) {
    try {
      const invoiceId = req.query.id;
      console.log(invoiceId);
      const invoiceDataResponse = await InvoiceDataDAO.deleteInvoiceData(invoiceId);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  //Getting the Invoice Data by ID
  static async apiGetInvoiceDataById(req, res, next) {
    try {
      let id = req.params.id || {};
      let invoiceData = await InvoiceDataDAO.getInvoiceDataByID(id);
      if (!invoiceData) {
        res.status(400).json({ error: "Not Found" });
        return;
      }
      res.json(invoiceData);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
