import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let invoiceData;
let holdInvoiceData;

export default class InvoiceDataDAO {
  static async injectDB(conn) {
    if (invoiceData) {
      return;
    }
    try {
      invoiceData = await conn.db("ayumaAdmin").collection("invoiceData");
    } catch (e) {
      console.error(`Unable to establish a collection handle in invoiceData: ${e}`);
    }
  }

  //Getting the query
  static async getInvoiceData({ filters = null, page = 0, invoiceDataPerPage = 10 } = {}) {
    let query;
    if (filters) {
      if ("Name" in filters) {
        query = { $text: { $search: filters["Name"] } };
      } else if ("InvoiceNumber" in filters) {
        query = { InvoiceNumber: { $eq: filters["InvoiceNumber"] } };
      } else if ("Status" in filters) {
        query = { Status: { $eq: filters["Status"] } };
      }
    }

    let cursor;

    try {
      cursor = await invoiceData.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { invoiceDataList: [], totalNumInvoiceData: 0 };
    }

    const displayCursor = cursor.limit(invoiceDataPerPage).skip(invoiceDataPerPage * page);

    try {
      const invoiceDataList = await displayCursor.toArray();
      const totalNumInvoiceData = await invoiceData.countDocuments(query);

      return { invoiceDataList, totalNumInvoiceData };
    } catch (e) {
      console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
      return { invoiceDataList: [], totalNumInvoiceData: 0 };
    }
  }

  //Adding the Invoice Data
  static async addInvoiceData(
    invoiceNumber,
    invoiceName,
    invoiceStatus,
    invoice200g,
    invoice500g,
    invoiceAmount,
    invoiceAddedDate,
    invoiceDate
  ) {
    try {
      const invoiceDataDoc = {
        InvoiceNumber: invoiceNumber,
        Name: invoiceName,
        Status: invoiceStatus,
        InvoiceAmount: invoiceAmount,
        Qty200g: invoice200g,
        Qty500g: invoice500g,
        InvoiceAddedDate: invoiceAddedDate,
        InvoiceDate: invoiceDate,
      };
      return await invoiceData.insertOne(invoiceDataDoc);
    } catch (e) {
      console.error(`Unable to insert invoice data: ${e}`);
      return { error: e };
    }
  }

  static async updateInvoiceData(
    invoiceID,
    invoiceName,
    invoiceNumber,
    invoiceStatus,
    invoice200g,
    invoice500g,
    invoiceAmount,
    invoiceAddedDate,
    invoiceDate
  ) {
    try {
      const updateResponse = await invoiceData.updateOne(
        {
          _id: ObjectId(invoiceID),
        },
        {
          $set: {
            InvoiceNumber: invoiceNumber,
            Name: invoiceName,
            Status: invoiceStatus,
            Qty200g: invoice200g,
            Qty500g: invoice500g,
            InvoiceAmount: invoiceAmount,
            InvoiceAddedDate: invoiceAddedDate,
            InvoiceDate: invoiceDate,
          },
        }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update invoice data: ${e}`);
      return { error: e };
    }
  }

  //Delete invoice data
  static async deleteInvoiceData(id) {
    try {
      const deleteInvoiceResponse = await invoiceData.deleteOne({ _id: ObjectId(id) });
      return deleteInvoiceResponse;
    } catch (e) {
      console.error(`Unable to delete invoice data: ${e}`);
      return { error: e };
    }
  }

  //Get Invoice Data by ID
  static async getInvoiceDataByID(id) {
    try {
      const pipeline = [
        {
          $match: {
            _id: ObjectId(id),
          },
        },
      ];
      return await invoiceData.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Something went wrong in getInvoiceDataByID: ${e}`);
      throw e;
    }
  }
}
