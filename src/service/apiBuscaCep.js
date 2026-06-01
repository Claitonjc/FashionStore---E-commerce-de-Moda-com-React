const BASE_URL = "https://api.correios.com.br/cep/v2/enderecos";

export const apiBuscaCep = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error("Erro na API BuscaCEP");
  }
  return response.json();
};
