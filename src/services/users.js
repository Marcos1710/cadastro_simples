import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "../utils/api";

export const usersApi = {
  getName: (name) => getRequest(`http://localhost:5000/usuarios?q=${name}`, {}),
  getUsers: (start, end) =>
    getRequest(
      `http://localhost:5000/usuarios?_start=${start}&_end=${end}`,
      {}
    ),
  getUsersTotal: () => getRequest(`http://localhost:5000/usuarios`, {}),
  setNewUser: (body) => postRequest("http://localhost:5000/usuarios", body),
  updateUser: (body) =>
    putRequest(`http://localhost:5000/usuarios/${body.id}`, body),
  removeUser: (id) => deleteRequest(`http://localhost:5000/usuarios/${id}`, {}),
};
