const BASE_URL = "https://viacep.com.br/ws";

export const getAddress = async (cep) => {
  try {
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      throw new Error("CEP inválido");
    }

    const response = await fetch(`${BASE_URL}/${cleanCep}/json/`);

    if (!response.ok) {
      throw new Error("Erro de comunicação com o servidor");
    }

    const data = await response.json();

    if (data.erro) {
      throw new Error("CEP não encontrado");
    }
    return data;
  } catch (error) {
    console.error("Erro no serviço de CEP:", error.message);
    throw error;
  }
};
