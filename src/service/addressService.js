import { apiBuscaCep } from "../service/apiBuscaCep";

export const getAddress = async (cep) => {
  return apiBuscaCep(`/${cep}`);
};
