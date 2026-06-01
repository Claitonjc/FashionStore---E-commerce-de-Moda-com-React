import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { FormatPrice } from "../FormatPrice/FormatPrice";
import { BsCart3 } from "react-icons/bs";

export const ProductCard = ({ produto }) => {
  const { userCart, produtoMensagem } = useCart();

  const handleClick = (item, event) => {
    event.stopPropagation();
    userCart(item);
  };

  const navigate = useNavigate();

  const irParaDetalhes = () => {
    navigate(`/details/${produto.id}`);
  };

  return (
    <li
      className="text-dark border-borders/40 bg-light flex min-h-125 w-72 cursor-pointer flex-col items-center justify-between gap-4 rounded-2xl border p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      onClick={irParaDetalhes}
    >
      <h2 className="line-clamp-2 px-2 text-center text-[15px] leading-5 font-medium">
        {produto.title}
      </h2>

      <picture className="flex h-64 items-center justify-center">
        <img
          src={produto.image}
          alt={produto.title}
          className="bg-light max-h-full rounded-xl object-contain p-6"
        />
      </picture>

      <FormatPrice preco={produto.price} />

      {produtoMensagem === produto.id && (
        <p className="text-alert text-[12px]">O item já está no carrinho!</p>
      )}

      <button
        type="button"
        onClick={(event) => handleClick(produto, event)}
        className="bg-button-primary hover:bg-button-hover flex items-center gap-2 rounded-xl px-6 py-3 font-medium tracking-wide shadow-sm transition-all duration-300 active:scale-95"
      >
        <BsCart3 />
        Adicionar ao carrinho
      </button>
    </li>
  );
};
