const BASE_URL = "https://viacep.com.br/ws/";

export const apiBuscaCep = async (cep) => {
  const response = await fetch(`${BASE_URL}/${cep}/json/`);

  if (!response.ok) {
    throw new Error("Erro na API BuscaCEP");
  }
  return await response.json();
};
