import axios from "axios";
import { getToken, removeToken } from "./localStorage";

const api = axios.create({
  baseURL: "",
  headers: {},
});

async function handleHttpError() {
  return "Algo deu errado, por favor tente novamente.";
}

function makeHttpRequest(apiCall) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await apiCall();
      resolve(data.data);
    } catch (e) {
      reject(await handleHttpError(e));
    }
  });
}

export const getRequest = (path, options = {}) =>
  makeHttpRequest(() => api.get(path, options));
export const postRequest = (path, options = {}) =>
  makeHttpRequest(() => api.post(path, options));
export const putRequest = (path, options = {}) =>
  makeHttpRequest(() => api.put(path, options));
export const deleteRequest = (path, options = {}) =>
  makeHttpRequest(() => api.delete(path, options));
