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

  static async addInvoiceData(
    invoiceNumber,
    invoiceName,
    invoiceDate,
    invoiceStatus,
    invoiceAddedDate
  ) {
    try {
      const invoiceDataDoc = {
        InvoiceNumber: invoiceNumber,
        Name: invoiceName,
        InvoiceDate: invoiceDate,
        Status: invoiceStatus,
        InvoiceAddedDate: invoiceAddedDate,
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
    invoiceDate,
    invoiceStatus
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
            InvoiceDate: invoiceDate,
            Status: invoiceStatus,
          },
        }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update invoice data: ${e}`);
      return { error: e };
    }
  }
  static async deleteInvoiceData(invoiceID) {
    try {
      const deleteInvoiceResponse = await invoiceData.deleteOne({ _id: ObjectId(invoiceID) });
      return deleteInvoiceResponse;
    } catch (e) {
      console.error(`Unable to delete invoice data: ${e}`);
      return { error: e };
    }
  }

  // static async getInvoiceDataByID(id) {
  //   try {
  //     const pipeline = [
  //       {
  //         $match: {
  //           _id: new ObjectId(id),
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "invoiceData",
  //           let: {
  //             id: "$_id",
  //           },
  //           pipeline: [
  //             {
  //               $match: {
  //                 $expr: {
  //                   $eq: ["$InvoiceNumber", "$$id"],
  //                 },
  //               },
  //             },
  //             { $sort: { $date: -1 } },
  //           ],
  //           as: "invoiceData",
  //         },
  //       },
  //       {
  //         $addFields: {
  //           invoiceData: "$invoiceData",
  //         },
  //       },
  //     ];
  //     return await invoiceData.aggregate(pipeline).next();
  //   } catch (e) {
  //     console.error(`Something went wrong in the pipeline: ${e}`);
  //     throw e;
  //   }
  // }
}
