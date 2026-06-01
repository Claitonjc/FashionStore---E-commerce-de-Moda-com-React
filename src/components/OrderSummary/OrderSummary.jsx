import { FormatPrice } from "../FormatPrice/FormatPrice";
import { NavigationLink } from "../NavigationLink/NavigationLink";

export const OrderSummary = ({ total, discount, portion }) => {
  return (
    <aside className="border-borders/30 sticky top-5 m-7 flex h-fit flex-col gap-2 rounded-xl border bg-white p-5">
      <h2 className="text-[20px] font-semibold">Resumo do pedido</h2>
      <div className="mt-2 flex justify-between border-b-2 text-[12px]">
        <p className="mb-4 text-[14px]">Valor dos produtos: </p>
        <FormatPrice preco={total} variant="small" />
      </div>
      <div className="mt-3 flex justify-between text-[12px]">
        <h3 className="text-[16px] font-semibold">Total:</h3>
        <p className="flex items-center text-[14px]">
          Desconto no pix:
          <FormatPrice preco={discount} variant="small" />
        </p>
      </div>
      <div className="flex flex-col items-end text-[12px]">
        <p className="flex text-[14px]">
          Ou à prazo: <FormatPrice preco={total} variant="small" />
        </p>
        <p className="flex text-[14px]">
          (Até 10x sem juros de <FormatPrice preco={portion} variant="small" />)
        </p>
      </div>
    </aside>
  );
};
