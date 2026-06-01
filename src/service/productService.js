import { api } from "./api";

export const getProdutos = async () => {
    return api('/products');
}

export const getProdutoPorId = async (id) => {
    return api(`/products/${id}`)
}

export const getProdutosPorCategoria = async (category) => {
    return api(`/products/category/${category}`)
}