import { FormatPrice } from "../FormatPrice/FormatPrice";
import { useCart } from "../../hooks/useCart";
import { BsCart3 } from "react-icons/bs";

export const ProductInfo = ({ produto }) => {
  const { userCart, produtoMensagem } = useCart();

  return (
    <div
      className={`bg-light border-borders/40 text-dark m-5 flex min-h-130 w-[70%] flex-row justify-around gap-8 rounded-2xl border p-6 shadow-md`}
    >
      <picture className="flex w-screen justify-center">
        <img src={produto.image} alt={produto.title} className="p-4" />
      </picture>
      <section className="m-2 flex flex-col gap-6 p-3 text-justify">
        <div>
          <h1 className="text-2xl font-semibold">{produto.title}</h1>
          <h2 className="text-left text-[12px]">
            Category: {produto.category}
          </h2>
        </div>
        <FormatPrice preco={produto.price} />
        <div>
          <span className="leading-7">Description:</span>
          <p className="max-h-xl leading-8">{produto.description}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => userCart(produto)}
            className="item bg-button-primary hover:bg-button-hover flex items-center gap-2 self-center rounded-xl px-6 py-3 font-medium tracking-wide shadow-sm transition-all duration-300 active:scale-95"
          >
            <BsCart3 /> Adicionar ao carrinho
          </button>
          {produtoMensagem === produto.id && (
            <p className="text-alert text-center text-[12px]">
              O item já está no carrinho!
            </p>
          )}
        </div>
      </section>
    </div>
  );
};
