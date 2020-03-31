import axios from "axios";

const domain = "http://localhost:8000/mock";
let instance = axios.create({
  baseURL: domain,
  timeout: 20000 // 请求超时时间
});

instance.interceptors.request.use(
  request => {
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

// 拿到数据 统一处理报错信息
instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export function get(url, body = {}, config = {}) {
  config.params = body;
  return instance.get(url, config);
}

export function getDelete(url, body = {}, config = {}) {
  config.params = body;
  return instance.delete(url, config);
}

export function postJson(url, body = {}, config = {}) {
  return instance.post(url, body, config);
}

export function postForm(url, body = {}, config = {}) {
  let search = new URLSearchParams();
  Object.keys(body).forEach(key => {
    search.set(key, body[key]);
  });
  return instance.post(url, search.toString(), config);
}

export function postFormData(url, body = {}, config = {}) {
  let f = new FormData();
  Object.keys(body).forEach(key => {
    f.append(key, body[key]);
  });
  return instance.post(url, f, config);
}
