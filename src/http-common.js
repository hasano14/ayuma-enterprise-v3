import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api/v1/invoiceData",
  headers: {
    "Content-type": "application/json",
  },
});
