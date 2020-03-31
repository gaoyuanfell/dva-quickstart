import { postJson, get, getDelete } from "../utils/http";

export default {
  list(body) {
    return postJson("/api/userList", body);
  },
  add(body) {
    return postJson("/api/user/add", body);
  },
  edit(body) {
    return postJson("/api/user/edit", body);
  },
  remove(id) {
    return getDelete(`/api/user/${id}`);
  },
  info(id) {
    return get(`/api/user/${id}`);
  }
};
