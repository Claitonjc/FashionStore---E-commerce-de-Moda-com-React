const BASE_URL = 'https://fakestoreapi.com';

export const api = async (endPoint) => {
    const resposta = await fetch(`${BASE_URL}${endPoint}`);
    if(!resposta.ok) {
        throw new Error('Erro na API');
    }

    return resposta.json();
}