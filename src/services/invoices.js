import http from "../http-common";

class InvoiceDataService {
  getAll() {
    return http.get("/invoiceData");
  }

  get(id) {
    return http.get(`/invoiceData/${id}`);
  }

  create(data) {
    return http.post("/invoiceData", data);
  }

  update(id, data) {
    return http.put(`/invoiceData/${id}`, data);
  }

  delete(id) {
    return http.delete(`/invoiceData/${id}`);
  }

  deleteAll() {
    return http.delete(`/invoiceData`);
  }

  findByTitle(title) {
    return http.get(`/invoiceData?name=${title}`);
  }
}

export default new InvoiceDataService();
