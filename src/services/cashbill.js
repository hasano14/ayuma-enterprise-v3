import http from "../http-common";

class CashbillDataService {
  getAll() {
    return http.get("/CashbillData");
  }

  get(id) {
    return http.get(`/CashbillData/${id}`);
  }

  create(data) {
    return http.post("/CashbillData", data);
  }

  update(id, data) {
    return http.put(`/CashbillData/${id}`, data);
  }

  delete(id) {
    return http.delete(`/CashbillData?id=${id}`);
  }

  deleteAll() {
    return http.delete(`/CashbillData`);
  }

  findByTitle(title) {
    return http.get(`/CashbillData?name=${title}`);
  }

}

export default new CashbillDataService();
