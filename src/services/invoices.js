import http from "../http-common";

class InvoiceDataService {
  getAll() {
    return http.get("/InvoiceData");
  }

  get(id) {
    return http.get(`/InvoiceData/${id}`);
  }

  create(data) {
    return http.post("/InvoiceData", data);
  }

  find(query, by = "InvoiceNumber", order = "asc") {
    return http.get(`/InvoiceData?${by}=${query}&_sort=${by}&_order=${order}`);
  }

  update(data) {
    return http.put(`/InvoiceData`, data);
  }

  delete(id) {
    return http.delete(`/InvoiceData?id=${id}`);
  }

  deleteAll() {
    return http.delete(`/InvoiceData`);
  }

  findByTitle(title) {
    return http.get(`/InvoiceData?name=${title}`);
  }
}

export default new InvoiceDataService();
