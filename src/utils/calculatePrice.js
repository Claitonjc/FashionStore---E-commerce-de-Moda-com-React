export const calcTotalPrice = (cart) => {
  const total = cart?.items?.reduce(
    (soma, produto) => soma + produto.price * produto.quantity,
    0,
  );

  const portion = total / 10;
  const discount = total - (total * 10) / 100;

  return {
    total,
    portion,
    discount,
  };
};
