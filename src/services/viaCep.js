import { getRequest } from "../utils/api";

export const serviceViaCep = {
  getCep: (cep) => getRequest(`https://viacep.com.br/ws/${cep}/json/`, {}),
};
