import { formatPrice } from "../../utils/formatPrice";

export const FormatPrice = ({ preco, count = 1, variant = "default" }) => {
  const price = formatPrice(preco * count);

  const styles = {
    default: {
      symbol: "text-[24px] mr-1 font-semibold",
      inteiro: "text-4xl font-bold tracking-tight",
      decimal: "text-lg align-top mr-5",
    },

    small: {
      symbol: "text-[12px] font-bold ml-1",
      inteiro: "text-[12px] font-bold",
      decimal: "text-[12px] font-bold",
    },
  };

  return (
    <span>
      <span className={styles[variant].symbol}>{price.symbol}</span>
      <span className={styles[variant].inteiro}>{price.inteiro}</span>
      <span className={styles[variant].decimal}>
        {price.separator}
        {price.decimal}
      </span>
    </span>
  );
};
