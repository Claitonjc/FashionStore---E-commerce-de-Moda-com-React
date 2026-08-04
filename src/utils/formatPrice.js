export const formatPrice = (value = 0) => {
  const safeValue = Number(value) || 0;
  const parts = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).formatToParts(safeValue);

  return {
    symbol: parts.find((part) => part.type === "currency")?.value || "R$",
    integer: parts
      .filter((part) => part.type === "integer" || part.type === "group")
      .map((part) => part.value)
      .join(""),
    separator: parts.find((part) => part.type === "decimal")?.value || ",",
    decimal: parts.find((part) => part.type === "fraction")?.value || "00",
  };
};
