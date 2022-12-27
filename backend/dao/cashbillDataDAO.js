import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let cashbillData;
let holdCashbillData;

export default class CashbillDataDAO {
  static async injectDB(conn) {
    if (cashbillData) {
      return;
    }
    try {
      cashbillData = await conn.db("ayumaAdmin").collection("cashbillData");
    } catch (e) {
      console.error(`Unable to establish a collection handle in cashbillData: ${e}`);
    }
  }

  //Getting the query
  static async getCashbillData({ filters = null, page = 0, cashbillDataPerPage = 10 } = {}) {
    let query;
    if (filters) {
      if ("Name" in filters) {
        query = { $text: { $search: filters["Name"] } };
      } else if ("CashbillNumber" in filters) {
        query = { CashbillNumber: { $eq: filters["CashbillNumber"] } };
      } else if ("Status" in filters) {
        query = { Status: { $eq: filters["Status"] } };
      }
    }

    let cursor;

    try {
      cursor = await cashbillData.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { cashbillDataList: [], totalNumCashbillData: 0 };
    }

    const displayCursor = cursor.limit(cashbillDataPerPage).skip(cashbillDataPerPage * page);

    try {
      const cashbillDataList = await displayCursor.toArray();
      const totalNumCashbillData = await cashbillData.countDocuments(query);

      return { cashbillDataList, totalNumCashbillData };
    } catch (e) {
      console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
      return { cashbillDataList: [], totalNumCashbillData: 0 };
    }
  }

  //Adding the Cashbill Data
  static async addCashbillData(
    cashbillNumber,
    cashbillName,
    cashbillStatus,
    cashbill200g,
    cashbill500g,
    cashbillAmount,
    cashbillAddedDate,
    cashbillDate
  ) {
    try {
      const cashbillDataDoc = {
        CashbillNumber: cashbillNumber,
        Name: cashbillName,
        Status: cashbillStatus,
        CashbillAmount: cashbillAmount,
        Qty200g: cashbill200g,
        Qty500g: cashbill500g,
        CashbillAddedDate: cashbillAddedDate,
        CashbillDate: cashbillDate,
      };
      return await cashbillData.insertOne(cashbillDataDoc);
    } catch (e) {
      console.error(`Unable to insert cashbill data: ${e}`);
      return { error: e };
    }
  }

  static async updateCashbillData(
    cashbillID,
    cashbillName,
    cashbillNumber,
    cashbillStatus,
    cashbill200g,
    cashbill500g,
    cashbillAmount,
    cashbillAddedDate,
    cashbillDate
  ) {
    try {
      const updateResponse = await cashbillData.updateOne(
        {
          _id: ObjectId(cashbillID),
        },
        {
          $set: {
            CashbillNumber: cashbillNumber,
            Name: cashbillName,
            Status: cashbillStatus,
            Qty200g: cashbill200g,
            Qty500g: cashbill500g,
            CashbillAmount: cashbillAmount,
            CashbillAddedDate: cashbillAddedDate,
            CashbillDate: cashbillDate,
          },
        }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update cashbill data: ${e}`);
      return { error: e };
    }
  }

  //Delete cashbill data
  static async deleteCashbillData(id) {
    try {
      const deleteCashbillResponse = await cashbillData.deleteOne({ _id: ObjectId(id) });
      return deleteCashbillResponse;
    } catch (e) {
      console.error(`Unable to delete cashbill data: ${e}`);
      return { error: e };
    }
  }

  //Get Cashbill Data by ID
  static async getCashbillDataByID(id) {
    try {
      const pipeline = [
        {
          $match: {
            _id: ObjectId(id),
          },
        },
      ];
      return await cashbillData.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Something went wrong in getCashbillDataByID: ${e}`);
      throw e;
    }
  }
}
