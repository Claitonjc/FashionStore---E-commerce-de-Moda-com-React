// Utils
import { formatPrice } from "../../utils/formatPrice";

// ==========================================================================
// CONFIGURATIONS & STYLES
// ==========================================================================
const STYLES = {
  default: {
    symbol: "text-[24px] mr-1 font-semibold",
    integer: "text-4xl font-bold tracking-tight",
    decimal: "text-lg align-top mr-5",
  },

  medium: {
    symbol: "text-[12px] mr-1 font-semibold",
    integer: "text-[12px] font-bold tracking-tight",
    decimal: "text-[12px] mr-5 font-bold",
  },

  small: {
    symbol: "text-[12px] font-bold ml-1",
    integer: "text-[12px] font-bold",
    decimal: "text-[12px] font-bold",
  },
};

export const FormatPrice = ({ price, count = 1, variant = "default" }) => {
  // =========================================================================
  // 1. DERIVED DATA (Calculations)
  // =========================================================================
  const priceFormated = formatPrice(price * count);

  // =========================================================================
  // 2. RENDER
  // =========================================================================
  return (
    <span>
      <span className={STYLES[variant].symbol}>{priceFormated.symbol}</span>
      <span className={STYLES[variant].integer}>{priceFormated.integer}</span>
      <span className={STYLES[variant].decimal}>
        {priceFormated.separator}
        {priceFormated.decimal}
      </span>
    </span>
  );
};
