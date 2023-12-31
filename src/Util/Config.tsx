import axios from "axios";
import { history } from "../index";
//setup hằng số
export const DOMAIN = "https://jiranew.cybersoft.edu.vn/";
export const TOKEN = "accessToken";
export const USERLOGIN = "userLogin";
export const TOKEN_CYBERSOFT = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0MyIsIkhldEhhblN0cmluZyI6IjA0LzExLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5OTA1NjAwMDAwMCIsIm5iZiI6MTY2OTQ4MjAwMCwiZXhwIjoxNjk5MjAzNjAwfQ.7A1g8RqPPK_ttr9NYitsWT7Cbe11nz4qye-QxZ_b8fk`;
export const { getStoreJson, setStoreJson, getStore, setStore,clearStore } = {
  getStoreJson: (name: string): any => {
    if (localStorage.getItem(name)) {
      const strResult: string | null | any = localStorage.getItem(name);
      return JSON.parse(strResult);
    }
    return undefined;
  },
  setStoreJson: (name: string, data: any): void => {
    const strJON = JSON.stringify(data);
    localStorage.setItem(name, strJON);
  },
  getStore: (name: string): string | null => {
    return localStorage.getItem(name);
  },
  setStore: (name: string, data: string): void => {
    localStorage.setItem(name, data);
  },
  clearStore: (name:string) => {
    localStorage.removeItem(name);
    history.push("/");
  }
};

//interceptor
export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 30000,
});
export const httpNonAuth = axios.create({
  baseURL: DOMAIN,
  timeout: 30000,
});
httpNonAuth.interceptors.request.use(
  (config: any) => {
    // config.baseURL = DOMAIN;
    config.header = { ...config.headers };
    config.headers.tokenCybersoft = `TOKEN_CYBERSOFT`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

http.interceptors.request.use(
  (config: any) => {
    config.header = { ...config.headers };
    let token = getStoreJson(USERLOGIN)?.accessToken;
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.tokenCybersoft = `TOKEN_CYBERSOFT`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

//cấu hình cho response  ( kết quả trả về từ api)
http.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response?.status === 401) {
      alert(`Đăng nhập để vào trang này!`);
      history.push("/login");
    }
    return Promise.reject(err);
  }
);
